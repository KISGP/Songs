<template>
	<el-space wrap :size="size || 30" alignment="flex-start">
		<artist-card v-for="item in data" :key="item.id" :data="item" />
	</el-space>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { singer } from "type/type";
import artistCard from "./singer-card.vue";

const props = defineProps<{
	data: singer[];
	size?: number;
}>();
</script>
<style scoped lang="less"></style>
