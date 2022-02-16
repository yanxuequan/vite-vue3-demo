import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: () => import("@/components/Home.vue") },
  { path: "/hello", component: () => import("@/components/HelloWorld.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
  return true;
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
