<template>
	<el-scrollbar :height="height">
		<div class="back">
			<p>简介:</p>
			<span>{{ introduction?.briefIntroduction }}</span>
		</div>
		<div class="back" v-for="item in introduction?.item">
			<p>{{ item.title }}</p>
			<span>{{ item.content }}</span>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import type { singerIntroduction } from "type/type";
const props = defineProps<{
	introduction?: singerIntroduction;
}>();

const height = window.innerHeight / 2;
</script>
<style scoped lang="less">
.back {
	line-height: 25px;
	color: var(--primary-text);
	& > span {
		color: var(--secondary-text);
		white-space: pre-wrap;
	}
}
</style>
