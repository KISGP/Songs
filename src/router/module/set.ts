const themeSet = () => import("@/views/set/theme.vue");
const basicSet = () => import("@/views/set/basic.vue");
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
					menuVisible: true,
				},
			},
			{
				path: "basic",
				component: basicSet,
				meta: {
					requireLogin: false,
					searchVisible: true,
					menuVisible: true,
				},
			},
		],
	},
];
