import axios from "axios";
import { GPRequestConfig, GPRequestInterceptors } from "./type";
import type { AxiosInstance } from "axios";
import { getTimeStamp } from "utils/utils-content";
import { getItem } from "utils/storage";
import { useUserStore } from "store/index";
const controller = new AbortController();

export default class GPRequest {
	private instance: AxiosInstance;
	private interceptors?: GPRequestInterceptors;

	constructor(config: GPRequestConfig) {
		this.instance = axios.create(config);
		this.interceptors = config.interceptors;

		// 创建的某个实例拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		);
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		);

		// 全局拦截器
		/* this.instance.interceptors.request.use(
			(config) => {
				return config;
			},
			(error) => {
				return error;
			}
		);
		this.instance.interceptors.response.use(
			(res) => {
				return res;
			},
			(error) => {
				return error;
			}
		); */
	}
	request<T>(config: GPRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 请求拦截
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config);
			}
			// params修改验证
			if (config.myParams) {
				// 添加cookie
				if (typeof config.myParams.cookie === "boolean") {
					if (
						!(config.myParams.cookie = useUserStore().netease_cookie || getItem("cookie") || "")
					) {
						config.signal = controller.signal;
						console.log(config.url, "cookie获取错误");
						controller.abort();
					}
				}
				// 添加时间戳
				if (typeof config.myParams.timeStamp == "boolean") {
					config.myParams.timeStamp = getTimeStamp();
				}
				// 检查uid
				if (config.myParams.uid === "" && config.myParams.uid != undefined) {
					config.signal = controller.signal;
					console.log(config.url, "未登录,用户id为空");
					controller.abort();
				}
				config.params = config.myParams;
			}
			// 发送请求
			this.instance
				.request<any, T>(config)
				.then((res) => {
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res);
					}
					resolve(res);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	get<T>(config: GPRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "GET" });
	}
	post<T>(config: GPRequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "POST" });
	}

	patch<T>(config: GPRequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "PATCH" });
	}

	delete<T>(config: GPRequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "DELETE" });
	}
}
