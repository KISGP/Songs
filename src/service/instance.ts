import GPRequest from "./axios";
import checkout from "./checkout";

// 网易云
export const NETEASE = new GPRequest({
	baseURL: "https://k423.space/Netease",
	interceptors: {
		requestInterceptor(config) {
			return checkout(config);
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
