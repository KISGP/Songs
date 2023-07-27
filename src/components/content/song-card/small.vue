<template>
	<div class="songCard">
		<el-image class="songImg" :src="props.img" fit="cover" loading="lazy" />
		<span :title="props.title">{{ props.title }}</span>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	img?: string;
	title?: string;
}>();
</script>
<style scoped lang="less">
.songCard {
	cursor: pointer;
	user-select: none;
	display: flex;
	align-items: center;
	width: 30%;
	height: 120px;
	min-width: 250px;
	min-height: 120px;
	color: var(--primary-text);
	background-color: var(--light-fill);
	border-radius: 8px;
	margin: 0 1% 5px 0;
	box-shadow: var(--el-box-shadow-lighter);
	&:hover {
		color: var(--theme-color);
		background-color: var(--dark-fill);
	}
	.songImg {
		width: 100px;
		height: 100px;
		min-width: 100px;
		min-height: 100px;
		border-radius: 7px;
		margin: 0 3%;
	}
	& > span {
		padding: 0 3px;
		font-size: 16px;
		line-height: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
}
</style>
