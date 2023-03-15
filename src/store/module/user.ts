import { defineStore } from "pinia";
import { UserState } from "@/interface/interface";

export const useUserStore = defineStore("UserStore", {
	state: (): UserState => {
		return {
			netease_name: "",
			netease_id: "",
			netease_cookie: "",
			netease_login: false,
		};
	},
	getters: {},
	actions: {
		update_cookie(value: string): void {
			this.netease_cookie = value;
		},
		update_name(value: string): void {
			this.netease_name = value;
		},
		update_id(value: string | number): void {
			this.netease_id = value;
		},
		update_login(value: boolean): void {
			this.netease_login = value;
		},
	},
});