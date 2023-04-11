import { defineStore } from "pinia";
import { setItem } from "utils/storage";
import { themeType } from "@/interface/interface";

export const useDataStore = defineStore("DataStore", {
	state: (): { theme: themeType } => {
		return {
			theme: "light",// 默认主题
		};
	},
	getters: {},
	actions: {
		updateTheme(newTheme: themeType) {
			document.body.dataset.theme! = newTheme;
			setItem("theme", newTheme);
		},
	},
});
