<template>
	<el-scrollbar ref="e">
		<button style="position: absolute;z-index: 100;" @click="r">1</button>
		<button @click="x">2</button>
		<el-table
			:data="d"
			v-infinite-scroll="r"
			:infinite-scroll-immediate="false"
		>
			<el-table-column type="index" label="首" width="80" />
			<el-table-column label="歌曲标题" prop="a"> </el-table-column>
		</el-table>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
const e = ref<HTMLElement>();

const d = ref([
	{
		a: 1,
	},
]);
const r = () => {
	for (let i = 0; i < 20; i++) {
		d.value.push({
			a: 1,
		});
	}
};
const x = () => {
	e.value?.scrollTo({
		top: 1000,
		behavior: "smooth",
	});
};
</script>
<style scoped lang="less">
.f {
	width: 300px;
	height: 900px;
	background-color: rgb(143, 143, 143);
	overflow-y: scroll;
}
</style>
