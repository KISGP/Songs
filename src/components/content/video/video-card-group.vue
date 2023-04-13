<template>
	<el-space wrap :size="size" alignment="flex-start">
		<videoCard v-for="item in data" :key="item.id" :data="item" />
	</el-space>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { videoType } from "@/interface/interface";
import videoCard from "./video-card.vue";
const props = defineProps({
	data: {
		type: Array as PropType<videoType[]>,
		required: true,
	},
	size: {
		type: Number as PropType<number>,
		required: false,
		default: 30,
	},
});
</script>
<style scoped lang="less"></style>
