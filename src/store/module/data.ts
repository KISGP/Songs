import { defineStore } from "pinia";
import { useSongStore } from "./songs";
import { ElScrollbar } from "element-plus";
import storage from "utils/storage";
import { SONG } from "service/api";
import { song, list, theme } from "@/type/type";
import { setCssVar, wait, setCssVarS } from "utils/utils-common";

type stateType = {
	// 主题
	theme?: theme;
	// 全局滚动条
	eScrollbar: InstanceType<typeof ElScrollbar> | null;
	// 搜索框是否可见
	searchVisible: boolean;
	// 菜单是否可见
	menuVisible: boolean;
	// 播放器显示状态
	audioDisplayStatus: "hidden" | "max" | "min";
	// 当前播放列表
	playList: song[];
	// 历史播放（但似乎没有相关API）
	historyList: song[];
	// 我创建的歌单
	myCreatedList: list[];
	myCreatedListID: number[];
	// 我喜欢的音乐ID
	likedSongsID: number[];
};

export const useDataStore = defineStore("DataStore", {
	state: (): stateType => {
		return {
			theme: undefined,
			eScrollbar: null,
			searchVisible: true,
			menuVisible: true,
			audioDisplayStatus: "hidden",
			playList: [],
			historyList: [],
			myCreatedList: [],
			myCreatedListID: [],
			likedSongsID: [],
		};
	},
	getters: {},
	actions: {
		/**
		 * @description 更新主题
		 * */
		update_theme(newTheme: theme) {
			document.querySelector("html")!.className = newTheme;
			storage.setItem("theme", newTheme);
		},
		/**
		 * @description 更新scrollBar的ref
		 * */
		init_eScrollBar(eScrollbar: InstanceType<typeof ElScrollbar>) {
			this.eScrollbar = eScrollbar;
		},
		update_eScrollBar() {
			this.eScrollbar?.update();
		},
		/**
		 * @description 修改头部搜索框的可见性
		 * */
		update_searchVisible() {
			this.searchVisible = !this.searchVisible;
		},
		/**
		 * @description 修改菜单的可见性
		 * */
		update_menuVisible() {
			this.menuVisible = !this.menuVisible;
		},
		/**
		 * @description 更新播放器显示状态（全屏|隐藏|最小）
		 * */
		async update_audioDisplayStatus(value: "hidden" | "max" | "min") {
			this.audioDisplayStatus = value;
			switch (value) {
				case "hidden":
					setCssVarS({
						"--height-content": "94vh",
						"--height-player": "0vh",
					});
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
		/**
		 * @param fn 传入一个操作函数，该函数会自动传入播放列表
		 * @description 更新播放列表
		 */
		update_playList(fn: (playList: song[]) => void) {
			fn(this.playList);
		},
		/**
		 * @description 判断歌曲是否在当前的播放列表里
		 * */
		isExited_playList(song: song): boolean {
			return this.playList.indexOf(song) > -1 ? true : false;
		},
		/**
		 * @description push歌曲到播放列表
		 * */
		push_playList(song: song) {
			this.playList.push(song);
		},
		/**
		 * @param fn 传入一个函数，该函数会自动传入 Array<喜欢的音乐ID>
		 * @description 更新喜欢的音乐ID列表
		 * */
		update_likedSongsID(fn: (likedSongsID: number[]) => void) {
			fn(this.likedSongsID!);
		},
		/**
		 * @description 刷新喜欢的音乐ID列表
		 * */
		async refresh_likedSongsID() {
			const { song } = useSongStore();
			const id = storage.getItem("id");
			if (id && song) {
				this.likedSongsID = await SONG.getLikedSongsID(Number(id));
				song.isLiked = this.check_song_isLiked(song.id);
			}
		},
		/**
		 * @description 通过传入的歌曲ID检查歌曲是否是我喜欢的音乐
		 * */
		check_song_isLiked(songId: number): boolean {
			return this.likedSongsID!.indexOf(songId) > -1 ? true : false;
		},
		/**
		 * @description 我创建的歌单信息（?具体啥用忘了，以后修改）
		 * */
		push_myCreatedListID(id: number) {
			this.myCreatedListID.push(id);
		},
		/**
		 * @description 我创建的歌单信息
		 * */
		push_myCreatedList(createdList: list) {
			this.myCreatedList.push(createdList);
		},
	},
});
