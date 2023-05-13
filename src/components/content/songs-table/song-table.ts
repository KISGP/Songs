import { useDataStore, useSongStore } from "store/index";
import { getListAllSong, updateList } from "service/api/api";
import { songDetailedType, resources } from "@/interface/interface";
import { message } from "utils/notice";
const DataStore = useDataStore();
const SongStore = useSongStore();

/**
 * @param {songDetailedType} song 要添加的歌曲
 * @param {boolean} alert 是否显示反馈信息
 * @description 添加到播放列表
 * */
export function add2List(song: songDetailedType, alert?: boolean) {
	const r = DataStore.push_playList(song);
	if (alert) {
		message({
			message: r
				? `[ ${song.song.name} ]成功添加到播放列表`
				: `播放列表中已存在[ ${song.song.name} ]`,
			type: r ? "success" : "warning",
		});
	}
}

// FIXME: 有时候歌单未全部加载出来时只能播放部分歌曲
/**
 * @description 播放所有歌曲（添加到播放列表）
 * */
export async function playAll(
	songs: songDetailedType[],
	id?: number,
	type?: resources | undefined
) {
	if (id && type === "歌单") {
		playSelect(await getListAllSong(id));
	} else {
		playSelect(songs);
	}
}

// FIXME: 未查重
// 播放选中歌曲（添加到播放列表）
export function playSelect(songs: songDetailedType[]) {
	DataStore.update_playList((playList) => {
		songs.forEach((song) => {
			playList.push(song);
		});
	});
	SongStore.update_song(songs[0]);
	message({
		message: "已添加到播放列表",
	});
}

// 播放歌曲
export function playSong(row: songDetailedType) {
	SongStore.update_song(row);
	add2List(row, false);
}

// 删除选中歌曲（移除播放列表）
export async function delSelect(
	songs: songDetailedType[],
	id?: number,
	type?: resources | undefined
) {
	console.log(id, type);
	if (id && type === "歌单") {
		let songsId: Array<number> = [];
		songs.forEach((item: songDetailedType) => {
			songsId.push(item.song.id);
		});
		(await updateList("del", id, songsId)) &&
			message({
				message: "成功删除,请刷新页面",
			});
	}
}

// 删除所有歌曲
export async function delAll(id?: number, type?: resources | undefined) {
	if (id && type === "歌单") {
		let songsId: Array<number> = [];
		(await getListAllSong(id)).forEach((item: songDetailedType) => {
			songsId.push(item.song.id);
		});
		(await updateList("del", id, songsId)) &&
			message({
				message: "成功删除,请刷新页面",
			});
	}
}
