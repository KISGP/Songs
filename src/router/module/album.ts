const myAlbum = () => import("@/views/album/my.vue");
module.exports = [
	{
		path: "/album",
		children: [
			{
				// 我的专辑
				path: "my",
				component: myAlbum,
			},
		],
	},
];
