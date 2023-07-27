import type {
	AxiosResponse,
	InternalAxiosRequestConfig,
	AxiosRequestConfig,
	CreateAxiosDefaults,
} from "axios";

// 拦截器
export interface Interceptors<T = AxiosResponse, D = InternalAxiosRequestConfig> {
	requestInterceptor?: (config: D) => D;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (res: any) => T;
	responseInterceptorCatch?: (error: any) => any;
}

// axios 实例配置
export interface CreateAxiosConfig<T = AxiosResponse> extends CreateAxiosDefaults {
	// 用于某个实例的拦截器
	interceptors?: Interceptors<T>;
}

// 请求配置
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	// url携带参数类型
	params?: {
		cookie?: boolean | string;
		timeStamp?: boolean;
		uid?: number;
		[key: string]: any;
	};
	// 用于某个具体请求的拦截器
	interceptors?: Interceptors<T, AxiosRequestConfig>;
}
