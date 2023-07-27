<template>
	<div class="card" @click="router.push(`/singer/${data.id}`)">
		<el-image class="img" :src="data.cover?.url" fit="cover" lazy />
		<span>{{ data.name }}</span>
		<i v-for="item in data.alias">{{ item }}</i>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { singer } from "type/type";
const router = useRouter();
const props = defineProps<{
	data: singer;
	top?: number;
}>();
</script>
<style scoped lang="less">
@width: 180px;
@img-width: 150px;
.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: @width;
	min-height: 258px;
	background-color: var(--light-fill);
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: var(--darker-fill);
	}
	.img {
		width: @img-width;
		height: @img-width;
		border-radius: 6px;
		overflow: hidden;
		margin: 10px 0;
	}
	& > i {
		margin: 5px 0;
	}
	& > span {
		margin: 7% auto;
		font-size: 18px;
	}
	& > i {
		font-size: 12px;
		color: var(--secondary-text);
	}
}
</style>
