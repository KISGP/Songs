<template>
	<el-scrollbar :height="height">
		<el-space wrap size="large" alignment="flex-start">
			<div class="back" v-for="item in similarSingers" @click="to(item.id)">
				<el-image class="img" :src="item.cover?.url" fit="cover" loading="lazy"/>
				<span>{{ item.name }}</span>
			</div>
		</el-space>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import type { singer } from "type/type";

const router = useRouter();

const props = defineProps<{
	similarSingers: singer[]
}>();

const height = window.innerHeight / 2;
const to = (id: any): void => {
	router.push(`/singer/${id}`);
};
</script>
<style scoped lang="less">
.back {
	display: flex;
	align-items: center;
	height: 100px;
	width: 220px;
	color: var(--primary-text);
	background-color: var(--dark-fill);
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		color: var(--theme-color);
		background-color: var(--darker-fill);
	}
	.img {
		width: 80px;
		height: 80px;
		border-radius: 5px;
		margin-left: 5px;
	}
	& > span {
		text-align: center;
		flex-grow: 1;
	}
}
</style>
