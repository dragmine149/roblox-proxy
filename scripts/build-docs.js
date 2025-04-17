const fs = require('fs');
const path = require('path');

let docsPath = path.join(__dirname, '../docs/');
let templatePath = path.join(docsPath, 'templates');
let stylePath = path.join(docsPath, 'styles');

function htmlMapFile(folder, file) {
	let name = file.replace('.html', '');
	let content = fs.readFileSync(path.join(templatePath, folder, file), 'utf8');

	return `export const ${folder != '' ? `${folder}_` : ''}${name.replace(/-/g, '_')} = \`${content.replace(/\`/g, '\\`')}\`;`;
}

function cssMapFile(folder, file) {
	// let name = file.replace('.css', '');
	let content = fs.readFileSync(path.join(stylePath, folder, file), 'utf8');

	return content.replace(/\`/g, '\\`').replace(/^@import .+$\n*/gm, '');
}

function buildDocs() {
	// generate the html file exports

	let html = fs.readdirSync(templatePath)
		.map(file => {
			if (file.endsWith('.html')) {
				return htmlMapFile('', file);
			}

			// assume directory
			return fs.readdirSync(path.join(templatePath, file), {
				recursive: true
			})
				.map(subfile => htmlMapFile(file, subfile))
				.join('\n');
		}).join('\n');

	// generate the css file exports
	let css = fs.readdirSync(stylePath)
		.map(file => {
			if (file.endsWith('.css')) {
				return cssMapFile('', file);
			}

			// assume directory
			return fs.readdirSync(path.join(stylePath, file), {
				recursive: true
			})
				.map(subfile => cssMapFile(file, subfile))
				.join('\n');
		}).join('\n');

	css = `export default \`${css}\`;\n`;

	// Create generated folder if it doesn't exist
	const generatedPath = path.join(__dirname, '../docs/generated');
	if (!fs.existsSync(generatedPath)) {
		fs.mkdirSync(generatedPath);
	}

	// save the files
	fs.writeFileSync(path.join(generatedPath, 'styles.ts'), css);
	fs.writeFileSync(path.join(generatedPath, 'html.ts'), html);

}

buildDocs();
