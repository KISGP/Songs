import { NETEASE } from "../index";
import * as TYPE from "@/interface/interface";
import * as HANDLE from "./handle";
import { useUserStore } from "store/index";

const RESOURCE = ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"];
const searchResultType: { [key in TYPE.searchType]: number } = {
	单曲: 1,
	专辑: 10,
	歌手: 100,
	歌单: 1000,
	用户: 1002,
	MV: 1004,
	歌词: 1006,
	电台: 1009,
	视频: 1014,
	综合: 1018,
	声音: 2000,
};
/**
 * @description 获取歌曲的播放url
 */
export async function getSongUrl(id: string | number): Promise<string> {
	return await NETEASE.get({
		url: `/song/url`,
		myParams: {
			cookie: useUserStore().netease_login,
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
 * @description 获取歌曲详情
 */
export async function getSongsDetail(ids: Array<number>): Promise<TYPE.songDetailedType[]> {
	return await NETEASE.get({
		url: "/song/detail",
		myParams: {
			ids: ids.join(","),
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.song_detail(res);
			},
		},
	});
}

/**
 * @description 获取歌词
 */
export async function getLyric(id: string | number): Promise<TYPE.lyricsType> {
	return await NETEASE.get({
		url: `/lyric/new`,
		myParams: {
			id,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return HANDLE.lyric_new(res);
			},
		},
	});
}

/**
 * @description 获取推荐新音乐
 */
export async function getRecommendNewSong(
	limit: number = 30
): Promise<Array<TYPE.songDetailedType>> {
	return await NETEASE.get({
		url: "/personalized/newsong",
		myParams: {
			limit,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return HANDLE.personalized_newsong(res);
			},
		},
	});
}

/**
 * @description 获取每日推荐音乐
 */
export async function getRecommendDailySongs(): Promise<Array<TYPE.songDetailedType> | null> {
	return await NETEASE.get({
		url: "/recommend/songs",
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return HANDLE.recommend_songs(res);
			},
		},
	});
}

/**
 * @description 获取用户歌单(包含收藏和创建)
 */
export async function getMyList(
	userId: number,
	userName: string,
	returnListType: "all" | "created" | "subscribed" = "all"
): Promise<Array<TYPE.listBriefType>> {
	return await NETEASE.get({
		url: "/user/playlist",
		myParams: {
			uid: userId,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				if (typeof userId === "string") {
					userId = parseInt(userId);
				}
				let r: Array<TYPE.listBriefType> = HANDLE.user_playlist(res, returnListType, userId);
				r[0].name = r[0].name.replace(userName, "我");
				return r;
			},
		},
	});
}

/**
 * @description 删除歌单
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
 */
export async function getRecommendDailyList(): Promise<Array<TYPE.listBriefType>> {
	return await NETEASE.get({
		url: "/recommend/resource",
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return HANDLE.recommend_resource(res);
			},
		},
	});
}
/**
 * @description 推荐歌单
 */
export async function getRecommendList(): Promise<Array<TYPE.listBriefType>> {
	return await NETEASE.get({
		url: "/personalized",
		interceptors: {
			responseInterceptor: (res: any) => {
				return HANDLE.personalized(res);
			},
		},
	});
}

/**
 * @description 所有榜单
 */
export async function getTopList(): Promise<Array<TYPE.listBriefType>> {
	return await NETEASE.get({
		url: "/toplist",
		interceptors: {
			responseInterceptor: (res) => {
				return HANDLE.toplist(res);
			},
		},
	});
}

/**
 * @description 获取生成二维码图片的key
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
 */
export async function getUserInfo(): Promise<{
	id: number;
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
					id: Number(res.account.id),
					name: res.profile.nickname,
				};
			},
		},
	});
}

/**
 * @description 搜索建议
 */
export async function getSearchSuggestions(keywords: string): Promise<TYPE.suggestionsType> {
	return await NETEASE.get({
		url: "/search/suggest",
		myParams: {
			keywords,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.search_suggest(res);
			},
		},
	});
}

/**
 * @description 获取已收藏专辑列表
 */
export async function getSubscribedAlbum(
	limit: number = 10,
	offset: number = 0
): Promise<{ albumCount: number; albums: Array<TYPE.albumBriefType> }> {
	return await NETEASE.get({
		url: "/album/sublist",
		myParams: {
			cookie: true,
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.album_sublist(res);
			},
		},
	});
}

