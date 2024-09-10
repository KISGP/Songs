import _ from "lodash";
import GPRequest from "./axios";
import storage from "utils/storage";
import { message } from "utils/notice";
import { useUserStore } from "store/index";

// 网易云
export const NETEASE = new GPRequest({
	baseURL: "https://netease-cloud-music-api-hkr3.vercel.app/",
	interceptors: {
		requestInterceptor(config) {
			if (config.params) {
				// 取消请求
				const controller = new AbortController();
				config.signal = controller.signal;

				// 添加cookie
				const { cookie } = config.params;
				if (typeof cookie === "boolean") {
					if (cookie) {
						const result = useUserStore().netease_cookie || storage.getItem("cookie") || "";
						if (result) {
							config.params.cookie = result;
						} else {
							controller.abort();
							console.error(`请求错误:${config.url},未获取到用户cookie`);
						}
					} else {
						_.omit(config.params, ["cookie"]);
					}
				}
				// 添加时间戳
				if (config.params.timeStamp) {
					config.params.timeStamp = new Date().getTime();
				}
				// 检查uid
				if (config.params.hasOwnProperty("uid") && !config.params.uid) {
					controller.abort();
					message({
						message: "未获取到用户id",
						type: "warning",
						duration: 1000,
					});
				}
			}

			return config;
		},
		responseInterceptor(res) {
			return res.data;
		},
	},
});

// 测试
export const TEST = new GPRequest({
	baseURL: "https://httpbin.org",
	interceptors: {
		requestInterceptor(config) {
			return config;
		},
	},
});
