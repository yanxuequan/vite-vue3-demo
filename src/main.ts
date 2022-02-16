import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import i18n from "./i18n";
import * as icons from "./icons";

import "./styles.less";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);

app.mount("#app");

// 全局按需引入图标
const Icons: any = icons;
for (const i in Icons) {
  app.component(i, Icons[i]);
}

// import axios from "./axios";
// app.config.globalProperties.$axios = axios;
