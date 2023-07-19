import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { Interceptors, CreateAxiosConfig, RequestConfig } from "./type";

export default class GPRequest {
	// 当前实例
	private instance: AxiosInstance;
	// 拦截器
	private interceptors?: Interceptors;

	constructor(config: CreateAxiosConfig) {
		this.instance = axios.create(config);
		this.interceptors = config.interceptors;

		// 创建具体实例拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		);
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		);
	}

	request<T = AxiosResponse>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 请求拦截
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config);
			}
			// 发送请求
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 返回结果拦截
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

	get<T = AxiosResponse>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "GET" });
	}

	post<T = AxiosResponse>(config: RequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "POST" });
	}

	patch<T = AxiosResponse>(config: RequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "PATCH" });
	}

	delete<T = AxiosResponse>(config: RequestConfig<T>): Promise<T> {
		return this.request({ ...config, method: "DELETE" });
	}
}
