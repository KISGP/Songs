// 网易云baseURL
let NETEASE_BASEURL = "";

if (process.env.NODE_ENV === "development") {
	NETEASE_BASEURL = "https://k423.space/Netease";
} else if (process.env.NODE_ENV === "production") {
	NETEASE_BASEURL = "https://k423.space/Netease";
}

export { NETEASE_BASEURL };