/**
 * @description 获取歌单详情
 * */
export async function getDetailedList(id: number | string): Promise<TYPE.listDetailedType> {
	return await NETEASE.get({
		url: `/playlist/detail`,
		myParams: {
			id,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.playlist_detail(res);
			},
		},
	});
}

/**
 * @description 获取歌单部分歌曲
 * */
export async function getListPartSong(
	id: number | string,
	limit: number = 10,
	offset: number = 0
): Promise<Array<TYPE.songDetailedType>> {
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
				return HANDLE.playlist_track_all(res);
			},
		},
	});
}
/**
 * @description 获取歌单所有歌曲
 * */
export async function getListAllSong(id: number): Promise<Array<TYPE.songDetailedType>> {
	return await NETEASE.get({
		url: `/playlist/track/all`,
		myParams: {
			id,
			timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.playlist_track_all(res);
			},
		},
	});
}

/**
 * @description 获取专辑内容+专辑动态信息
 * */
export async function getDetailedAlbum(id: number | string): Promise<TYPE.albumDetailedType> {
	const r1 = await NETEASE.get({
		url: "/album",
		myParams: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.album(res);
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
				return HANDLE.album_detail_dynamic(res);
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
	return r1 as TYPE.albumDetailedType;
}

/**
 * @description 歌单评论
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
 * */
export async function getComment(
	id: string | number,
	sortType: "推荐" | "热度" | "时间",
	type: TYPE.resources,
	pageNo: number = 1,
	pageSize: number = 30,
	cursor?: number
): Promise<Array<TYPE.commentType>> {
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
				return HANDLE.comment_new(res);
			},
		},
	});
}

/**
 * @description 给评论点赞
 * */
export async function likeComment(
	resourcesId: number | string,
	commentId: number | string,
	isLiked: 1 | 0, //1点赞 0取消点赞
	type: TYPE.resources
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
 * */
export async function getFloorComments(
	parentCommentId: number | string,
	resourcesId: number | string,
	type: TYPE.resources,
	limit: number = 20,
	time: number | string = ""
): Promise<Array<TYPE.commentType>> {
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
				return HANDLE.comment_floor(res);
			},
		},
	});
}

/**
 * @description 收藏/取消收藏专辑
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
 * */
export async function like(id: number | string, isLiked: boolean = true): Promise<boolean> {
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
 * */
export async function getLikedSongsID(uid: number): Promise<Array<number>> {
	return await NETEASE.get({
		url: "/likelist",
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
 * */
export async function updateList(
	operate: "add" | "del",
	listId: number,
	songsId: Array<number>
): Promise<boolean> {
	return await NETEASE.get({
		url: "/playlist/tracks",
		myParams: {
			op: operate,
			pid: listId,
			tracks: songsId.join(","),
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.body.code === 200 ? true : false;
			},
		},
	});
}

/**
 * @description 获取歌手详情
 * */
export async function getDetailedArtist(id: number): Promise<TYPE.artistDetailedType> {
	return {
		info: await NETEASE.get({
			url: "/artist/detail",
			myParams: {
				id,
				cookie: true,
			},
			interceptors: {
				async responseInterceptor(res: any) {
					const r = HANDLE.artist_detail(res);
					r.count.fans = await getArtistFansCount(id);
					return r;
				},
			},
		}),
		introduction: await getArtistIntroduction(id),
	};
}

/**
 * @description 获取歌手描述
 * */
export async function getArtistIntroduction(id: number): Promise<TYPE.artistIntroductionType> {
	return await NETEASE.get({
		url: "/artist/desc",
		myParams: {
			id,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return {
					briefIntroduction: res.briefDesc,
					item: res.introduction.map((e: any) => {
						return {
							title: e.ti,
							content: e.txt,
						};
					}),
				};
			},
		},
	});
}

/**
 * @description 歌手热门 50 首歌曲
 * */
export async function getArtistHotSongs(id: number): Promise<TYPE.songDetailedType[]> {
	return await NETEASE.get({
		url: "/artist/top/song",
		myParams: {
			id,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.artist_top_song(res);
			},
		},
	});
}

/**
 * @description 获取相似歌手
 * */
export async function getSimilarArtists(id: number): Promise<TYPE.artistBriefType[]> {
	return await NETEASE.get({
		url: "/simi/artist",
		myParams: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.simi_artist(res);
			},
		},
	});
}

