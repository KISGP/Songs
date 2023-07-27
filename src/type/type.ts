export type size = {
	url: string;
	size:
		| number
		| {
				w: number;
				h: number;
		  };
};

export type baseType = {
	id: number;
	name: string;
	cover?: size;
};

// =================================================================================================
/**
 * @description 歌手简略信息
 */
export type singer = baseType & {
	alias?: string[];
};

/**
 * @description 多个歌手简略信息
 */
export type singers = {
	singersNameStr: string;
	singers: singer[];
};

/**
 * @description 歌手详情
 */
export type singerDetail = {
	info: singerInfo;
	introduction: singerIntroduction;
};
/**
 * @description 歌手详情-信息
 */
export type singerInfo = Omit<baseType, "id"> & {
	alias: string[];
	signature?: string;
	count: {
		song: number;
		album: number;
		mv: number;
		fans: number;
	};
};
/**
 * @description 歌手详情-介绍
 */
export type singerIntroduction = {
	briefIntroduction: string;
	item: Array<{
		title: string;
		content: string;
	}>;
};

// =================================================================================================
/**
 * @description 专辑简略信息
 */
export type album = baseType & {
	songCount?: number;
	singers?: singers;
};

/**
 * @description 专辑详情
 */
export type albumDetail = baseType & {
	songs: song[];
	singers: singers;
	type: string;
	publishTime: string;
	description: string;
	isSubscribed: boolean;
	subscribedTime: string;
	count: {
		song: number;
		share: number;
		comment: number;
		subscribed: number;
	};
};

// =================================================================================================
/**
 * @description 歌曲信息
 */
export type song = baseType & {
	url?: string;
	isLiked?: boolean;
	alias?: string[];
	singers?: singers;
	album?: album;
};

/**
 * @description 关注歌手新歌
 */
export type subscribedNewSong = {
	resourceId: number;
	resourceName: string;
	resourceCover?: {
		url: string;
		size: number;
	};
	publishTime: number;
	publishDate: string;
	type: string;
	singer: singer;
	songs: song[];
};
// =================================================================================================
/**
 * @description 歌单简略信息
 * */
export type list = baseType & {
	songCount: number;
	playCount: number;
	isSubscribed?: boolean;
};
/**
 * @description 歌单详情
 * */
export type listDetail = baseType & {
	user: baseType;
	updateTime: string;
	description: string;
	tags: string[];
	isSubscribed?: boolean;
	count: {
		song: number;
		play: number;
		share: number;
		comment: number;
		subscribed: number;
	};
};

// =================================================================================================
/**
 * @description 搜索建议
 * */
export type suggestions = {
	songs?: Array<{
		id: number;
		name: string;
		singerNameStr: string;
	}>;
	albums?: Array<{
		id: number;
		name: string;
		singerNameStr: string;
	}>;
	list?: baseType[];
	singers?: baseType[];
};

/**
 * @description 搜索类型
 * */
export type searchCategory =
	| "单曲"
	| "专辑"
	| "歌手"
	| "歌单"
	| "用户"
	| "MV"
	| "歌词"
	| "电台"
	| "视频"
	| "综合"
	| "声音";

/**
 * @description 搜索结果
 * */
export type searchResult = {
	count: number;
	result: song[] | album[] | singer[] | list[];
};

// =================================================================================================
/**
 * @description 歌词类型
 * */
export type lyricItem = {
	time: number;
	content: string;
	translation?: string;
};
/**
 * @description 当前歌词
 * */
export type currentLyricItem = Omit<lyricItem, "time"> & {
	index: number;
};
/**
 * @description 全部歌词
 * */
export type lyrics = {
	lyrics: lyricItem[] | null;
	translator?: {
		id: number;
		name: string;
	} | null;
};
// =================================================================================================
/**
 * @description 评论类型
 * */
export type comment = {
	id: number;
	content: string;
	time: string;
	timeStamp: number;
	isLiked: boolean;
	count: {
		like: number;
		replay: number;
	};
	user: baseType & {
		ip?: {
			ip: string | null | undefined;
			location: string | null | undefined;
		};
	};
};

// =================================================================================================
/**
 * @description 资源类型
 * */
export type resources = "歌曲" | "mv" | "歌单" | "专辑" | "电台节目" | "视频" | "动态" | "电台";

// =================================================================================================
/**
 * @description mv类型
 * */
export type mv = baseType & {
	singer: singer;
	publishTime: string;
	playCount: number;
	duration: number;
};

// =================================================================================================
/**
 * @description 主题类型
 * */
export type theme = "light" | "light2" | "dark" | "dark2";
