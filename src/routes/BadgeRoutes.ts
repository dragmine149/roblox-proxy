import { DataResponse, tryCatch } from '../utils';
import { getBadgeData, getAllBadgeData, compareBadges, getBadgeIcon } from '../apis/badges';

export class BadgeRoutes {
	static async handle(response: BadgeRouteResponse, request: Request) {
		const { user_id, option, badge_1, badge_2, badge_id } = response;

		console.log(`Getting badge data for ${user_id}`, { option, badge_1, badge_2 });

		switch (option) {
			case 'icon':
				return getBadgeIcon(badge_id);
			case 'earliest':
				if (!badge_1) return DataResponse.URLParseFailed('Badge_1 is not provided.');
				if (!badge_2) return DataResponse.URLParseFailed('Badge_2 is not provided.');

				return compareBadges(user_id, badge_1, badge_2);
			case 'all':
				let jsonBadges = await tryCatch<{ badgeids: number[] }>(request.json());
				if (jsonBadges.error) {
					return DataResponse.ParseJsonFailed("Failed to parse request body. Did any body get sent?");
				}
				let badges = jsonBadges.data;
				if (!badges.badgeids) {
					return DataResponse.ParseJsonFailed("No badge IDs provided.");
				}

				return getAllBadgeData(user_id, badges.badgeids);
			case 'badge':
				// badge_id is the same as user_id for when user_id doesn't exist. Hence we use badge_1.
				return getBadgeData(user_id, badge_1 as number);
			default:
				return DataResponse.APIDoesntExist();
		}
	}
}