/**
 * @description 收藏的歌手列表
 * */
export async function getSubscribedArtists(): Promise<TYPE.artistBriefType[]> {
	return await NETEASE.get({
		url: "/artist/sublist",
		myParams: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.artist_sublist(res);
			},
		},
	});
}

/**
 * @description 收藏/取消收藏歌手
 * */
export async function subscribeArtist(id: number, operate: boolean): Promise<boolean> {
	return await NETEASE.get({
		url: "/artist/sub",
		myParams: {
			id,
			t: operate ? 1 : 0,
			timeStamp: true,
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
 * @description 关注歌手新歌
 * @param coverSize 返回图片大小
 * */
export async function getSubscribedArtistsNewSongs(
	limit: number = 20,
	before: number = 0,
	coverSize: number = 80
): Promise<TYPE.SubscribedNewSongsType[]> {
	return await NETEASE.get({
		url: "/artist/new/song",
		myParams: {
			limit,
			before: before ? before : "",
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.artist_new_song(res, coverSize);
			},
		},
	});
}

/**
 * @description 歌手榜
 * */
export async function getTopArtists(
	type: "华语" | "欧美" | "韩国" | "日本" = "华语"
): Promise<TYPE.artistBriefType[]> {
	return await NETEASE.get({
		url: "/toplist/artist",
		myParams: {
			type: ["", "华语", "欧美", "韩国", "日本"].indexOf(type),
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.toplist_artist(res);
			},
		},
	});
}

/**
 * @description 歌手粉丝数量
 * */
export async function getArtistFansCount(id: number): Promise<number> {
	return await NETEASE.get({
		url: "/artist/follow/count",
		myParams: {
			id,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.fansCnt;
			},
		},
	});
}

/**
 * @description 热门歌手
 * */
export async function getHotArtist(
	offset: number = 0,
	limit: number = 30
): Promise<{ more: boolean; artists: TYPE.artistBriefType[] }> {
	return await NETEASE.get({
		url: "/top/artists",
		myParams: {
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.top_artists(res);
			},
		},
	});
}

/**
 * @description 歌手分类列表
 * */
export async function getFilteredArtist(
	type: number,
	area: number,
	initial: string,
	offset: number = 0,
	limit: number = 30
): Promise<{ more: boolean; artists: TYPE.artistBriefType[] }> {
	return await NETEASE.get({
		url: "/artist/list",
		myParams: {
			type,
			area,
			initial,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.artist_list(res);
			},
		},
	});
}

/**
 * @description 歌手全部歌曲
 * */
export async function getArtistAllSongs(
	id: number,
	order: "hot" | "time" = "hot",
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.songDetailedType[]> {
	return await NETEASE.get({
		url: "/artist/songs",
		myParams: {
			id,
			order,
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.artist_songs(res);
			},
		},
	});
}

/**
 * @description 搜索
 * */
export async function search(
	keywords: string,
	type: TYPE.searchType,
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.searchResultType> {
	return await NETEASE.get({
		url: "/cloudsearch",
		myParams: {
			keywords,
			type: searchResultType[type],
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return HANDLE.cloudsearch(res, type);
			},
		},
	});
}

/**
 * @description 获取歌手专辑
 * */
export async function getArtistAlbums(
	id: number,
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.albumBriefType[]> {
	return NETEASE.get({
		url: "/artist/album",
		myParams: {
			id,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.artist_album(res);
			},
		},
	});
}

/**
 * @description 获取歌手MV
 * */
export async function getArtistMV(
	id: number,
	offset: number = 0,
	limit: number = 20
): Promise<TYPE.videoType[]> {
	return await NETEASE.get({
		url: "/artist/mv",
		myParams: {
			id,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return HANDLE.artist_mv(res);
			},
		},
	});
}

/**
 * @description mv 地址
 * */
export async function getMVUrl(id: number, resolution: number = 1080): Promise<string> {
	return await NETEASE.get({
		url: "/mv/url",
		myParams: {
			id,
			r: resolution,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.url;
			},
		},
	});
}
