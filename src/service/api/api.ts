import { NETEASE } from "../instance";
import * as TYPE from "@/type/type";
import { useUserStore } from "store/index";
import { cutImg, spliceSingersName, modifySingers } from "utils/tool";
import { transformTimeStamp, handlePeopleCount } from "utils/utils-common";

/**
 * @description 获取歌曲的播放url
 */
export function getSongUrl(id: string | number): Promise<string> {
	return NETEASE.get({
		url: `/song/url`,
		params: {
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
export function getSongsDetail(ids: number[]): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/song/detail",
		params: {
			ids: ids.join(","),
		},
		interceptors: {
			responseInterceptor(res) {
				return res.songs.map((e: any): TYPE.song => {
					const cover = cutImg(e.al.picUrl);
					return {
						id: e.id,
						name: e.name,
						url: "",
						cover,
						alias: e.alia,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover,
						},
					};
				});
			},
		},
	});
}

/**
 * @description 获取歌词
 */
export function getLyrics(id: string | number): Promise<TYPE.lyrics> {
	return NETEASE.get({
		url: "/lyric/new",
		params: {
			id,
		},
		interceptors: {
			responseInterceptor: (res) => {
				const result: TYPE.lyrics = { lyrics: null, translator: null };
				// 判断是否存歌词
				if (res.lrc.lyric) {
					// 歌词处理
					let a = res.lrc.lyric.slice(res.lrc.lyric.indexOf("[00:")).split("\n");
					a.pop();
					result.lyrics = a.map((e: string): TYPE.lyricItem => {
						let splitIndex = e.indexOf("]");
						let foo = e.slice(1, splitIndex).split(":");
						return {
							time: Math.floor((parseInt(foo[0]) * 60 + parseFloat(foo[1])) * 1000) / 1000,
							content: e.slice(splitIndex + 1).trim(),
							translation: "",
						};
					});
					// 翻译处理
					let tr: { time: number; content: string }[] = [];
					if (res.tlyric.lyric) {
						let temp: string[] = res.tlyric.lyric
							.slice(res.tlyric.lyric.indexOf("[00:"))
							.split("\n");
						temp.pop();
						tr = temp.map((e: string) => {
							let splitIndex = e.indexOf("]");
							let foo = e.slice(1, splitIndex).split(":");
							return {
								time: Math.floor((parseInt(foo[0]) * 60 + parseFloat(foo[1])) * 1000) / 1000,
								content: e.slice(splitIndex + 1).trim(),
							};
						});
						// 填充翻译
						let firstIndex = 0;
						for (let i = 0; i < result.lyrics!.length; i++) {
							if (tr[0].time == result.lyrics![i].time) {
								firstIndex = i;
								break;
							}
						}
						for (let i = firstIndex, j = 0; i < result.lyrics!.length && i < tr.length; i++, j++) {
							result.lyrics![i].translation = tr[j].content;
						}
						// 译者
						if (res.transUser) {
							result.translator = {
								id: res.transUser.userid,
								name: res.transUser.nickname,
							};
						} else {
							res.transUser = undefined;
						}
					}
					// 去除空的歌词
					result.lyrics!.filter((lyric: TYPE.lyricItem) => {
						return lyric.content.length > 0;
					});
				} else {
					result.lyrics = result.translator = null;
				}
				return result;
			},
		},
	});
}

/**
 * @description 新音乐推荐
 */
export function getRecommendNewSongs(limit: number = 30): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/personalized/newsong",
		params: {
			limit,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return res.result.map((e: any): TYPE.song => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl),
						singers: {
							singersNameStr: spliceSingersName(e.song.artists),
							singers: modifySingers(e.song.artists),
						},
						album: {
							id: e.song.album.id,
							name: e.song.album.name,
							cover: cutImg(e.song.album.blurPicUrl),
						},
					};
				});
			},
		},
	});
}

/**
 * @description 每日音乐推荐
 */
