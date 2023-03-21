const myAlbum = () => import("@/views/album/my.vue");
const detailedAlbum = () => import("@/views/album/detailed.vue");
module.exports = [
	{
		path: "/album",
		children: [
			{
				// 我的专辑
				path: "my",
				component: myAlbum,
			},
			{
				// 歌单详情
				path: ":id",
				component: detailedAlbum,
			},
		],
	},
];
