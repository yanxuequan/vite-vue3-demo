<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();
console.log(store)

// import { getCurrentInstance } from "vue";
// const { proxy } = getCurrentInstance();
// console.log(proxy);

import { login } from "@/api";
</script>

<template>
  <h1 @click="login.searchGithub()">Home</h1>
  <div><LoadingOutlined />{{ $t("common.status.0") }}</div>
</template>
