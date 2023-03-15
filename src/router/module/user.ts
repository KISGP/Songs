const homeUser = () => import("views/user/home.vue");
const loginUser = () => import("views/user/login-qr.vue");
module.exports = [
	{
		path: "/user",
		children: [
      {
				// 用户主页
        path: "home",
				component: homeUser,
      },
			{
				// 登录
				path: "login",
				component: loginUser,
			}
		],
	},
];
