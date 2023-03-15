import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

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

export default router;
