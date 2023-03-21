// 网易云baseURL
let NETEASE_BASEURL = "";

if (process.env.NODE_ENV === "development") {
	NETEASE_BASEURL = "https://k423.space/Netease";
} else if (process.env.NODE_ENV === "production") {
	NETEASE_BASEURL = "https://k423.space/Netease";
}

// 资源
const RESOURCE = ["歌曲", "mv", "歌单", "专辑", "电台节目", "视频", "动态", "电台"];

export { NETEASE_BASEURL, RESOURCE };
