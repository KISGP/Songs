import storage from "utils/storage";
import { defineStore } from "pinia";
import { setCssVar, wait, setCssVarS } from "utils/utils-common";
import { ElScrollbar } from "element-plus";
import { themeType } from "@/interface/interface";

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
};

export const useDataStore = defineStore("DataStore", {
	state: (): stateType => {
		return {
			theme: "light", // 默认主题
			eScrollbar: null,
			searchVisible: true,
			menuVisible: true,
			audioDisplayStatus: "hidden",
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
	},
});