export function getRecommendDailySongs(): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/recommend/songs",
		params: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res) => {
				return res.data.dailySongs.map((e: any): TYPE.song => {
					const cover = cutImg(e.al.picUrl);
					return {
						id: e.id,
						name: e.name,
						cover,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover,
						},
					};
				});
			},
		},
	});
}

/**
 * @description 将音乐收藏到-我喜欢的音乐
 * */
export function like(id: number | string, like: boolean = true): Promise<boolean> {
	return NETEASE.get({
		url: "/like",
		params: {
			id,
			like,
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
 * @description 获取我喜欢的音乐ID列表
 * */
export function getLikedSongsID(id: number): Promise<number[]> {
	return NETEASE.get({
		url: "/likelist",
		params: {
			uid: id,
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
 * @description 获取关注歌手的新歌
 * */
export function getSubscribedSingersNewSongs(
	limit: number = 20,
	before: number = 0
): Promise<TYPE.subscribedNewSong[]> {
	return NETEASE.get({
		url: "/artist/new/song",
		params: {
			limit,
			before: before ? before : "",
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.newWorks.map((e: any): TYPE.subscribedNewSong => {
					return {
						resourceId: e.blockTitle.resourceId,
						resourceName: e.blockTitle.resourceName,
						resourceCover: cutImg(e.blockTitle.resourcePicUrl, 200),
						publishTime: e.blockTitle.publishTime,
						publishDate: e.blockTitle.publishDate,
						type: e.blockType === "song" ? "单曲" : e.blockType === "album" ? "专辑" : e.blockType,
						singer: {
							id: e.blockTitle.artistId,
							name: e.blockTitle.artistName,
							cover: cutImg(e.blockTitle.imgUrl, 100),
						},
						songs: e.songLists.map((e: any): TYPE.song => {
							const cover = cutImg(e.al.picUrl, 200);
							return {
								id: e.id,
								name: e.name,
								alias: e.alia,
								cover,
								singers: {
									singersNameStr: spliceSingersName(e.ar),
									singers: modifySingers(e.ar),
								},
								album: {
									id: e.al.id,
									name: e.al.name,
									cover,
								},
							};
						}),
					};
				});
			},
		},
	});
}

/**
 * @description 获取我的歌单(包含收藏和创建)
 */
export function getMyList(
	id?: number,
	name?: string,
	returnListType: "all" | "created" | "subscribed" = "all"
): Promise<TYPE.list[]> {
	const { netease_id, netease_name } = useUserStore();
	return NETEASE.get({
		url: "/user/playlist",
		params: {
			uid: id || netease_id,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res): TYPE.list[] => {
				const list: any[] = res.playlist;
				let result: TYPE.list[];
				if (returnListType === "all") {
					result = list.map((e): TYPE.list => {
						return {
							id: e.id,
							name: e.name,
							cover: cutImg(e.coverImgUrl),
							songCount: e.trackCount,
							playCount: e.playCount,
						};
					});
				} else if (returnListType === "created") {
					result = list.filter((e) => {
						return e.userId === id;
					});
				} else {
					result = list.filter((e) => {
						return e.userId != id;
					});
				}
				if (returnListType != "subscribed") {
					result[0].name = result[0].name.replace(name || netease_name, "我");
				}
				return result;
			},
		},
	});
}

/**
 * @description mv 地址
 * */
export function getMVUrl(id: number, resolution: number = 1080): Promise<string> {
	return NETEASE.get({
		url: "/mv/url",
		params: {
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

/**
 * @description 删除歌单
 */
export function deleteList(id: string | number): Promise<boolean> {
	return NETEASE.get({
		url: `/playlist/delete`,
		params: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code == 200 ? true : false;
			},
		},
	});
}

// TODO: 这里只是发送请求函数，不应把检查功能放在这里，需要找个地方重新添加检查函数
/**
 * @description 新建歌单
 */
export function createList(
	name: string,
	type: "NORMAL" | "SHARED" | "VIDEO",
	isPrivate: boolean
): Promise<{ success: boolean; message: string }> {
	return NETEASE.get({
		url: `/playlist/create`,
		params: {
			cookie: true,
			timeStamp: true,
			name,
			type,
			privacy: isPrivate ? 10 : "",
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.code == 200
					? { success: true, message: "歌单创建成功" }
					: { success: false, message: "歌单创建失败" };
			},
		},
	});
}

/**
 * @description 获取每日推荐歌单
 */
export function getRecommendDailyList(): Promise<TYPE.list[]> {
	return NETEASE.get({
		url: "/recommend/resource",
		params: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.recommend.map((e: any): TYPE.list => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl),
						songCount: e.trackCount,
						playCount: e.playcount,
					};
				});
			},
		},
	});
}

/**
 * @description 获取推荐歌单
 */
export function getRecommendList(): Promise<TYPE.list[]> {
	return NETEASE.get({
		url: "/personalized",
		interceptors: {
			responseInterceptor: (res: any) => {
				return res.result.map((e: any): TYPE.list => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl, 200),
						songCount: e.trackCount,
						playCount: e.playCount,
					};
				});
			},
		},
	});
}

