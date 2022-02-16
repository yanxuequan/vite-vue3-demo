const state = () => ({
  lang: "zh-cn",
  _antLocale: {},
});

const getters = {};

const mutations = {
  APP_LANGUAGE(state: any, lang: string, antd = {}) {
    state.lang = lang;
    state._antLocale = antd;
    localStorage.setItem("app_language", lang);
  },
};

const actions = {
  async SetLang({ commit }: any, lang: any) {
    commit("APP_LANGUAGE", lang);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
