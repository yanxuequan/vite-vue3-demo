import { createI18n } from "vue-i18n";
import zh from "./langs/zh";
import en from "./langs/en";

const messages = {
  zh,
  en,
};

export const getLocale = () => {
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  // Default language is zh
  return "zh";
};

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: "zh",
  globalInjection: true,
  messages,
});

export default i18n;
