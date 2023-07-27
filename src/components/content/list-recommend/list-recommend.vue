<template>
	<div class="space">
		<recommend-item v-for="item in props.lists" :key="item.id" :list="item" />
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { list } from "type/type";
import RecommendItem from "./list-recommend-item.vue";

const props = defineProps<{
	lists: list[];
}>();

const space = ref<HTMLDivElement>();
</script>
<style scoped lang="less">
.space {
	margin: 2% 2% 10% 2%;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;
	& > div {
		margin: 10px;
	}
	& > div:nth-last-child(1) {
		flex-grow: 1;
	}
}
</style>
