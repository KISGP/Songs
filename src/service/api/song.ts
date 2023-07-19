import { NETEASE } from "../instance";
import * as TYPE from "@/interface/interface";
import * as HANDLE from "./handle";
import { useUserStore } from "store/index";

export const song = {
	/**
	 * @param id - 歌曲id
	 * @description 获取歌曲的播放url
	 */
	getUrl: function (id: string | number): Promise<string> {
		return NETEASE.get({
			url: `/song/url`,
			params: {
				cookie: false,
			},
			interceptors: {
				responseInterceptor: (res: any) => {
					return res.data[0].url;
				},
			},
		});
	},
};
