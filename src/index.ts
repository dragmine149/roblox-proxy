import { generateDocumentation } from '../docs/generator';
import { fetchResponse, handleApiRequest } from './wrappers';
import { DataResponse } from './utils';
import { UserRoutes } from './routes/UserRoutes';
import { BadgeRoutes } from './routes/BadgeRoutes';

const cache = caches.default;

async function handleRoute(route: string, details: string[], request: Request) {
	switch (route) {
		case 'users': {
			const response = processDetails(details, {
				user_id: {
					position: 0,
					type: 'number',
					required: false,
				},
				username: {
					position: 0,
					type: 'string',
					required: false,
				},
				option: {
					position: 1,
					type: 'string',
					required: false
				}
			});
			return UserRoutes.handle(response);
		}

		case 'badges': {
			const response = processDetails(details, {
				user_id: {
					type: 'number',
					position: 0,
					required: true,
				},
				option: {
					type: 'string',
					position: 1,
					required: true,
				},
				badge_1: {
					type: 'number',
					position: 2,
					required: false,
				},
				badge_2: {
					type: 'number',
					position: 3,
					required: false,
				}
			});
			return BadgeRoutes.handle(response, request);
		}

		case '':
			return fetchResponse(generateDocumentation(), {
				headers: {
					'Content-Type': 'text/html'
				}, status: 200
			});

		default:
			return DataResponse.APIDoesntExist();
	}
}

async function getRequestDetails(request: Request) {
	let url = new URL(request.url);
	let details = url.pathname.split('/');
	let route = details[1];
	details.shift();
	details.shift();

	return { route, details };
}

function processDetails(details: string[], bindings: Bindings) {
	let response: BindingsResponse = {
		error: {}
	};

	Object.entries(bindings).forEach(([key, value]) => {
		console.log(`Looking at: `, { key, value });

		if (value.position > details.length && value.required) {
			response.error.position = `${key} requested a pos of ${value.position} which does not exist in. Defaulting to empty.`;
			switch (value.type) {
				default:
				case 'string': response[key] = ''; break;
				case 'number': response[key] = 0; break;
			}
		}

		let info = details[value.position];
		switch (value.type) {
			default:
			case 'string':
				response[key] = info;
				break;
			case 'number':
				response[key] = Number(info);
				if (isNaN(response[key]) && value.required) {
					response.error[key] = `Failed to parse ${info} into a number. Please check the passed parameters.`;
				}
				break;
		}
	})

	return response;
}

export default {
	async fetch(request: Request, env: Object, ctx: ExecutionContext): Promise<Response> {
		// If the request method is OPTIONS, return CORS headers.
		if (
			request.method === "OPTIONS" &&
			request.headers.has("Origin") &&
			request.headers.has("Access-Control-Request-Method")
		) {
			const responseHeaders = {
				"Access-Control-Allow-Origin": request.headers.get("Origin") || "*",
				"Access-Control-Allow-Methods": "*", // Allow all methods
				"Access-Control-Allow-Headers": request.headers.get(
					"Access-Control-Request-Headers"
				) || "*",
				"Access-Control-Max-Age": "86400",
			};
			return new Response(null, { headers: responseHeaders });
		}

		console.log('---------------------------------------------');

		let { route, details } = await getRequestDetails(request);
		console.log({ route, details });

		let response = await cache.match(request.url);
		if (response) {
			console.log(`Found ${request.url} in cache, returning cached version`);
			return response;
		}

		response = await handleApiRequest(handleRoute(route, details, request));

		if (route == '') {
			// no point in caching the docs page.
			return response;
		}

		if (response.status == 202) {
			console.log(`Request ${request.url} is a stream. Not caching.`);
			return response;
		}

		let clone = response.clone();
		let clone_json: ResponseType = await clone.json();
		if (clone_json.error) {
			console.log(`Request ${request.url} errored. Not storing in cache`);
			return response;
		}

		console.log(`Request ${request.url} succeeded. Storing in cache (and returning)`)
		ctx.waitUntil(cache.put(request.url, response.clone()));
		return response;
	},
} satisfies ExportedHandler<Env>;
