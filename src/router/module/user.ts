const homeUser = () => import("views/user/home.vue");
const loginUser = () => import("views/user/login-qr.vue");
module.exports = [
	{
		path: "/user",
		children: [
			{
				// 用户主页
				path: ":id",
				component: homeUser,
				meta: {
					requireLogin: true,
					searchVisible: true,
					menuVisible: false,
				},
			}
		],
	},
];
