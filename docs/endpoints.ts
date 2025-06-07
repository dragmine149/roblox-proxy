export const ENDPOINTS = {
	"": [
		{
			method: 'GET',
			path: '/',
			description: 'Get the root endpoint, aka this documentation.',
			parameters: [],
			responses: [
				{
					code: 200,
					description: 'The root endpoint was retrieved successfully',
					model: {
						message: {
							type: 'string',
							description: 'The message'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			path: '/{anything}',
			description: 'Any endpoint not listed in this documentation',
			parameters: [],
			responses: [
				{
					code: 501,
					description: 'Endpoint not found',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						}
					}
				}
			]
		}
	],
	"users": [
		{
			method: 'GET',
			path: '/users/{user}',
			description: 'Get information about a user from their id or name',
			parameters: [
				{
					name: 'user',
					type: 'string | number',
					required: true,
					description: 'The username of the user, or the userid of the user. Will also work with past usernames.'
				}
			],
			responses: [
				{
					code: 404,
					description: 'User could not be found or no user was provided.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						}
					}
				},
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'The user was found successfully. Most up to date user information returned',
					model: {
						id: {
							type: 'number',
							description: 'The Roblox user ID'
						},
						name: {
							type: 'string',
							description: 'The Roblox username'
						},
						display: {
							type: 'string',
							description: 'The Roblox user display name. Defaults to the username if no display name is found'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			path: '/users/{username}/id',
			description: 'Get user ID from username',
			deprecated: {
				version: '0.3.3',
				use: '/users/{user}'
			},
			parameters: [
				{
					name: 'username',
					type: 'string',
					required: true,
					description: 'The username of the user to get the ID for'
				}
			],
			responses: [
				{
					code: 404,
					description: 'User could not be found or no username was provided.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						}
					}
				},
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'The user was found successfully',
					model: {
						id: {
							type: 'number',
							description: 'The Roblox user ID'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			deprecated: {
				version: '0.3.3',
				use: '/users/{user}'
			},
			path: '/users/{userid}/name',
			description: 'Get user name from user ID',
			parameters: [
				{
					name: 'userid',
					type: 'number',
					required: true,
					description: 'The Roblox user ID to get the data for'
				}
			],
			responses: [
				{
					code: 404,
					description: 'User could not be found or no id was provided.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						}
					}
				},
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'The user was found successfully',
					model: {
						name: {
							type: 'string',
							description: 'The Roblox user username'
						},
						display: {
							type: 'string',
							description: 'The Roblox user display name'
						},
						ui: {
							type: 'string',
							description: 'A format of the display name and username to use in ui. Defaults to just display name if no difference.'
						}
					}
				}
			]
		}
	],
	"badges": [
		{
			method: 'GET',
			path: '/badges/{userid}/badge/{badgeid}',
			description: 'Get badge award date from user ID and badge ID',
			parameters: [
				{
					name: 'userid',
					type: 'number',
					required: true,
					description: 'The Roblox user ID to get the data for'
				},
				{
					name: 'badgeid',
					type: 'number',
					required: true,
					description: 'The Roblox badge ID to get the data for'
				}
			],
			responses: [
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						error: {
							type: 'string',
							description: 'The user does not have the badge. We do not know if the badge exists or not.'
						},
						date: {
							type: 'number',
							description: 'The default unix time of 0 as the user doesn\' have the badge'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						date: {
							type: 'number',
							description: 'The unix time of when the badge was awarded'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			path: '/badges/{userid}/all',
			description: 'Get all badge award dates from user ID',
			streamed: true,
			parameters: [
				{
					name: 'userid',
					type: 'number',
					required: true,
					description: 'The Roblox user ID to get the data for'
				},
				{
					name: 'badgeids',
					type: 'Array<number>',
					required: true,
					description: 'The Roblox badge ID to get the data for',
					notes: [
						'If the user does not have a badge, it will not be included in the response',
						'This list must be provided as a json in the body. Prvoided it in the url will not work (unless you know how to get it to treat like a body)'
					]
				},
			],
			responses: [
				{
					code: 202,
					description: 'The server has opened a stream ready to send badge data',
					model: {
						response: {
							type: 'ReadableStream',
							description: 'The stream that can be read to get the badge data'
						}
					}
				},
				{
					code: -1,
					description: 'An error returned during the stream, could be for any reason and any code. (hence the code of -1)',
					model: {
						error: {
							type: 'string',
							description: 'The error message returned during the stream, and the information. DO NOTE: This won\'t cause the stream to end and more successfully data can follow.'
						}
					}
				},
				{
					code: 500,
					description: 'An error occurred trying to translate the body that got sent in the request.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			path: '/badges/{userid}/earliest/{badge1}/{badge2}',
			description: 'Compare two badges and return the badge which was awarded the first',
			streamed: true,
			parameters: [
				{
					name: 'userid',
					type: 'number',
					required: true,
					description: 'The Roblox user ID to get the data for'
				},
				{
					name: 'badge1',
					type: 'number',
					required: true,
					description: 'The first badge id to compare with the second.',
				},
				{
					name: 'badge2',
					type: 'number',
					required: true,
					description: 'The second badge id to compare with the first.',
				}
			],
			responses: [
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Earliest badge failed to be got for some reason. Hence causing an issue. Please try again, if this issue persists then please raise an issue on github.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						error: {
							type: 'string',
							description: 'The user does not have the badge. We do not know if the badge exists or not.'
						},
						date: {
							type: 'number',
							description: 'The default unix time of 0 as the user doesn\' have the badge'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						date: {
							type: 'number',
							description: 'The unix time of when the badge was awarded'
						}
					}
				}
			]
		},
		{
			method: 'GET',
			path: '/badges/{badgeid}/icon',
			description: 'Get the icon URL for a badge',
			parameters: [
				{
					name: 'badgeid',
					type: 'number',
					required: true,
					description: 'The badge id to get the asset for.'
				}
			],
			responses: [
				{
					code: 400,
					description: 'Fetch failed. Roblox is either ratelimiting us or is currently down.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 500,
					description: 'Json retrieved from roblox failed to parse. This could be a server side issue not handing an edge case, or a roblox issue in how their data is returned.',
					model: {
						error: {
							type: 'string',
							description: 'The error message'
						},
						error_details: {
							type: 'any[]',
							description: 'More information about the error in question.'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						error: {
							type: 'string',
							description: 'The user does not have the badge. We do not know if the badge exists or not.'
						}
					}
				},
				{
					code: 200,
					description: 'Badge data has been retrieved from roblox',
					model: {
						url: {
							type: 'string',
							description: 'The id of the badge icon.'
						}
					}
				}
			]
		}
	],
};
