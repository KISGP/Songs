import GPRequest from "./request";
import { NETEASE_BASEURL } from "../constant/constant";

// axios 网易云实例
const NETEASE = new GPRequest({
	baseURL: NETEASE_BASEURL,
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
