import axios from "axios";
import router from "../router";
import store from "../store";
import { message } from "ant-design-vue";

// axios全局设置
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 10000,
});

function sendError(error: any) {
  let msg = "发生错误";
  if (error.msg) {
    msg = error.msg;
  } else if (error.message) {
    msg = error.message;
  }
  message.error(msg);
}
// axios请求拦截
http.interceptors.request.use(
  (config: any) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    // if (store.getters.token) {
    //   config.headers["Authorization"] = store.getters.token;
    // }
    return config;
  },
  (error) => {
    sendError(error);
    return Promise.reject(error.data);
  }
);

// axios 响应拦截，对响应的状态处理
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.hasOwnProperty("code")) {
      if (res.code === 401) {
        store.dispatch("user/ResetToken");
        router.push("/login");
      } else if (res.code !== 200) {
        sendError(res);
        return Promise.reject(res);
      }
      response.data = res.hasOwnProperty("data") ? res.data : res;
    }
    return response;
  },
  (error) => {
    sendError(error);
    return Promise.reject(error);
  }
);

export default http;
