import * as API from "./api";

/** @description 与 歌曲 有关的API对象 */
export const SONG = {
	/** @description 获取音乐播放链接 */
	getUrl: API.getSongUrl,

	/** @description 获取音乐详情 */
	getDetail: API.getSongsDetail,

	/** @description 获取音乐歌词 */
	getLyrics: API.getLyrics,

	/** @description 新音乐 */
	recommendNew: API.getRecommendNewSongs,

	/** @description 日推音乐 */
	recommendDaily: API.getRecommendDailySongs,

	/** @description 将音乐收藏到-我喜欢的音乐 */
	like: API.like,

	/** @description 获取我喜欢的音乐ID列表 */
	getLikedSongsID: API.getLikedSongsID,

	/** @description 获取关注歌手的新歌 */
	getSubscribedSingerNewSongs: API.getSubscribedSingersNewSongs,
};

/** @description 与 歌单 有关的API对象 */
export const LIST = {
	/** @description 获取我创建的、收藏的歌单 */
	getMine: API.getMyList,

	/** @description 获取歌单详情 */
	getDetail: API.getDetailedList,

	/** @description 获取歌单部分歌曲 */
	getPartSongs: API.getListPartSong,

	/** @description 获取歌单所有歌曲 */
	getAllSongs: API.getListAllSong,

	/** @description 删除歌单 */
	delete: API.deleteList,

	/** @description 新建歌单 */
	create: API.createList,

	/** @description 获取推荐歌单 */
	recommend: API.getRecommendList,

	/** @description 获取每日推荐歌单 */
	recommendDaily: API.getRecommendDailyList,

	/** @description 获取所有榜单 */
	getTop: API.getTopList,

	/** @description 获取歌单评论 */
	getComment: API.getListComment,

	/** @description 更新歌单歌曲 */
	update: API.updateList,
};

/** @description 与 登录 有关的API对象 */
export const LOGIN = {
	/** @description 获取二维码图片的key */
	getKey: API.getQRKey,

	/** @description 获取二维码图片的base64码 */
	getBase64: API.getQRBase64,

	/** @description 检测二维码状态 */
	checkQRStatus: API.checkQRStatus,
};

/** @description 与 用户 有关的API对象 */
export const USER = {
	/** @description 获取账号ID和名字 */
	getIdAndName: API.getMyIdAndName,
};

/** @description 与 搜索 有关的API对象 */
export const SEARCH = {
	/** @description 获取账号ID和名字 */
	search: API.search,

	/** @description 获取搜索建议 */
	getSuggestion: API.getSearchSuggestions,
};

/** @description 与 歌单 有关的API对象 */
export const ALBUM = {
	/** @description 获取已收藏的专辑列表*/
	getSubscribed: API.getSubscribedAlbum,

	/** @description 获取专辑详情 */
	getDetail: API.getDetailedAlbum,

	/** @description 收藏/取消收藏专辑 */
	subscribe: API.subscribeAlbum,
};

/** @description 与 评论 有关的API对象 */
export const COMMENT = {
	/** @description 新版评论接口 */
	get: API.getComment,

	/** @description  点赞评论 */
	like: API.likeComment,

	/** @description  楼层评论 */
	floor: API.getFloorComments,
};

/** @description 与 歌手 有关的API对象 */
export const SINGER = {
	/** @description 获取歌手详情 */
	getDetail: API.getDetailedSinger,

	/** @description 获取歌手简介 */
	getIntroduction: API.getSingerIntroduction,

	/** @description 获取歌手热门 50 首歌曲 */
	getHotSongs: API.getSingerHotSongs,

	/** @description 获取收藏的歌手 */
	getSubscribedSinger: API.getSubscribedSingers,

	/** @description 获取相似歌手 */
	getSimilar: API.getSimilarSingers,

	/** @description 收藏/取消收藏歌手 */
	subscribe: API.subscribeSinger,

	/** @description 获取歌手榜单 */
	getTop: API.getTopSingers,

	/** @description 获取热门歌手 */
	getHot: API.getHotSingers,

	/** @description 获取歌手粉丝数量 */
	getFansCount: API.getSingerFansCount,

	/** @description 获取歌手全部歌曲 */
	getAllSongs: API.getSingerAllSongs,

	/** @description 歌手分类列表 */
	getFiltered: API.getFilteredSingers,

	/** @description 获取歌手专辑 */
	getAlbums: API.getSingerAlbums,

	/** @description 获取歌手MV */
	getMV: API.getSingerMV,
};

/** @description 与 MV 有关的API对象 */
export const MV = {
	/** @description 获取mv地址 */
	getUrl: API.getMVUrl,
};
