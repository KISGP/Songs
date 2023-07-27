<template>
	<el-scrollbar>
		<div>
			<el-image class="img" :src="props.coverImg" fit="fill" />
		</div>
		<div class="tag" v-if="props.tags">
			<span>标签:</span>
			<el-tag v-for="item in tags" :key="item" type="info" size="small">
				{{ item }}
			</el-tag>
		</div>
		<div class="line"></div>
		<div class="description">
			<p v-if="albumType">专辑类别：{{ albumType }}</p>
			<span>{{ description }}</span>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
const props = defineProps<{
	coverImg?: string;
	description?: string;
	tags?: string[];
	albumType?: string;
}>();
</script>
<style scoped lang="less">
.img {
	width: 50%;
	margin-left: 25%;
	border-radius: 10px;
	overflow: hidden;
}
.tag {
	display: flex;
	justify-content: center;
	margin-top: 5%;
	font-size: 14px;
	& > span {
		margin: 0 1%;
	}
}
.line {
	margin: 5% auto;
	height: 1px;
	background: -webkit-linear-gradient(left, #ffffff00 0%, rgb(176, 176, 176) 50%, #ffffff00 100%);
}
.description {
	width: 90%;
	margin: 10px auto 10% auto;
	white-space: pre-wrap;
	color: var(--secondary-text);
}
</style>
