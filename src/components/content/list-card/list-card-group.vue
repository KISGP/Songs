<template>
	<el-space wrap size="large" alignment="flex-start">
		<list-card v-for="item in list" :list="item" :key="item.id"/>
	</el-space>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { listBriefType } from "@/interface/interface";
import listCard from "./list-card.vue";

const props = defineProps({
	list: {
		type: Array as PropType<Array<listBriefType>>,
		require: true,
	},
});
</script>
<style scoped lang="less"></style>
