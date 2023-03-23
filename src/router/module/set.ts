const themeSet = () => import("@/views/set/theme.vue");
module.exports = [
	{
		path: "/set",
    children: [
			{
				path: "theme",
				component: themeSet,
			},
		],
	},
];
