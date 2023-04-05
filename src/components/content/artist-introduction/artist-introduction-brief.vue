<template>
	<div class="item">
		<span>简介:</span>
		<span>{{ introduction?.briefIntroduction || "无" }}</span>
	</div>
	<div class="item" v-for="item in props.introduction?.item.slice(0, 2)">
		<span>{{ item.title }}:</span>
		<span>{{ item.content }}</span>
	</div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import type { artistIntroductionType } from "@/interface/interface";
const props = defineProps({
	introduction: {
		type: Object as PropType<artistIntroductionType>,
	},
});
</script>
<style scoped lang="less">
.item {
	margin: 10px;
	font-size: 14px;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	& > span:nth-child(1) {
		color: var(--regular-text);
	}
	& > span:nth-child(2) {
		color: var(--secondary-text);
	}
}
</style>
