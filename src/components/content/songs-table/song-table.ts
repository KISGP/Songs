import { useDataStore, useSongStore } from "store/index";
import { getListAllSong, updateList } from "service/api/api";
import { songDetailedType, resources } from "@/interface/interface";
import { showSuccessMessage } from "utils/utils-content";
const DataStore = useDataStore();
const SongStore = useSongStore();

// 添加到播放列表
export function add2List(songData: songDetailedType, feedback?: boolean) {
	DataStore.push_playList(songData) &&
		feedback &&
		showSuccessMessage(`[ ${songData.song.name} ]已添加到播放列表`);
}

// 播放所有歌曲（添加到播放列表）
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

// 播放选中歌曲（添加到播放列表）
export function playSelect(songs: songDetailedType[]) {
	DataStore.update_playList((playList) => {
		songs.forEach((song) => {
			playList.push(song);
		});
	});
	SongStore.update_song(songs[0]);
	showSuccessMessage(`已添加到播放列表`);
}

// 播放歌曲
export function playSong(row: songDetailedType) {
	SongStore.update_song(row);
	add2List(row, false);
}

// 删除选中歌曲（添加到播放列表）
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
		(await updateList("del", id, songsId)) && showSuccessMessage(`成功删除,请刷新页面`);
	}
}

// 删除所有歌曲（添加到播放列表）
export async function delAll(id?: number, type?: resources | undefined) {
	if (id && type === "歌单") {
		let songsId: Array<number> = [];
		(await getListAllSong(id)).forEach((item: songDetailedType) => {
			songsId.push(item.song.id);
		});
		(await updateList("del", id, songsId)) && showSuccessMessage(`成功删除,请刷新页面`);
	}
}
