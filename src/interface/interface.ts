/**
 * @description 基础类型
 */
interface baseType {
	id: string | number;
	name: string;
}

/**
 * @description 单个歌手
 */
export interface artistType extends baseType {}

/**
 * @description 多个歌手
 */
export interface artistsType {
	artistsStr: string;
	artists: Array<artistType>;
}

/**
 * @description 专辑
 */
export interface albumBriefType extends baseType {
	cover: string;
}

/**
 * @description 单曲简略信息(仅包含歌曲id……)
 */
interface songBriefType extends baseType {
	cover: string;
	artistsStr: string;
	url?: string;
}

/**
 * @description 单曲详细信息(包含歌曲id、歌手、专辑……)
 */
export interface songDetailedType {
	song: songBriefType;
	artists: artistsType;
	album: albumBriefType;
}

/**
 * @description user
 */
export interface UserState {
	netease_name: string;
	netease_id: string | number;
	netease_cookie: string;
	netease_login: boolean;
}

/**
 * @description song
 */
export interface SongsState {
	song: songDetailedType;
	isPlaying: boolean;
	playList: Array<songDetailedType>;
	historyList: Array<songDetailedType>;
	playerStatus: "hidden" | "max" | "min";
}

/**
 * @description 歌单
 * */
export interface listType extends baseType {
	cover: string;
	songCount: number;
	playCount: number | string;
	subscribed?: boolean;
}

/**
 * @description 搜索建议
 * */
export interface suggestionsType {
	artists?: Array<baseType>;
	albums?: Array<suggestionItem>;
	songs?: Array<suggestionItem>;
	list?: Array<baseType>;
}
type suggestionItem = {
	id: string;
	name: string;
	artistStr: string;
};