/**
 * @description 获取所有榜单
 */
export function getTopList(): Promise<TYPE.list[]> {
	return NETEASE.get({
		url: "/toplist",
		interceptors: {
			responseInterceptor: (res) => {
				return res.list.map((e: any): TYPE.list => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.coverImgUrl),
						songCount: e.trackCount,
						playCount: e.playCount,
					};
				});
			},
		},
	});
}

/**
 * @description 获取歌单详情
 * */
export function getDetailedList(id: number | string): Promise<TYPE.listDetail> {
	return NETEASE.get({
		url: `/playlist/detail`,
		params: {
			id,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any): TYPE.listDetail {
				return {
					id: res.playlist.id,
					name: res.playlist.name,
					cover: cutImg(res.playlist.coverImgUrl, 300),
					updateTime: transformTimeStamp(res.playlist.updateTime),
					description: res.playlist.description,
					tags: res.playlist.tags,
					isSubscribed: res.playlist.subscribed,
					user: {
						id: res.playlist.creator.userId,
						name: res.playlist.creator.nickname,
						cover: cutImg(res.playlist.creator.avatarUrl),
					},
					count: {
						song: res.playlist.trackCount,
						play: res.playlist.playCount,
						share: res.playlist.shareCount,
						comment: res.playlist.commentCount,
						subscribed: res.playlist.subscribedCount,
					},
				};
			},
		},
	});
}

/**
 * @description 获取歌单部分歌曲
 * */
export function getListPartSong(
	id: number | string,
	limit: number = 10,
	offset: number = 0
): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/playlist/track/all",
		params: {
			id,
			limit,
			offset,
			timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.songs.map((e: any): TYPE.song => {
					const cover = cutImg(e.al.picUrl);
					return {
						id: e.id,
						name: e.name,
						alias: e.alia,
						cover,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover,
						},
					};
				});
			},
		},
	});
}

/**
 * @description 获取歌单所有歌曲
 * */
export function getListAllSong(id: number): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/playlist/track/all",
		params: {
			id,
			timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.songs.map((e: any) => {
					const cover = cutImg(e.al.picUrl);
					return {
						id: e.id,
						name: e.name,
						alias: e.alia,
						cover,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover,
						},
					};
				});
			},
		},
	});
}

// TODO: 补完剩下代码
/**
 * @description 获取歌单评论
 * */
export function getListComment(id: string | number, limit: number = 30, offset: number = 0) {
	return NETEASE.get({
		url: "/comment/playlist",
		params: {
			id,
			limit,
			offset,
		},
	});
}

/**
 * @description 更新歌单歌曲
 * */
