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

const router = createRouter({
	history: createWebHistory(),
	routes: [...routeArray],
});

router.beforeEach((to, from, next) => {
	const UserStore = useUserStore();
	const DataStore = useDataStore();
	const SongStore = useSongStore();
	// 检查是否登录
	if (to.meta.requireLogin && !UserStore.netease_login) {
		next({ path: "/user/login", query: { redirect: to.fullPath } });
		return;
	}
	// 搜索框显示隐藏
	to.meta.searchVisible != DataStore.searchVisible && DataStore.update_searchVisible();
	// 左侧主菜单显示隐藏
	to.meta.menuVisible != DataStore.menuVisible && DataStore.update_menuVisible();
	// 退出歌曲全屏
	SongStore.playerStatus == "max" && SongStore.update_playerStatus("min");
	next();
});

export default router;
