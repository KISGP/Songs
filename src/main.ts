import { createApp } from "vue";
import App from "./APP/index.vue";
import * as register from "./hook/register";

const app = createApp(App);

// 导入样式文件
import "style/index.less";
import "animate.css";
import "vue-toastification/dist/index.css";

// 注册
register.registerStore(app);
register.registerRouter(app);
register.registerToast(app);
register.registerSvgIcon(app);
register.registerElementIcon(app);

app.mount("#app");
