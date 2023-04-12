const recommendSong = () => import("@/views/song/recommend.vue");
const subscribedNewSong = () => import("@/views/song/subscribed-new-song.vue");

module.exports = [
	{
		path: "/song",
		children: [
			{
				// 歌曲推荐
				path: "recommend",
				component: recommendSong,
				meta: {
					requireLogin: false,
					searchVisible: true,
				},
			},
			{
				// 关注新歌
				path: "subscribed",
				component: subscribedNewSong,
				meta: {
					requireLogin: true,
					searchVisible: true,
				},
			},
		],
	},
];
