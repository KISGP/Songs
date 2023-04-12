const themeSet = () => import("@/views/set/theme.vue");
const dataSet = () => import("@/views/set/data.vue");
module.exports = [
	{
		path: "/set",
		children: [
			{
				path: "theme",
				component: themeSet,
				meta: {
					requireLogin: false,
					searchVisible: true,
				},
			},
			{
				path: "data",
				component: dataSet,
			},
		],
	},
];
