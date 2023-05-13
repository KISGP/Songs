import { createApp } from "vue";
import { store } from "store/index";
import App from "./APP/index.vue";
import router from "router/index";
import Toast from "vue-toastification";
import svgIcon from "components/common/svg-icon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 导入样式文件
import "style/index.less";
import "animate.css";
import "vue-toastification/dist/index.css";

// 注册路由
app.use(router);

// 注册pinia
app.use(store);

// 注册Toast(消息弹窗组件)
app.use(Toast, {});

// 注册 scg-icon 组件
const req = require.context("assets/svg", false, /\.svg$/);
req.keys().map(req);
app.component("svg-icon", svgIcon);

// 注册Element的所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount("#app");
