import { defineStore } from "pinia";
import { getItem } from "utils/storage";
import { SongsState, songDetailedType } from "@/interface/interface";
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
			likedSongsID: [],
			isPlaying: false,
			// 当前播放列表
			playList: [],
			historyList: [],
			// 播放器状态
			playerStatus: "hidden",
		};
	},
	getters: {},
	actions: {
		async update_song(value: songDetailedType): Promise<void> {
			if (!value.song.url) value.song.url = await getSongUrl(value.song.id);
			if (this.likedSongsID!.indexOf(value.song.id) > -1) {
				value.song.isLiked = true;
			}
			this.song = value;
		},
		update_isPlaying(value: boolean) {
			this.isPlaying = value;
		},
		update_playList(fn: (playList: Array<songDetailedType>) => void): void {
			fn(this.playList);
		},
		update_playerStatus(value: "hidden" | "max" | "min"): void {
			this.playerStatus = value;
		},
		update_likedSongsID(fn: (likedSongsID: Array<number>) => void): void {
			fn(this.likedSongsID!);
		},
		async reload_likedSongsID() {
			this.likedSongsID = await await getLikedSongsID(getItem("id")!);
		},
	},
});
