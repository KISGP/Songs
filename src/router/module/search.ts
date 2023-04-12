const searchResult = () => import("@/views/search/result.vue");
module.exports = [
	{
		// 搜索结果
		path: "/search",
		component: searchResult,
		meta: {
			requireLogin: false,
			searchVisible: false,
		},
	},
];
