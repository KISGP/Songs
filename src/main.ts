import { createApp } from "vue";
import App from "./APP/index.vue";
import {
	registerRouter,
	registerStore,
	registerSvgIcon,
	registerToast,
	registerElementIcon,
} from "./hook/register";
const app = createApp(App);

// 导入样式文件
import "style/index.less";
import "animate.css";

// 注册
registerStore(app);
registerRouter(app);
registerToast(app);
registerSvgIcon(app);
registerElementIcon(app);

app.mount("#app");
