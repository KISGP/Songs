import { defineStore } from "pinia";
import { SongsState, songDetailedType } from "@/interface/interface";
import { getSongUrl } from "@/service/api/api";

export const useSongStore = defineStore("SongStore", {
	state: (): SongsState => {
		return {
			// 当前歌曲
			song: {
				song: {
					id: "",
					name: "",
					cover: "",
					url: "",
					artistsStr: "",
				},
				artists: {
					artistsStr: "",
					artists: [],
				},
				album: {
					name: "",
					id: "",
					cover: "",
				},
			},
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
	},
});
