import { DataResponse, tryCatch } from "../utils";
import { fetchRequest } from "../wrappers";

export async function idFromName(name: string): Promise<number> {
	// if we have no name, then return as there is no reason for us to do anything.
	if (!name) return -1;

	// Test for username as per the api.
	let response = await tryCatch(fetch(fetchRequest('https://users.roblox.com/v1/usernames/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			usernames: [name],
			excludeBannedUsers: true
		})
	})));

	// if we have an error during the fetch
	if (response.error) return -1;

	// decode the id from the data
	let data = await tryCatch<RobloxUserIDResponse>(response.data.json());
	if (data.error) return -1;

	return data.data.data[0].id;
}

/**
* Gets the id of an user
* @param name The roblox USERNAME (not display name) of the user to get
* @returns The ID of the user
*/
export async function fromName(name: string): Promise<Response> {
	// if we have no name, then return as there is no reason for us to do anything.
	if (!name) {
		return DataResponse.UserNotFoundName(name);
	}

	// Test for username as per the api.
	let response = await tryCatch(fetch(fetchRequest('https://users.roblox.com/v1/usernames/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			usernames: [name],
			excludeBannedUsers: true
		})
	})));

	// if we have an error during the fetch
	if (response.error) {
		return DataResponse.FetchFailed(response.error.message);
	}


	// decode the id from the data
	let data = await tryCatch<RobloxUserIDResponse>(response.data.json());
	if (data.error) {
		return DataResponse.ParseJsonFailed(data.error.message);
	}

	let rbx_data = data.data.data;

	// just make sure we have data
	if (rbx_data?.length > 0) {
		return DataResponse.UserFound({
			id: rbx_data[0].id,
			name: rbx_data[0].name,
			display: rbx_data[0].displayName,
		});
	}

	return DataResponse.UserNotFoundName(name);
}

export async function fromId(id: number): Promise<Response> {
	if (!id) {
		return DataResponse.UserNotFoundId(id);
	}

	let response = await tryCatch(fetch(fetchRequest(`https://users.roblox.com/v1/users/${id}`, {
		method: 'GET'
	})));

	if (response.error) {
		return DataResponse.FetchFailed(response.error.message);
	}

	let data = await tryCatch<RobloxUser>(response.data.json());
	if (data.error) {
		return DataResponse.ParseJsonFailed(data.error.message);
	}

	if (data.data.errors) {
		console.warn(data.data.errors);
		return DataResponse.UserNotFoundId(id);
	}

	return DataResponse.UserFound({
		id: data.data.id,
		name: data.data.name,
		display: data.data.displayName,
	});
}

// type avatarSize = 48 | 50 | 60 | 75 | 100 | 110 | 150 | 180 | 352 | 420 | 720;
const avatarSizeAllowed = [48, 50, 60, 75, 100, 110, 150, 180, 352, 420, 720];
const avatarFormat = {
	png: 'Png',
	jpeg: 'Jpeg',
	webp: 'Webp'
};
const avatarType = {
	full: '',
	bust: '-bust',
	headshot: '-headshot',
};

export async function getAvatar(id: number, type: string, size: string | null, format: string, circular: boolean, direct: boolean | null) {
	if (!Object.keys(avatarType).includes(type)) {
		console.log(`Failed to find ${type} in avatarType`);
		return DataResponse.APIDoesntExist();
	}
	type = avatarType[type as keyof typeof avatarType];

	if (size == null) {
		return DataResponse.URLParseFailed(`Missing \`size\` query in URL.`);
	}
	let size_int = Number.parseInt(size);
	if (!avatarSizeAllowed.includes(size_int)) {
		return DataResponse.URLParseFailed(`\`size\` parameter is not a valid number! Please check the documentation for valid sizes.`);
	}

	if (!Object.keys(avatarFormat).includes(format)) {
		return DataResponse.URLParseFailed(`\`format\` is not valid. Please check the documentation for valid formats`)
	}
	format = avatarFormat[format as keyof typeof avatarFormat];

	let pending = true;
	let user;
	while (pending) {
		console.log(`Sending query to server: https://thumbnails.roblox.com/v1/users/avatar${type}?userIds=${id}&size=${size_int}x${size_int}&format=${format}&isCircular=${circular}`);
		let response = await tryCatch(fetch(fetchRequest(`https://thumbnails.roblox.com/v1/users/avatar${type}?userIds=${id}&size=${size_int}x${size_int}&format=${format}&isCircular=${circular}`)))
		if (response.error) {
			return DataResponse.FetchFailed(response.error.message);
		}

		let data = await tryCatch<ThumbnailResponse>(response.data.json());
		if (data.error) {
			return DataResponse.ParseJsonFailed(data.error.message);
		}
		console.log(data);

		if (data.data.errors) {
			return DataResponse.FetchFailed(`Something happened in the back end which failed the request (or roblox is down). Please report this with the URL.`);
		}

		// we can confirm it's the first one as thats the only user we're allowed to send
		user = (data.data.data as ThumbnailResponsePoint[])[0];
		console.log(`User data is: ${JSON.stringify(user)}`);

		if ((user as ThumbnailResponseError).code) {
			return DataResponse.ThumbnailFailed(id, (user as ThumbnailResponseError).message, (user as ThumbnailResponseError).field);
		}

		// If we are in pending mode, just send another request.
		pending = (user as ThumbnailResponseSuccess).state == "Pending";
		if (pending) await new Promise(resolve => setTimeout(resolve, 500));
	}

	if (direct) {
		let result = await tryCatch(fetch(fetchRequest((user as ThumbnailResponseSuccess).imageUrl)));
		if (result.error) return DataResponse.ThumbnailSucceed(id, (user as ThumbnailResponseSuccess).imageUrl);
		return result.data;

		// return DataResponse.ThumbnailDirect((user as ThumbnailResponseSuccess).imageUrl);
	}

	return DataResponse.ThumbnailSucceed(id, (user as ThumbnailResponseSuccess).imageUrl);
}
