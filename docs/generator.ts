import { ENDPOINTS } from './endpoints';
import { UPDATES } from './updates';
import './generated/styles';
import * as html from './generated/html';
import styles from './generated/styles';

function generateEndpointCategories() {
	let navItems = '';
	let genhtml = '';

	Object.entries(ENDPOINTS).forEach(([category, endpoints]) => {
		const categoryId = category.toLowerCase();
		genhtml += `<section id="${categoryId}"><h2>${category}</h2>`;
		genhtml += `<ul>`;
		genhtml += endpoints.map(endpoint => generateEndpointHTML(endpoint)).join('\n');
		genhtml += `</ul></section>`;

		navItems += `<li><a href="#${categoryId}">${category}</a></li>`;
	});

	return {
		genhtml,
		navItems
	};
}

function generateEndpointHTML(endpoint_docs: Endpoint) {
	const id = `endpoint-${endpoint_docs.method.toLowerCase()}-${endpoint_docs.path.replace(/[^a-zA-Z0-9]/g, '-')}`;

	let parameters = endpoint_docs.parameters.map(param => html.endpoints_endpoint_parameter
		.replace(/{{name}}/g, param.name)
		.replace(/{{type}}/g, param.type)
		.replace(/{{description}}/g, param.description)
		.replace(/{{required}}/g, param.required ? '<span class="required"><span class="star">*</span>required</span>' : '')
		.replace(/{{notes}}/g, param.notes ? '<ul>' + param.notes.map(note => `<li>${note}</li>`).join('') + '</ul>' : '')
	).join('\n');

	endpoint_docs.responses.sort((a, b) => a.code < b.code ? -1 : 1);
	let responses = endpoint_docs.responses.map(response => html.endpoints_endpoint_response
		.replace(/{{code}}/g, response.code.toString())
		.replace(/{{description}}/g, response.description)
		.replace(/{{model}}/g, response.model ? html.endpoints_endpoint_response_model
			.replace(/{{model-sub}}/g, Object.entries(response.model).map(([field, model]) => html.endpoints_endpoint_response_model_sub
				.replace(/{{field}}/g, field)
				.replace(/{{type}}/g, model.type)
				.replace(/{{description}}/g, model.description)
			).join('\n')) : ''
		)
	).join('\n');

	return html.endpoints_endpoint
		.replaceAll(/{{id}}/g, id)
		.replace(/{{method}}/g, endpoint_docs.method)
		.replace(/{{method_l}}/g, endpoint_docs.method.toLowerCase())
		.replace(/{{path}}/g, endpoint_docs.path)
		.replace(/{{description}}/g, endpoint_docs.description)
		.replace(/{{parameters}}/g, parameters)
		.replace(/{{responses}}/g, responses);
}

function mapUpdateArray(title: string, information: string[]) {
	if (!information.length) return '';

	return `<h3>${title}</h3><ul>${information.map(info => `<li>${info}</li>`).join('\n')}</ul>`
}

function generateUpdateHTML() {
	let updates = Object.entries(UPDATES)
		.filter(([key, entry]) => !key.startsWith('$'))
		.sort((a, b) => b[1].date.getTime() - a[1].date.getTime());

	let updateNav = '';
	let updateHtml = updates.map(([id, update]) => {
		updateNav += `<li><a href='#updates-${id}'>${id.replaceAll('_', ' ')}</a></li>`

		return html.updates_update
			.replaceAll(/{{update_id}}/g, id)
			.replace(/{{update_version}}/g, id.replaceAll('_', '.'))
			.replace(/{{update_date}}/g, update.date.toLocaleDateString())
			.replace(/{{update_time}}/g, update.date.toLocaleTimeString())
			.replace(/{{update_description}}/g, update.description)
			.replace(/{{update_breaking}}/g, mapUpdateArray('Breaking Changes', update.breakingChanges))
			.replace(/{{update_added}}/g, mapUpdateArray('Added', update.added))
			.replace(/{{update_changed}}/g, mapUpdateArray('Changed', update.changed))
			.replace(/{{update_fixed}}/g, mapUpdateArray('Fixed', update.fixed))
			.replace(/{{update_removed}}/g, mapUpdateArray('Removed', update.removed))
	}).join('\n')

	return {
		updateNav,
		updateHtml
	};
}

export function generateDocumentation() {
	let { genhtml, navItems } = generateEndpointCategories();
	let { updateNav, updateHtml } = generateUpdateHTML();

	return html.template
		.replace(/{{styles}}/g, styles)
		.replace(/{{endpoints}}/g, genhtml)
		.replace(/{{endpoint-nav}}/g, navItems)
		.replace(/{{updates}}/g, updateHtml)
		.replace(/{{update-nav}}/g, updateNav);
}
