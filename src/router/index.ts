import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore, useDataStore } from "store/index";

declare module "vue-router" {
	interface RouteMeta {}
}

let routeArray: Array<RouteRecordRaw> = [];
const context = require.context("./module", false, /\.ts$/);
context.keys().map((key) => {
	routeArray.push(...context(key));
});

routeArray.push({
	path: "/",
	redirect: "/song/recommend",
});

const router = createRouter({
	history: createWebHistory(),
	routes: [...routeArray],
});

router.beforeEach((to, from, next) => {
	const store = useUserStore();
	const DataStore = useDataStore();
	if (to.meta.requireLogin && !store.netease_login) {
		next({ path: "/user/login", query: { redirect: to.fullPath } });
		return;
	}
	if (to.meta.searchVisible != DataStore.searchVisible) {
		DataStore.update_searchVisible();
	}
	if (to.meta.menuVisible != DataStore.menuVisible) {
		DataStore.update_menuVisible();
	}
	next();
});

export default router;
