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
			// 添加 cookie 和 时间戳
			{
				if (config.myParams) {
					if (typeof config.myParams.cookie === "boolean") {
						try {
							config.myParams.cookie = useUserStore().netease_cookie || getItem("cookie");
						} catch (error) {
							config.signal = controller.signal;
							console.log(error, "cookie获取错误");
							controller.abort();
						}
					}
					if (typeof config.myParams.timeStamp == "boolean") {
						config.myParams.timeStamp = getTimeStamp();
					}
					config.params = config.myParams;
				}
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
