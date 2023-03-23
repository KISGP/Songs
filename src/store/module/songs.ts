import { defineStore } from "pinia";
import { getItem } from "utils/storage";
import { SongsState, songDetailedType, listBriefType } from "@/interface/interface";
import { getSongUrl, getLikedSongsID } from "@/service/api/api";
import { th } from "element-plus/es/locale";

export const useSongStore = defineStore("SongStore", {
	state: (): SongsState => {
		return {
			// 当前歌曲
			song: {
				song: {
					id: 0,
					name: "",
					cover: "",
					url: "",
					artistsStr: "",
					isLiked: false,
				},
				artists: {
					artistsStr: "",
					artists: [],
				},
				album: {
					name: "",
					id: 0,
					cover: "",
				},
			},
			// 喜欢的音乐ID
			likedSongsID: [],
			// 是否正在播放
			isPlaying: false,
			// 当前播放列表
			playList: [],
			// 历史播放（但似乎没有相关功能）
			historyList: [],
			// 播放器状态
			playerStatus: "hidden",
			// 我创建的歌单
			myCreatedList: [],
			myCreatedListID:[]
		};
	},
	getters: {},
	actions: {
		async update_song(value: songDetailedType): Promise<void> {
			if (!value.song.url) value.song.url = await getSongUrl(value.song.id);
			value.song.isLiked = this.check_song_isLiked(value.song.id);
			this.song = value;
		},
		update_isPlaying(value: boolean) {
			this.isPlaying = value;
		},
		isExited_playList(song: songDetailedType): boolean {
			return this.playList.indexOf(song) > -1 ? true : false;
		},
		update_playList(fn: (playList: Array<songDetailedType>) => void): void {
			fn(this.playList);
		},
		push_playList(song: songDetailedType): boolean {
			if (this.isExited_playList(song)) {
				return false;
			} else {
				this.playList.push(song);
				return true;
			}
		},
		update_playerStatus(value: "hidden" | "max" | "min"): void {	
			this.playerStatus = value;
		},
		update_likedSongsID(fn: (likedSongsID: Array<number>) => void): void {
			fn(this.likedSongsID!);
		},
		async reload_likedSongsID() {
			this.likedSongsID = await await getLikedSongsID(getItem("id")!);
			this.song.song.isLiked = this.check_song_isLiked(this.song.song.id);
		},
		check_song_isLiked(songId: number): boolean {
			return this.likedSongsID!.indexOf(songId) > -1 ? true : false;
		},
		push_myCreatedListID(id: number): void {
			this.myCreatedListID.push(id);
		},
		push_myCreatedList(createdList: listBriefType): void {
			this.myCreatedList.push(createdList);
		},
	},
});
