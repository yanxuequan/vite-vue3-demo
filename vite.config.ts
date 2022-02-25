import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { visualizer } from "rollup-plugin-visualizer";
import copy from "rollup-plugin-copy";

// 组件库按需引入
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
const mode = process.env.NODE_ENV;
const env = loadEnv(mode, process.cwd());
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
    // copy({
    //   verbose: true,
    //   hook: "writeBundle",
    //   targets: [{ src: "src/components/Home/*", dest: "dist/public/Home" }],
    // }),
    // visualizer(),
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
        // charset: false,
        javascriptEnabled: true,
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
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          let assetsDir = "assets/";
          if (/\.css$/.test(assetInfo.name)) {
            assetsDir = "css/";
          }
          return `${assetsDir}[name]-[hash][extname]`;
        },
        manualChunks: (id) => {
          const match = id.match(/node_modules\/([^\/]+)/);
          if (match?.length) {
            const groups = ["ant-design-vue", "echarts"];
            const name = match[1];
            if (groups.includes(name)) {
              return name;
            } else {
              return "libs";
            }
          } else {
            const vmatch = id.match(/src\/views\/([^\/]+)\/.*/);
            if (vmatch?.length) {
              return vmatch[1];
            }
          }
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  define: { "process.env": process.env },
});
