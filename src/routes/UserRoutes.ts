import { DataResponse } from '../utils';
import { fromId, fromName } from '../apis/users';

export class UserRoutes {
	static async handle(response: BindingsResponse) {
		const { user_id, username, option, error } = response;

		if (Object.keys(error).length > 0) {
			return DataResponse.URLParseFailed(error);
		}

		switch (option) {
			case 'name':
				console.log(`Getting user name from ${user_id}`);
				return fromId(user_id);

			case 'id':
				console.log(`Getting user id from ${username}`);
				return fromName(username);

			case '':
			default:
				if (user_id) {
					return fromId(user_id)
				}
				if (username) {
					return fromName(username)
				}
				return DataResponse.APIDoesntExist();
		}
	}
}
