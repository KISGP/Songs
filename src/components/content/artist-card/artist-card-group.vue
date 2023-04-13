<template>
	<el-space wrap :size="size" alignment="flex-start">
		<artist-card v-for="item in data" :key="item.id" :data="item" />
	</el-space>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { artistBriefType } from "@/interface/interface";
import artistCard from "./artist-card.vue";
const props = defineProps({
	data: {
		type: Array as PropType<artistBriefType[]>,
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
