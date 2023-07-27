<template>
	<el-space :size="30" wrap alignment="flex-start">
		<mv-card v-for="item in data" :key="item.id" :data="item" />
	</el-space>
</template>
<script setup lang="ts">
import { mv } from "type/type";
import mvCard from "./mv.vue";
const props = defineProps<{
	data?: mv[];
}>();
</script>
<style scoped lang="less"></style>
