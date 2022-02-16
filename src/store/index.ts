import { createStore } from "vuex";
import getters from "./getters";
import app from "./modules/app";
// import user from "./modules/user";

export default createStore({
  state: {
    // baseURL: process.env.BASE_URL,
    baseURL: "",
  },
  getters,
  mutations: {},
  actions: {},
  modules: { app },
});
