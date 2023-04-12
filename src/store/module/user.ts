import { defineStore } from "pinia";
import { UserState } from "@/interface/interface";

export const useUserStore = defineStore("UserStore", {
	state: (): UserState => {
		return {
			netease_name: "",
			netease_id: 0,
			netease_cookie: "",
			netease_login: false,
		};
	},
	getters: {},
	actions: {
		/**
		 * @description 更新用户cookie
		 * */
		update_cookie(value: string): void {
			this.netease_cookie = value;
		},
		/**
		 * @description 更新名字
		 * */
		update_name(value: string): void {
			this.netease_name = value;
		},
		/**
		 * @description 更新id
		 * */
		update_id(value: number): void {
			this.netease_id = value;
		},
		/**
		 * @description 更新用户登录状态
		 * */
		update_login(value: boolean): void {
			this.netease_login = value;
		},
	},
});