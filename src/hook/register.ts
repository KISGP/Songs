import router from "router/index";
import { store } from "store/index";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import svgIcon from "components/common/svg-icon/index.vue";

// 注册路由
export function registerRouter(app: any): void {
	app.use(router);
}

// 注册pinia
export function registerStore(app: any): void {
	app.use(store);
}

// 注册Toast(消息弹窗组件)
export function registerToast(app: any): void {
	const options: PluginOptions = {
		// You can set your default options here
	};
	app.use(Toast, options);
}

// 注册 scg-icon 组件
export function registerSvgIcon(app: any): void {
	const req = require.context("assets/svg", false, /\.svg$/);
	req.keys().map(req);
	app.component("svg-icon", svgIcon);
}
