<template>
  <div>
    <el-button @click="f">fff</el-button>
  </div>
</template>
<script setup lang="ts">
import {  } from "vue";
import { useDataStore } from "store/index";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useDataStore();

const f = ()=>{
  store.update_searchVisible();
}
</script>
<style scoped  lang="less">

</style>