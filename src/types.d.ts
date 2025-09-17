declare module '*.html' {
	const content: string;
	export default content;
}

declare module '*.css' {
	const content: string;
	export default content;
}

type RobloxUser = {
	description: string;
	created: string;
	isBanned: boolean;
	externalAppDisplayName: (string | null);
	hasVerifiedBadge: boolean;
	id: number;
	name: string;
	displayName: string;
	errors?: {
		code: number;
		message: string;
	}[];
}

type RobloxUserID = {
	requestedUsername: string;
	hasVerifiedBadge: boolean;
	id: number;
	name: string;
	displayName: string;
}

type RobloxUserIDResponse = {
	data: RobloxUserID[];
}

type RobloxBadge = {
	id: number;
	name: string;
	description: string;
	displayName: string;
	displayDescription: string;
	enabled: boolean;
	iconImageId: number;
	displayIconImageId: number;
	created: string;
	updated: string;
	statistics: {
		pastDayAwardedCount: number;
		awardedCount: number;
		winRatePercentage: number;
	};
	awardingUniverse: {
		id: number;
		name: string;
		rootPlaceId: number;
	}
}

type BadgeResponse = {
	badgeId: number;
	awardedDate?: string;
	date: number;
}

type BadgeResponseResponse = {
	data: BadgeResponse[];
}


type RobloxAssetID = {
	locations: {
		assetFormat: string;
		location: string;
		assetMetadatas: {
			metadataType: number;
			value: string;
		}[]?
	}[]?;
	errors: {
		code: number;
		message: string;
		customErrorCode: number?;
	}?;
	requestId: string;
	isHashDynamic: boolean;
	isCopyrightProtected: boolean;
	isArchived: boolean;
	assetTypeId: number;
	isRecordable: boolean;
	contentRepresentationSpecifier: {
		format: string;
		majorVersion: string;
		fidelity: string;
	}?;
}


type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

type Endpoint = {
	method: string;
	path: string;
	description: string;
	deprecated: {
		version: string;
		use: string;
	}?;
	parameters: {
		name: string;
		type: string;
		required: boolean;
		description: string;
		notes?: string[];
	}[];
	responses: {
		code: number;
		description: string;
		model?: Object;
	}[];
}

type BindingDefinition = {
	type: string;
	position: number;
}

type Bindings = Record<string, BindingDefinition>;

type BindingsResponse = {
	error: Record<string, string>;
	[key: string]: string | number;
}

type UserRouteResponse = {
	user_id?: number;
	username?: string;
	option: string;
}

type BadgeRouteResponse = {
	user_id: number;
	badge_id: number;
	option: string;
	badge_1?: number;
	badge_2?: number;
}

type ResponseType = {
	error?: string | null;
	error_details?: any[] | null;
	[key: string]: any;
}

type ThumbnailResponse = {
	data?: ThumbnailResponsePoint[];
	errors?: ErrorTemplate[];
}
type ThumbnailResponsePoint = ThumbnailResponseSuccess | ThumbnailResponseError;

type ThumbnailResponseSuccess = {
	targetId: number,
	state: string,
	imageUrl: string,
	version: string,
}

type ThumbnailResponseError = {
	code: number,
	message: string,
	field: string,
}

type ErrorTemplate = {
	code: number,
	message: string,
}
