import { generateDocumentation } from '../docs/generator';
import { fetchResponse, handleApiRequest } from './wrappers';
import { DataResponse } from './utils';
import { UserRoutes } from './routes/UserRoutes';
import { BadgeRoutes } from './routes/BadgeRoutes';

const cache = caches.default;

async function handleRoute(route: string, details: string[], query: URLSearchParams, request: Request) {
	switch (route) {
		case 'users': {
			const response = processDetails(details, {
				user_id: {
					position: 0,
					type: 'number',
				},
				username: {
					position: 0,
					type: 'string',
				},
				option: {
					position: 1,
					type: 'string',
				}
			}) as UserRouteResponse;
			return UserRoutes.handle(response, query);
		}

		case 'badges': {
			const response = processDetails(details, {
				user_id: {
					type: 'number',
					position: 0,
				},
				badge_id: {
					type: 'number',
					position: 0,
				},
				option: {
					type: 'string',
					position: 1,
				},
				badge_1: {
					type: 'number',
					position: 2,
				},
				badge_2: {
					type: 'number',
					position: 3,
				}
			}) as BadgeRouteResponse;
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
	let query = url.searchParams;
	details.shift();
	details.shift();

	return { route, details, query };
}

function processDetails(details: string[], bindings: Bindings) {
	let response: Record<string, string | number> = {};

	Object.entries(bindings).forEach(([key, value]) => {
		console.log(`Looking at: ${JSON.stringify({ key, value })}`);

		let info = details[value.position];
		switch (value.type) {
			default:
			case 'string':
				response[key] = info;
				break;
			case 'number':
				response[key] = Number(info);
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

		let { route, details, query } = await getRequestDetails(request);
		console.log({ route, details, query });

		let response = await cache.match(request.url);
		if (response) {
			console.log(`Found ${request.url} in cache, returning cached version`);
			return response;
		}

		response = await handleApiRequest(handleRoute(route, details, query, request));

		if (route == '') {
			// no point in caching the docs page.
			return response;
		}

		if (response.status == 202) {
			console.log(`Request ${request.url} is a stream. Not caching.`);
			return response;
		}

		let clone = response.clone();
		if (clone.status !== 302 && !clone.headers.get("content-type")?.includes("image")) {
			// console.log(clone);
			// console.log(await clone.text());
			let clone_json: ResponseType = await clone.json();
			if (clone_json.error) {
				console.log(`Request ${request.url} errored. Not storing in cache`);
				return response;
			}
		}

		console.log(`Request ${request.url} succeeded. Storing in cache (and returning)`)
		ctx.waitUntil(cache.put(request.url, response.clone()));
		return response;
	},
} satisfies ExportedHandler<Env>;
