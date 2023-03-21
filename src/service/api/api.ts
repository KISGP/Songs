import { NETEASE } from "../index";
import type {
	songDetailedType,
	listBriefType,
	listDetailedType,
	lyricType,
	albumBriefType,
	albumDetailedType,
	commentType,
	resources,
} from "@/interface/interface";
import {
	personalized_newsong,
	personalized,
	recommend_songs,
	recommend_resource,
	toplist,
	user_playlist,
	lyric_new,
	search_suggest,
	album_sublist,
	playlist_detail,
	playlist_track_all,
	album,
	album_detail_dynamic,
	comment_new,
	comment_floor,
} from "./response-handle";
import { RESOURCE } from "@/constant/constant";
/**
 * @description 获取歌曲的播放url
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e5%b7%b2%e6%94%b6%e8%97%8f%e4%b8%93%e8%be%91%e5%88%97%e8%a1%a8
 */
export async function getSongUrl(id: string | number): Promise<string> {
	return await NETEASE.get({
		url: `/song/url`,
		myParams: {
			cookie: true,
			id,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.data[0].url;
			},
		},
	});
}

/**
 * @description 获取歌词
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%80%90%e5%ad%97%e6%ad%8c%e8%af%8d
 */
export async function getLyric(id: string | number): Promise<lyricType> {
	return await NETEASE.get({
		url: `/lyric/new`,
		myParams: {
			cookie: true,
			id,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return lyric_new(res);
			},
		},
	});
}

/**
 * @description 获取推荐新音乐
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%8e%a8%e8%8d%90%e6%96%b0%e9%9f%b3%e4%b9%90
 */
export async function getRecommendNewSong(limit: number = 30): Promise<Array<songDetailedType>> {
	return await NETEASE.get({
		url: "/personalized/newsong",
		myParams: {
			limit,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return personalized_newsong(res);
			},
		},
	});
}

/**
 * @description 获取每日推荐音乐
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%af%8f%e6%97%a5%e6%8e%a8%e8%8d%90%e6%ad%8c%e6%9b%b2
 */
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

/**
 * @description 获取用户歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95
 */
export async function getMyList(
	userId: string | number,
	userName: string
): Promise<Array<listBriefType>> {
	return await await NETEASE.get({
		url: `/user/playlist`,
		myParams: {
			uid: userId,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				let r: Array<listBriefType> = user_playlist(res);
				r[0].name = r[0].name.replace(userName, "我");
				return r;
			},
		},
	});
}

/**
 * @description 删除歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%88%a0%e9%99%a4%e6%ad%8c%e5%8d%95
 */
