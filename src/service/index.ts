import GPRequest from "./request";

// axios 网易云实例
const NETEASE = new GPRequest({
	baseURL: "https://k423.space/Netease",
  interceptors:{
    responseInterceptor(res) {
      return res.data;
    },       
  }
});

// axios 测试实例
const TEST = new GPRequest({
	baseURL: "https://httpbin.org",
});

export {
  NETEASE,
  TEST
}
