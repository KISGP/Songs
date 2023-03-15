const test = () => import("@/test/test.vue");
module.exports = [
	{
		path: "/test",
		component: test,
	},
];