export async function deleteList(id: string | number): Promise<boolean> {
	const r: number = await NETEASE.get({
		url: `/playlist/delete`,
		myParams: {
			id,
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

/**
 * @description 新建歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%96%b0%e5%bb%ba%e6%ad%8c%e5%8d%95
 */
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

/**
 * @description 获取每日推荐歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%af%8f%e6%97%a5%e6%8e%a8%e8%8d%90%e6%ad%8c%e5%8d%95
 */
export async function getRecommendDailyList(): Promise<Array<listBriefType>> {
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
/**
 * @description 推荐歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%8e%a8%e8%8d%90%e6%ad%8c%e5%8d%95
 */
export async function getRecommendList(): Promise<Array<listBriefType>> {
	return await NETEASE.get({
		url: "/personalized",
		interceptors: {
			responseInterceptor: (res: any) => {
				return personalized(res);
			},
		},
	});
}

/**
 * @description 所有榜单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%89%80%e6%9c%89%e6%a6%9c%e5%8d%95
 */
export async function getTopList(): Promise<Array<listBriefType>> {
	return await NETEASE.get({
		url: "/toplist",
		interceptors: {
			responseInterceptor: (res) => {
				return toplist(res);
			},
		},
	});
}

/**
 * @description 获取生成二维码图片的key
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=_1-%e4%ba%8c%e7%bb%b4%e7%a0%81-key-%e7%94%9f%e6%88%90%e6%8e%a5%e5%8f%a3
 */
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

/**
 * @description 获取二维码图片的base64码
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=_2-%e4%ba%8c%e7%bb%b4%e7%a0%81%e7%94%9f%e6%88%90%e6%8e%a5%e5%8f%a3
 */
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

/**
 * @description 检测二维码状态
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=_3-%e4%ba%8c%e7%bb%b4%e7%a0%81%e6%a3%80%e6%b5%8b%e6%89%ab%e7%a0%81%e7%8a%b6%e6%80%81%e6%8e%a5%e5%8f%a3
 */
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

/**
 * @description 获取账号信息
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e8%b4%a6%e5%8f%b7%e4%bf%a1%e6%81%af
 */
export async function getUserInfo(): Promise<{
	id: string;
	name: string;
}> {
	return await NETEASE.get({
		url: "/user/account",
		myParams: {
			cookie: true,
		},
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

/**
 * @description 搜索建议
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%90%9c%e7%b4%a2%e5%bb%ba%e8%ae%ae
 */
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

/**
 * @description 获取我的歌单
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e5%b7%b2%e6%94%b6%e8%97%8f%e4%b8%93%e8%be%91%e5%88%97%e8%a1%a8
 */
export async function getSubscribedAlbum(
	limit: number = 10,
	offset: number = 0
): Promise<{ albumCount: number; albums: Array<albumBriefType> }> {
	return await NETEASE.get({
		url: "/album/sublist",
		myParams: {
			cookie: true,
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res) {
				return album_sublist(res);
			},
		},
	});
}

/**
 * @description 获取歌单详情
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e8%af%a6%e6%83%85
 * */
export async function getDetailedList(id: number | string): Promise<listDetailedType> {
	return await NETEASE.get({
		url: `/playlist/detail`,
		myParams: {
			id,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return playlist_detail(res);
			},
		},
	});
}

/**
 * @description 获取歌单所有歌曲
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e6%ad%8c%e5%8d%95%e6%89%80%e6%9c%89%e6%ad%8c%e6%9b%b2
 * */
export async function getListAllSong(
	id: number | string,
	limit: number = 10,
	offset: number = 0
): Promise<Array<songDetailedType>> {
	return await NETEASE.get({
		url: `/playlist/track/all`,
		myParams: {
			id,
			limit,
			offset,
			timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return playlist_track_all(res);
			},
		},
	});
}

/**
 * @description 获取专辑内容+专辑动态信息
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e4%b8%93%e8%be%91%e5%86%85%e5%ae%b9
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e4%b8%93%e8%be%91%e5%8a%a8%e6%80%81%e4%bf%a1%e6%81%af
 * */
export async function getDetailedAlbum(id: number | string): Promise<albumDetailedType> {
	const r1 = await NETEASE.get({
		url: "/album",
		myParams: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return album(res);
			},
		},
	});
	const r2 = await NETEASE.get({
		url: "/album/detail/dynamic",
		myParams: {
			id,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return album_detail_dynamic(res);
			},
		},
	});
	const { subTime, shareCount, commentCount, subscribedCount, subscribed } = r2;
	r1.album.subTime = subTime;
	r1.album.shareCount = shareCount;
	r1.album.commentCount = commentCount;
	r1.album.subscribedCount = subscribedCount;
	r1.album.subscribed = subscribed;
	r1.album.songCount = r1.songs.length;
	return r1 as albumDetailedType;
}

/**
 * @description 歌单评论
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e5%8d%95%e8%af%84%e8%ae%ba
 * */
export async function getListComment(id: string | number, limit: number = 30, offset: number = 0) {
	return await NETEASE.get({
		url: "/comment/playlist",
		myParams: {
			id,
			limit,
			offset,
		},
	});
}

/**
 * @description 新版评论接口
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%96%b0%e7%89%88%e8%af%84%e8%ae%ba%e6%8e%a5%e5%8f%a3
 * */
export async function getComment(
	id: string | number,
	sortType: "推荐" | "热度" | "时间",
	type: resources,
	pageNo: number = 1,
	pageSize: number = 30,
	cursor?: number
): Promise<Array<commentType>> {
	return await NETEASE.get({
		url: "/comment/new",
		myParams: {
			id,
			type: RESOURCE.indexOf(type),
			sortType: ["", "推荐", "热度", "时间"].indexOf(sortType),
			pageNo,
			pageSize,
			cursor,
			// timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return comment_new(res);
			},
		},
	});
}

/**
 * @description 给评论点赞
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e7%bb%99%e8%af%84%e8%ae%ba%e7%82%b9%e8%b5%9e
 * */
export async function likeComment(
	resourcesId: number | string,
	commentId: number | string,
	isLiked: 1 | 0, //1点赞 0取消点赞
	type: resources
): Promise<boolean> {
	return await NETEASE.get({
		url: "/comment/like",
		myParams: {
			id: resourcesId,
			cid: commentId,
			t: isLiked,
			type: RESOURCE.indexOf(type),
			// timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code === 200 ? true : false;
			},
		},
	});
}

/**
 * @description 楼层评论
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%a5%bc%e5%b1%82%e8%af%84%e8%ae%ba
 * */
export async function getFloorComments(
	parentCommentId: number | string,
	resourcesId: number | string,
	type: resources,
	limit: number = 20,
	time: number | string = ""
): Promise<Array<commentType>> {
	return await NETEASE.get({
		url: "/comment/floor",
		myParams: {
			parentCommentId,
			id: resourcesId,
			type: RESOURCE.indexOf(type),
			limit,
			time,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return comment_floor(res);
			},
		},
	});
}

/**
 * @description 收藏/取消收藏专辑
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%94%b6%e8%97%8f%e5%8f%96%e6%b6%88%e6%94%b6%e8%97%8f%e4%b8%93%e8%be%91
 * */
export async function subscribeAlbum(id: number | string, isSubscribe: boolean): Promise<boolean> {
	return await NETEASE.get({
		url: "/album/sub",
		myParams: {
			id,
			t: isSubscribe ? 1 : 0,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code === 200 ? true : false;
			},
		},
	});
}

/**
 * @description 喜欢音乐
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%96%9c%e6%ac%a2%e9%9f%b3%e4%b9%90
 * */
export async function likeSong(id: number | string, isLiked: boolean = true): Promise<boolean> {
	return await NETEASE.get({
		url: "/like",
		myParams: {
			id,
			like: isLiked,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code === 200 ? true : false;
			},
		},
	});
}

/**
 * @description 喜欢音乐列表
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%96%9c%e6%ac%a2%e9%9f%b3%e4%b9%90%e5%88%97%e8%a1%a8
 * */
export async function getLikedSongsID(uid: number | string): Promise<Array<number>> {
	return await NETEASE.get({
		url: "/likelist?uid=32953014",
		myParams: {
			uid,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.ids;
			},
		},
	});
}

/**
 * @description 对歌单添加或删除歌曲
 * @link https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%af%b9%e6%ad%8c%e5%8d%95%e6%b7%bb%e5%8a%a0%e6%88%96%e5%88%a0%e9%99%a4%e6%ad%8c%e6%9b%b2
 * */
export async function updateList(operate: "add" | "del", listId: number, songsId: Array<number>) {
	return await NETEASE.get({
		url: "/playlist/tracks?op=add&pid=24381616&tracks=347231",
		myParams: {
			op: operate,
			pid: listId,
			tracks: songsId.join(","),
			cookie: true,
			timeStamp: true,
		},
	});
}
