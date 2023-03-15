import { createApp } from "vue";
import App from "./APP/index.vue";
import { registerRouter, registerStore, registerSvgIcon, registerToast } from "./hook/register";
const app = createApp(App);

// 导入样式文件
import "style/base.less";
import "style/var.css";
import "style/overwrite.css";
import 'animate.css';

// 注册
registerStore(app);
registerRouter(app);
registerToast(app);
registerSvgIcon(app);

app.mount("#app");