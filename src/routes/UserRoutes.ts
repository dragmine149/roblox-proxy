import { DataResponse } from '../utils';
import { fromId, fromName, getAvatar, idFromName } from '../apis/users';

export class UserRoutes {
	static async handle(response: UserRouteResponse, query: URLSearchParams) {
		let { user_id, username, option } = response;

		if (option && option.startsWith('avatar')) {
			let split = option.split(".");
			let format = split[1];
			let type = split[0].split("_")[1];

			if (username && !user_id) user_id = await idFromName(username);
			console.log(`Getting user avatar for ${user_id}`);
			return getAvatar(user_id as number, type || "full", query.get('size'), format.toLowerCase(), query.has('circular'), query.has('direct'));
		}

		switch (option) {
			case '':
			default:
				if (user_id) {
					return fromId(user_id)
				}
				if (username) {
					return fromName(username as string)
				}
				return DataResponse.APIDoesntExist();
		}
	}
}
