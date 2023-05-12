import storage from "utils/storage";
import { defineStore } from "pinia";
import { setCssVar, wait, setCssVarS } from "utils/utils-common";
import { ElScrollbar } from "element-plus";
import { useSongStore } from "./songs";
import { getLikedSongsID } from "@/service/api/api";
import {
	themeType,
	songDetailedType,
	listBriefType,
} from "@/interface/interface";

type stateType = {
	// 主题
	theme: themeType;
	// 全局滚动条
	eScrollbar: InstanceType<typeof ElScrollbar> | null;
	// 搜索框是否可见
	searchVisible: boolean;
	// 菜单是否可见
	menuVisible: boolean;
	// 播放器显示状态
	audioDisplayStatus: "hidden" | "max" | "min";
	// 当前播放列表
	playList: Array<songDetailedType>;
	// 历史播放（但似乎没有相关功能）
	historyList: Array<songDetailedType>;
	// 我创建的歌单
	myCreatedList: Array<listBriefType>;
	myCreatedListID: Array<number>;
	likedSongsID: Array<number>;
};

export const useDataStore = defineStore("DataStore", {
	state: (): stateType => {
		return {
			theme: "light",
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
		update_theme(newTheme: themeType) {
			document.body.dataset.theme! = newTheme;
			storage.setItem("theme", newTheme);
		},
		/**
		 * @description 更新scrollBar的ref
		 * */
		init_eScrollBar(eScrollbar: InstanceType<typeof ElScrollbar>) {
			this.eScrollbar = eScrollbar;
		},
		update_eScrollBar(){
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
			this.audioDisplayStatus = value;
		},
		/**
		 * @param {function} fn 传入一个操作函数，该函数会自动传入播放列表
		 * @description 更新播放列表
		 */
		update_playList(fn: (playList: Array<songDetailedType>) => void) {
			fn(this.playList);
		},
		/**
		 * @description 判断歌曲是否在当前的播放列表里
		 * */
		isExited_playList(song: songDetailedType): boolean {
			return this.playList.indexOf(song) > -1 ? true : false;
		},
		/**
		 * @description push歌曲到播放列表
		 * */
		push_playList(song: songDetailedType): boolean {
			if (this.isExited_playList(song)) {
				return false;
			} else {
				this.playList.push(song);
				return true;
			}
		},
		/**
		 * @param {function} fn 传入一个函数，该函数会自动传入 Array<喜欢的音乐ID>
		 * @description 更新喜欢的音乐ID列表
		 * */
		update_likedSongsID(fn: (likedSongsID: Array<number>) => void) {
			fn(this.likedSongsID!);
		},
		/**
		 * @description 刷新喜欢的音乐ID列表
		 * */
		async refresh_likedSongsID() {
			const { song } = useSongStore();
			const id = storage.getItem("id");
			if (id && song) {
				this.likedSongsID = await getLikedSongsID(Number(id));
				song.song.isLiked = this.check_song_isLiked(song.song.id);
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
		push_myCreatedList(createdList: listBriefType) {
			this.myCreatedList.push(createdList);
		},
	},
});
