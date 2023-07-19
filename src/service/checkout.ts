import _ from "lodash";
import { InternalAxiosRequestConfig } from "axios";
import storage from "utils/storage";
import { message } from "utils/notice";
import { useUserStore } from "store/index";

export default function checkout(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	// 取消请求
	const controller = new AbortController();
	config.signal = controller.signal;

	const { cookie, timeStamp, uid } = config.params;
	// 添加cookie
	if (typeof cookie === "boolean") {
		if (cookie) {
			const result = useUserStore().netease_cookie || storage.getItem("cookie") || "";
			if (result) {
				config.params.cookie = result;
			} else {
				controller.abort();
				message({
					message: "未获取到用户cookie",
					type: "warning",
					duration: 1000,
				});
			}
		} else {
			_.omit(config.params, ["cookie"]);
		}
	}
	// 添加时间戳
	if (timeStamp) {
		config.params.timeStamp = new Date().getTime();
	}
	// 检查uid
	if (!uid) {
		controller.abort();
		message({
			message: "未获取到用户id",
			type: "warning",
			duration: 1000,
		});
	}
	return config;
}