export function updateList(
	operate: "add" | "del",
	listId: number,
	songsId: number[]
): Promise<boolean> {
	return NETEASE.get({
		url: "/playlist/tracks",
		params: {
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
 * @description 获取二维码图片的key
 */
export function getQRKey(): Promise<string> {
	return NETEASE.get({
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
export function getQRBase64(key: string): Promise<string> {
	return NETEASE.get({
		url: "/login/qr/create",
		params: {
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
export function checkQRStatus(key: string): Promise<{
	statusCode: 800 | 801 | 802 | 803;
	cookie: string;
}> {
	return NETEASE.get({
		url: "/login/qr/check",
		params: {
			key: key,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor: (res: any) => {
				return {
					statusCode: res.code,
					cookie: res.cookie,
				};
			},
		},
	});
}

/**
 * @description 获取账号ID和名字
 */
export function getMyIdAndName(): Promise<{ id: number; name: string }> {
	return NETEASE.get({
		url: "/user/account",
		params: {
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
 * @description 搜索
 * */
export function search(
	keywords: string,
	type: TYPE.searchCategory,
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.searchResult> {
	const searchResultType: { [key in TYPE.searchCategory]: number } = {
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
	return NETEASE.get({
		url: "/cloudsearch",
		params: {
			keywords,
			type: searchResultType[type],
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res: any) {
				let countKey: string = "";
				let resultKey: string = "";
				let callBack;
				switch (type) {
					case "单曲":
						countKey = "songCount";
						resultKey = "songs";
						callBack = function (e: any): TYPE.song {
							const cover = cutImg(e.al.picUrl);
							return {
								id: e.id,
								name: e.name,
								alias: e.alia,
								cover,
								singers: {
									singersNameStr: spliceSingersName(e.ar),
									singers: modifySingers(e.ar),
								},
								album: {
									id: e.al.id,
									name: e.al.name,
									cover,
								},
							};
						};
						break;
					case "专辑":
						countKey = "albumCount";
						resultKey = "albums";
						callBack = function (e: any): TYPE.album {
							return {
								id: e.id,
								name: e.name,
								cover: cutImg(e.picUrl, 200),
								songCount: e.size,
								singers: {
									singersNameStr: spliceSingersName(e.artists),
									singers: modifySingers(e.artists),
								},
							};
						};

						break;
					case "歌手":
						countKey = "artistCount";
						resultKey = "artists";
						callBack = function (e: any): TYPE.singer {
							return {
								id: e.id,
								name: e.name,
								cover: cutImg(e.picUrl, 200),
								alias: e.alias,
							};
						};
						break;
					case "MV":
						break;
					case "声音":
						break;
					case "歌单":
						countKey = "playlistCount";
						resultKey = "playlists";
						callBack = function (e: any): TYPE.list {
							return {
								id: e.id,
								name: e.name,
								cover: cutImg(e.coverImgUrl, 200),
								songCount: e.trackCount,
								playCount: e.playCount,
							};
						};
						break;
					case "歌词":
						break;
					case "用户":
						break;
					case "电台":
						break;
					case "综合":
						break;
					case "视频":
						break;
					default:
						break;
				}
				return {
					count: res.result[countKey],
					result: res.result[resultKey].map(callBack),
				};
			},
		},
	});
}

// TODO: 想搜索的结果有图片
/**
 * @description 获取搜索建议
 */
export function getSearchSuggestions(keywords: string): Promise<TYPE.suggestions> {
	return NETEASE.get({
		url: "/search/suggest",
		params: {
			keywords,
		},
		interceptors: {
			responseInterceptor(res: any): TYPE.suggestions {
				let r: TYPE.suggestions = {};
				r.albums = res.result.albums?.map((e: any) => {
					return {
						id: e.id,
						name: e.name,
						singerNameStr: e.artist.name,
					};
				});
				r.singers = res.result.artists?.map((e: any) => {
					return {
						id: e.id,
						name: e.name,
					};
				});
				r.list = res.result.playlists?.map((e: any) => {
					return {
						id: e.id,
						name: e.name,
					};
				});
				r.songs = res.result.songs?.map((e: any) => {
					return {
						id: e.id,
						name: e.name,
						singerNameStr: spliceSingersName(e.artists),
					};
				});
				return r;
			},
		},
	});
}

/**
 * @description 获取已收藏的专辑列表
 */
export function getSubscribedAlbum(
	limit: number = 10,
	offset: number = 0
): Promise<{ albumCount: number; albums: TYPE.album[] }> {
	return NETEASE.get({
		url: "/album/sublist",
		params: {
			cookie: true,
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res) {
				return {
					albumCount: res.count,
					albums: res.data.map((e: any): TYPE.album => {
						return {
							id: e.id,
							name: e.name,
							cover: cutImg(e.picUrl, 200),
							songCount: e.size,
							singers: {
								singersNameStr: spliceSingersName(e.artists),
								singers: modifySingers(e.artists),
							},
						};
					}),
				};
			},
		},
	});
}

/**
 * @description 获取专辑详情
 * */
export async function getDetailedAlbum(id: number | string): Promise<TYPE.albumDetail> {
	const data = await NETEASE.get({
		url: "/album/detail/dynamic",
		params: {
			id,
			cookie: true,
			timeStamp: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return {
					subscribedTime: transformTimeStamp(res.subTime),
					shareCount: res.shareCount,
					commentCount: res.commentCount,
					subscribedCount: res.subCount,
					isSubscribed: res.isSub,
				};
			},
		},
	});

	return NETEASE.get<TYPE.albumDetail>({
		url: "/album",
		params: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any): TYPE.albumDetail {
				return {
					id: res.album.id,
					name: res.album.name,
					cover: cutImg(res.album.picUrl),
					singers: {
						singersNameStr: spliceSingersName(res.album.artists),
						singers: modifySingers(res.album.artists),
					},
					songs: res.songs.map((e: any): TYPE.song => {
						const cover = cutImg(e.al.picUrl);
						return {
							id: e.id,
							name: e.name,
							alias: e.alia,
							cover,
							singers: {
								singersNameStr: spliceSingersName(e.ar),
								singers: modifySingers(e.ar),
							},
							album: {
								id: e.al.id,
								name: e.al.name,
								cover,
							},
						};
					}),
					publishTime: transformTimeStamp(res.album.publishTime),
					description: res.album.description,
					type: res.album.subType,
					isSubscribed: false,
					subscribedTime: data.subscribedTime,
					count: {
						song: 0,
						share: data.shareCount,
						comment: data.commentCount,
						subscribed: data.subscribedCount,
					},
				};
			},
		},
	});
}

/**
 * @description 收藏/取消收藏专辑
 * */
export function subscribeAlbum(id: number | string, isSubscribe: boolean): Promise<boolean> {
	return NETEASE.get({
		url: "/album/sub",
		params: {
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
 * @description 新版评论接口
 * */
export function getComment(
	id: string | number,
	sortType: "推荐" | "热度" | "时间",
	type: TYPE.resources,
	pageNo: number = 1,
	pageSize: number = 30,
	cursor?: number
): Promise<TYPE.comment[]> {
	return NETEASE.get({
		url: "/comment/new",
		params: {
			id,
			type: ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"].indexOf(type),
			sortType: ["", "推荐", "热度", "时间"].indexOf(sortType),
			pageNo,
			pageSize,
			cursor,
			// timeStamp: true,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.comments.map((e: any): TYPE.comment => {
					return {
						id: e.commentId,
						content: e.content,
						timeStamp: e.time,
						time: e.timeStr,
						isLiked: e.liked,
						count: {
							like: e.likedCount,
							replay: e.replyCount,
						},
						user: {
							id: e.user.userId,
							name: e.user.nickname,
							cover: cutImg(e.user.avatarUrl),
							ip: {
								ip: e.ipLocation.ip,
								location: e.ipLocation.location,
							},
						},
					};
				});
			},
		},
	});
}

/**
 * @description 给评论点赞
 * */
export function likeComment(
	resourcesId: number | string,
	commentId: number | string,
	isLiked: 1 | 0, //1点赞 0取消点赞
	type: TYPE.resources
): Promise<boolean> {
	return NETEASE.get({
		url: "/comment/like",
		params: {
			id: resourcesId,
			cid: commentId,
			t: isLiked,
			type: ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"].indexOf(type),
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
export function getFloorComments(
	parentCommentId: number | string,
	resourcesId: number | string,
	type: TYPE.resources,
	limit: number = 20,
	time: number | string = ""
): Promise<TYPE.comment[]> {
	return NETEASE.get({
		url: "/comment/floor",
		params: {
			parentCommentId,
			id: resourcesId,
			type: ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"].indexOf(type),
			limit,
			time,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.comments.map((e: any) => {
					return res.data.comments.map((e: any): TYPE.comment => {
						return {
							id: e.commentId,
							content: e.content,
							timeStamp: e.time,
							time: e.timeStr,
							isLiked: e.liked,
							count: {
								like: e.likedCount,
								replay: e.replyCount,
							},
							user: {
								id: e.user.userId,
								name: e.user.nickname,
								cover: cutImg(e.user.avatarUrl),
								ip: {
									ip: e.ipLocation.ip,
									location: e.ipLocation.location,
								},
							},
						};
					});
				});
			},
		},
	});
}

/**
 * @description 获取歌手详情
 * */
export async function getDetailedSinger(id: number): Promise<TYPE.singerDetail> {
	return {
		info: await NETEASE.get({
			url: "/artist/detail",
			params: {
				id,
				cookie: true,
			},
			interceptors: {
				async responseInterceptor(res: any): Promise<TYPE.singerInfo> {
					return {
						name: res.data.artist.name,
						alias: res.data.artist.alias,
						cover: cutImg(res.data.artist.cover, 200),
						signature: res.data.user?.signature || "",
						count: {
							song: res.data.artist.musicSize,
							album: res.data.artist.albumSize,
							mv: res.data.artist.mvSize,
							fans: await getSingerFansCount(id),
						},
					};
				},
			},
		}),
		introduction: await getSingerIntroduction(id),
	};
}

/**
 * @description 获取歌手粉丝数量
 * */
export function getSingerFansCount(id: number): Promise<number> {
	return NETEASE.get({
		url: "/artist/follow/count",
		params: {
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
 * @description 获取歌手简介
 * */
export async function getSingerIntroduction(id: number): Promise<TYPE.singerIntroduction> {
	return await NETEASE.get({
		url: "/artist/desc",
		params: {
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
 * @description 获取歌手热门 50 首歌曲
 * */
export function getSingerHotSongs(id: number): Promise<TYPE.song[]> {
	return NETEASE.get({
		url: "/artist/top/song",
		params: {
			id,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.songs.map((e: any): TYPE.song => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.al.picUrl),
						alias: e.alia,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover: cutImg(e.al.picUrl),
						},
					};
				});
			},
		},
	});
}

/**
 * @description 获取相似歌手
 * */
export function getSimilarSingers(id: number): Promise<TYPE.singer[]> {
	return NETEASE.get({
		url: "/simi/artist",
		params: {
			id,
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res) {
				return res.artists.map((e: any): TYPE.singer => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl, 80),
					};
				});
			},
		},
	});
}

/**
 * @description 获取收藏的歌手
 * */
export function getSubscribedSingers(): Promise<TYPE.singer[]> {
	return NETEASE.get({
		url: "/artist/sublist",
		params: {
			cookie: true,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return res.data.map((e: any): TYPE.singer => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl),
						alias: e.alias,
					};
				});
			},
		},
	});
}

/**
 * @description 收藏/取消收藏歌手
 * */
export function subscribeSinger(id: number, operate: boolean): Promise<boolean> {
	return NETEASE.get({
		url: "/artist/sub",
		params: {
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
 * @description 获取歌手榜单
 * */
export function getTopSingers(
	type: "华语" | "欧美" | "韩国" | "日本" = "华语"
): Promise<TYPE.singer[]> {
	return NETEASE.get({
		url: "/toplist/artist",
		params: {
			type: ["", "华语", "欧美", "韩国", "日本"].indexOf(type),
		},
		interceptors: {
			responseInterceptor(res) {
				return res.list.artists.map((e: any): TYPE.singer => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.picUrl),
						alias: e.alias,
					};
				});
			},
		},
	});
}

/**
 * @description 获取热门歌手
 * */
export function getHotSingers(
	offset: number = 0,
	limit: number = 30
): Promise<{ more: boolean; artists: TYPE.singer[] }> {
	return NETEASE.get({
		url: "/top/artists",
		params: {
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res: any) {
				return {
					more: res.more,
					artists: res.artists.map((e: any): TYPE.singer => {
						return {
							id: e.id,
							name: e.name,
							cover: cutImg(e.picUrl),
							alias: e.alias,
						};
					}),
				};
			},
		},
	});
}

/**
 * @description 歌手分类列表
 * */
export function getFilteredSingers(
	type: number,
	area: number,
	initial: string,
	offset: number = 0,
	limit: number = 30
): Promise<{ more: boolean; artists: TYPE.singer[] }> {
	return NETEASE.get({
		url: "/artist/list",
		params: {
			type,
			area,
			initial,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return {
					more: res.more,
					artists: res.artists.map((e: any): TYPE.singer => {
						return {
							id: e.id,
							name: e.name,
							cover: cutImg(e.picUrl),
							alias: e.alias,
						};
					}),
				};
			},
		},
	});
}

/**
 * @description 获取歌手全部歌曲
 * */
export async function getSingerAllSongs(
	id: number,
	order: "hot" | "time" = "hot",
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.song[]> {
	return await NETEASE.get({
		url: "/artist/songs",
		params: {
			id,
			order,
			limit,
			offset,
		},
		interceptors: {
			responseInterceptor(res) {
				return res.songs.map((e: any): TYPE.song => {
					const cover = cutImg(e.al.picUrl);
					return {
						id: e.id,
						name: e.name,
						url: "",
						cover,
						alias: e.alia,
						singers: {
							singersNameStr: spliceSingersName(e.ar),
							singers: modifySingers(e.ar),
						},
						album: {
							id: e.al.id,
							name: e.al.name,
							cover,
						},
					};
				});
			},
		},
	});
}

/**
 * @description 获取歌手专辑
 * */
export async function getSingerAlbums(
	id: number,
	offset: number = 0,
	limit: number = 30
): Promise<TYPE.album[]> {
	return NETEASE.get({
		url: "/artist/album",
		params: {
			id,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return res.hotAlbums.map((e: any): TYPE.album => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.blurPicUrl, 200),
						songCount: e.size,
						singers: {
							singersNameStr: spliceSingersName(e.artists),
							singers: modifySingers(e.artists),
						},
					};
				});
			},
		},
	});
}

/**
 * @description 获取歌手MV
 * */
export async function getSingerMV(
	id: number,
	offset: number = 0,
	limit: number = 20
): Promise<TYPE.mv[]> {
	return await NETEASE.get({
		url: "/artist/mv",
		params: {
			id,
			offset,
			limit,
		},
		interceptors: {
			responseInterceptor(res) {
				return res.mvs.map((e: any): TYPE.mv => {
					return {
						id: e.id,
						name: e.name,
						cover: cutImg(e.imgurl16v9, 264, 148),
						singer: {
							id: e.artist.id,
							name: e.artist.name,
						},
						playCount: e.playCount,
						duration: e.duration,
						publishTime: e.publishTime,
					};
				});
			},
		},
	});
}
