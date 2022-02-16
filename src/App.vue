<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

dayjs.locale("zh-cn");

const locale = ref(zhCN.locale);
const { locale: i18nLocale } = useI18n();

watch(locale, (val) => {
  dayjs.locale(val);
  i18nLocale.value = val === "en" ? "en" : "zh";
});
</script>

<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <a-radio-group v-model:value="locale">
      <a-radio-button key="en" :value="enUS.locale">English</a-radio-button>
      <a-radio-button key="zh" :value="zhCN.locale">中文</a-radio-button>
    </a-radio-group>
    <router-view></router-view>
  </a-config-provider>
</template>
