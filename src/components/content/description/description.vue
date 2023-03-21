<template>
	<el-scrollbar>
		<div>
			<el-image class="img" :src="coverImg" fit="fill" />
		</div>
		<div v-if="tags.length > 0" class="tag">
			标签:
			<el-tag style="margin-left: 10px" v-for="item in tags" size="small" round>{{ item }}</el-tag>
		</div>
		<div class="line"></div>
		<div class="description">
			<p v-if="albumType">专辑类别：{{ albumType }}</p>
			<span>{{ description }}</span>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { PropType } from "vue";
const props = defineProps({
	coverImg: {
		type: String as PropType<string>,
		required: true,
	},
	description: {
		type: String as PropType<string>,
		required: true,
	},
	tags: {
		type: Array as PropType<Array<string>>,
		default: [],
	},
	albumType: {
		type: String as PropType<string>,
		default: "",
	},
});
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
	margin-top: 20px;
}
.line {
	margin: 10px auto;
	height: 1px;
	background: -webkit-linear-gradient(left, #fff -4%, rgb(168, 168, 168) 50%, #fff 100%);
}
.description {
	width: 80%;
	margin: 10px auto;
	white-space: pre-wrap;
	color: var(--el-text-color-primary);
}
</style>
