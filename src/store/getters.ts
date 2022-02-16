const getters = {
  isMobile: (state: any) => state.app.isMobile,
  lang: (state: any) => state.app.lang,
  theme: (state: any) => state.app.theme,
  color: (state: any) => state.app.color,
  token: (state: any) => state.user.token,
  roles: (state: any) => state.user.roles,
  userInfo: (state: any) => state.user.info,
};

export default getters;
