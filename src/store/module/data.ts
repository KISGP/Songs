import { defineStore } from "pinia";
import { Ref } from "vue";
import { setItem } from "utils/storage";
import { ElScrollbar } from "element-plus";
import { themeType } from "@/interface/interface";

type stateType = {
	theme: themeType; // 主题
	eScrollbar: InstanceType<typeof ElScrollbar> | null; // 全局滚动条
	scrollTop: number;
	searchVisible: boolean; // 搜索框是否可见
	menuVisible: boolean; // 菜单是否可见
};

export const useDataStore = defineStore("DataStore", {
	state: (): stateType => {
		return {
			theme: "light", // 默认主题
			eScrollbar: null,
			scrollTop: 0,
			searchVisible: true,
			menuVisible: true,
		};
	},
	getters: {},
	actions: {
		/**
		 * @description 更新主题
		 * */
		updateTheme(newTheme: themeType) {
			document.body.dataset.theme! = newTheme;
			setItem("theme", newTheme);
		},
		/**
		 * @description 更新scrollBar的ref
		 * */
		init_eScrollBar(eScrollbar: Ref<InstanceType<typeof ElScrollbar>>) {
			this.eScrollbar = eScrollbar.value;
		},
		/**
		 * @description 手动更新滚动条状态
		 * */
		update_eScrollBar() {
			this.eScrollbar?.update();
		},
		/**
		 * @description 更新scrollBar的scrollTop
		 * */
		update_scrollTop() {
			this.scrollTop = this.eScrollbar!.wrapRef!.scrollTop;
		},
		/**
		 * @description table刷新后固定位置
		 * */
		update_position() {
			this.eScrollbar?.scrollTo({
				top: this.scrollTop,
				behavior: "instant",
			});
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
	},
});
