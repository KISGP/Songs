const searchResult = () => import("@/views/search/search.vue");
module.exports = [
	{
		// 搜索结果
		path: "/search",
		component: searchResult,
		meta: {
			requireLogin: false,
			searchVisible: false,
			menuVisible: true,
		},
	},
];
