import { NETEASE } from "../index";
import type { songDetailedType, listType, suggestionsType } from "@/interface/interface";
import {
	personalized_newsong,
	personalized,
	recommend_songs,
	recommend_resource,
	toplist,
	user_playlist,
	lyric_new,
	search_suggest,
} from "./response-handle";
export async function getSongUrl(id: string | number): Promise<string> {
	return await NETEASE.get({
		url: `/song/url?id=${id}`,
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.data[0].url;
			},
		},
	});
}

export async function getLyric(id: string | number) {
	await NETEASE.get({
		url: `/lyric/new?id=${id}`,
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return lyric_new(res);
			},
		},
	});
}

export async function getRecommendNewSong(limit: number = 30): Promise<Array<songDetailedType>> {
	return await NETEASE.get({
		url: "/personalized/newsong?limit=30",
		interceptors: {
			responseInterceptor: (res) => {
				return personalized_newsong(res);
			},
		},
	});
}

export async function getRecommendDailySongs(): Promise<Array<songDetailedType>> {
	return await NETEASE.get({
		url: "/recommend/songs",
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return recommend_songs(res);
			},
		},
	});
}

export async function getMyList(
	userId: string | number,
	userName: string
): Promise<Array<listType>> {
	return await await NETEASE.get({
		url: `/user/playlist?uid=${userId}`,
		myParams: {
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				let r: Array<listType> = user_playlist(res);
				r[0].name = r[0].name.replace(userName, "我");
				return r;
			},
		},
	});
}

export async function deleteList(id: string | number): Promise<boolean> {
	const r: number = await NETEASE.get({
		url: `/playlist/delete?id=${id}`,
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code;
			},
		},
	});
	return r == 200 ? true : false;
}

export async function createList(
	name: string,
	type: "NORMAL" | "SHARED" | "VIDEO",
	isPrivate: boolean
): Promise<{
	success: boolean;
	message: string;
}> {
	name = name.trim();
	if (!name) {
		return {
			success: false,
			message: "歌单名不能为空",
		};
	} else if (name.length >= 40) {
		return {
			success: false,
			message: "歌单名长度应小于40",
		};
	}
	return await NETEASE.get({
		url: `/playlist/create`,
		myParams: {
			cookie: true,
			timeStamp: true,
			name,
			type,
			privacy: isPrivate ? 10 : "",
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code == 200
					? {
							success: true,
							message: "歌单创建成功",
					  }
					: {
							success: false,
							message: "歌单创建失败",
					  };
			},
		},
	});
}

export async function getRecommendDailyList(): Promise<Array<listType>> {
	return await NETEASE.get({
		url: "/recommend/resource",
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return recommend_resource(res);
			},
		},
	});
}

export async function getRecommendList(): Promise<Array<listType>> {
	return await NETEASE.get({
		url: "/personalized",
		interceptors: {
			responseInterceptor: (res: any) => {
				return personalized(res);
			},
		},
	});
}

export async function getTopList(): Promise<Array<listType>> {
	return await NETEASE.get({
		url: "/toplist",
		interceptors: {
			responseInterceptor: (res) => {
				return toplist(res);
			},
		},
	});
}

export async function getQRKey(): Promise<string> {
	return await NETEASE.get({
		url: "/login/qr/key",
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.data.unikey;
			},
		},
	});
}

export async function getQRImgBase64(key: string): Promise<string> {
	return await NETEASE.get({
		url: `/login/qr/create`,
		myParams: {
			key: key,
			qrimg: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.data.qrimg;
			},
		},
	});
}

export async function checkQRStatus(key: string): Promise<{
	state: 800 | 801 | 802 | 803;
	cookie: string;
}> {
	return await NETEASE.get({
		url: `/login/qr/check`,
		myParams: {
			key: key,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return {
					state: res.code,
					cookie: res.cookie,
				};
			},
		},
	});
}

export async function getUserInfo(): Promise<{
	id: string;
	name: string;
}> {
	return await NETEASE.get({
		url: "/user/account",
		interceptors: {
			responseInterceptor: (res: any) => {
				return {
					id: res.account.id,
					name: res.profile.nickname,
				};
			},
		},
	});
}

export async function getSearchSuggestions(keywords: string) {
	return await NETEASE.get({
		url: "/search/suggest",
		myParams: {
			keywords,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return search_suggest(res);
			},
		},
	});
}
