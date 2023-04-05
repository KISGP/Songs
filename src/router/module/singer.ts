const detailedSinger = () => import("@/views/singer/detailed.vue");
const subscribeSinger = () => import("@/views/singer/subscribe.vue");
const hotSinger = () => import("@/views/singer/hot.vue");
const topSinger = () => import("@/views/singer/top.vue");
const allSinger = () => import("@/views/singer/all.vue");

module.exports = [
	{
		path: "/singer",
		children: [
			{
				// 歌手详情
				path: ":id",
				component: detailedSinger,
			},
			{
				path: "subscribe",
				component: subscribeSinger,
			},
			{
				path: "hot",
				component: hotSinger,
				meta: {
					keepAlive: false,
				},
			},
			{
				path: "top",
				component: topSinger,
			},
			{
				path: "all",
				component: allSinger,
			},
		],
	},
];
