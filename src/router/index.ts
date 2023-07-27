import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore, useDataStore, useSongStore } from "store/index";

declare module "vue-router" {
	interface RouteMeta {}
}

// 导入路由文件
let routeArray: Array<RouteRecordRaw> = [];
const context = require.context("./module", false, /\.ts$/);
context.keys().map((key) => {
	routeArray.push(...context(key));
});

// 设置根路径重定向
routeArray.push({
	path: "/",
	redirect: "/song/recommend",
});

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes: [...routeArray],
});

// TODO: 路由切换时取消当前请求
// 路由守卫
router.beforeEach((to, from, next) => {
	const UserStore = useUserStore();
	const DataStore = useDataStore();
	const SongStore = useSongStore();
	// TODO：检查是否登录
	if (to.meta.requireLogin && !UserStore.netease_login) {
		// next({ path: "/user/login", query: { redirect: to.fullPath } });
		return;
	}
	// 搜索框显示隐藏
	to.meta.searchVisible != DataStore.searchVisible && DataStore.update_searchVisible();
	// 左侧主菜单显示隐藏
	to.meta.menuVisible != DataStore.menuVisible && DataStore.update_menuVisible();
	// 退出歌曲全屏
	DataStore.audioDisplayStatus == "max" && DataStore.update_audioDisplayStatus("min");
	next();
});

export default router;
