export const UPDATES = {
	$template: {
		description: '',
		breakingChanges: [],
		added: [],
		changed: [],
		fixed: [],
		removed: [],
		date: new Date()
	},
	v0_0_0: {
		description: 'Initial release',
		breakingChanges: [],
		added: [],
		changed: [],
		fixed: [],
		removed: [],
		date: new Date(1742946792000)
	},
	v0_1_0: {
		description: 'Documentation',
		breakingChanges: [],
		added: [
			'Public documentation for all endpoints'
		],
		changed: [],
		fixed: [],
		removed: [],
		date: new Date(1744235940000),
	},
	v0_1_1: {
		description: 'New endpoint',
		breakingChanges: [
			'`/towers/{id}/{badge}` to `/towers/{id}/badge/{badge}` to make it more inline with the other endpoints.'
		],
		added: [
			'`/towers/{id}/earliest/{badge1}/{badge2}` for comparing two badges and returning information about the one claimed first.'
		],
		changed: [
		],
		fixed: [],
		removed: [],
		date: new Date(1744384140000),
	},
	v0_2_0: {
		description: 'Standerised Return types',
		breakingChanges: ['Most returns types are now of a different Standerised json format. This will break most things.'],
		added: [],
		changed: [
			'Everything now has a Standerised return type. Errors return data using the json `error` key.',
			'`/towers/{id}/all` no longer reduces the chunk size of request to roblox',
		],
		fixed: [],
		removed: [],
		date: new Date(1744503000000),
	},
	v0_2_1: {
		description: 'Codebase tidy up and bug fixes',
		breakingChanges: [
		],
		added: [],
		changed: [
			'`/users/{username}` is now `/users/{username}/id` to fix an issue with switch case. In theory `/users/{username}` should still work but `/users/{username}/id` is guaranteed to work'
		],
		fixed: [],
		removed: [],
		date: new Date(1744645500000),
	},
	v0_2_2: {
		description: 'Caching',
		breakingChanges: [],
		added: [
			'Caching the passed response on cloudflare to hopefully help avoid times when roblox API breaks for no apparent reason.'
		],
		changed: [],
		fixed: [],
		removed: [],
		date: new Date(1744727160000),
	},
	v0_3_0: {
		description: 'Separated from EToH and moved into roblox instead.',
		breakingChanges: [
			'`etoh-proxy` will no longer work as it is now `roblox-proxy`',
			'`/towers/{anything}` will no longer return data as it has been renamed to `/badges/{anything}`'
		],
		added: [],
		changed: [],
		fixed: [],
		removed: [],
		date: new Date(1744734066000),
	},
	v0_3_1: {
		description: 'Update log, internal renaming, endpoint expansion',
		breakingChanges: [],
		added: [
			'Update log (this) and (hopefully) all the updates.'
		],
		changed: [
			'`/users/{id}/name` now returns `display name` and `ui` data along side the `name` field. This won\'t break anything but just give more to work with.'
		],
		fixed: [],
		removed: [
			'Last of internal references to EToH'
		],
		date: new Date(1744915081000)
	}
}
