import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface GPRequestInterceptors<T = AxiosResponse> {
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (res: T) => T;
	responseInterceptorCatch?: (error: any) => any;
}

export interface GPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: GPRequestInterceptors<T>;
	myParams?: { [key: string]: any };
}
