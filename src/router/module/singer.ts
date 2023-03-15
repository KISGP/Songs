const detailedSinger = () => import("@/views/singer/detailed.vue");
module.exports = [
	{
		path: "/singer",
		children: [
			{
				// 歌手详情
				path: ":id",
				component: detailedSinger,
			},
		],
	},
];
