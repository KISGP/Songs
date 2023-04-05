import { defineStore } from "pinia";
import { getItem } from "utils/storage";
import { setCssVar, wait } from "utils/utils-common";
import { SongsState, songDetailedType, listBriefType } from "@/interface/interface";
import { getSongUrl, getLikedSongsID } from "@/service/api/api";

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
			myCreatedListID: [],
		};
	},
	getters: {},
	actions: {
		async update_song(value: songDetailedType): Promise<void> {
			if (!value.song.url) value.song.url = await getSongUrl(value.song.id);
			value.song.isLiked = this.check_song_isLiked(value.song.id);
			this.song = value;
			this.isPlaying = true;
		},
		update_isPlaying(value: boolean) {
			this.isPlaying = value;
		},
		isExited_playList(song: songDetailedType): boolean {
			return this.playList.indexOf(song) > -1 ? true : false;
		},
		update_playList(fn: (playList: Array<songDetailedType>) => void) {
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
		async update_playerStatus(value: "hidden" | "max" | "min") {
			this.playerStatus = value;
			switch (value) {
				case "hidden":
					setCssVar("--height-content", "94vh");
					setCssVar("--height-player", "0vh");
					break;
				case "min":
					setCssVar("--height-player", "8vh");
					await wait(600);
					setCssVar("--height-content", "86vh");
					break;
				case "max":
					setCssVar("--height-player", "100vh");
					break;
			}
		},
		update_likedSongsID(fn: (likedSongsID: Array<number>) => void) {
			fn(this.likedSongsID!);
		},
		async reload_likedSongsID() {
			const id = getItem("id");
			if (id) {
				this.likedSongsID = await getLikedSongsID(parseInt(id));
				this.song.song.isLiked = this.check_song_isLiked(this.song.song.id);
			}
		},
		check_song_isLiked(songId: number): boolean {
			return this.likedSongsID!.indexOf(songId) > -1 ? true : false;
		},
		push_myCreatedListID(id: number) {
			this.myCreatedListID.push(id);
		},
		push_myCreatedList(createdList: listBriefType) {
			this.myCreatedList.push(createdList);
		},
	},
});
