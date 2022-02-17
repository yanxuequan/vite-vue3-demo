import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { visualizer } from "rollup-plugin-visualizer";

// 组件库按需引入
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
const mode = process.env.NODE_ENV;
const env = loadEnv(mode, process.cwd());
const plugins = [];
if (mode === "production") {
  // 打包时展示依赖分析
  // plugins.push(
  //   visualizer({
  //     open: true,
  //     gzipSize: true,
  //     brotliSize: true,
  //   })
  // );
}
export default defineConfig({
  base: mode === "production" ? "/demo/" : "/",
  plugins: [
    vue(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      runtimeOnly: false,
      // you need to set i18n resource including paths !
      include: resolve(__dirname, "./src/i18n/langs/**"),
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    ...plugins,
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles.less";',
      },
    },
  },
  server: {
    proxy: {
      [env.VITE_BASE_API]: {
        target: env.VITE_PROXY_URL,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // console.log(id);
            const name = id.split("node_modules/")[1].split("/")[0];
            if (["ant-design-vue", "echarts"].includes(name)) {
              return name;
            } else {
              return "vendor";
            }
          }
        },
      },
    },
  },
  define: { "process.env": process.env },
});
