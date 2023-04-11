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
				// 详情
				path: ":id",
				component: detailedAlbum,
			},
		],
	},
];
