<template>
	<el-scrollbar ref="e">
		<p>哈哈哈哈或或或或或或或或或或或</p>
		<el-button @click="f">a</el-button>
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
const f = () => {
	console.log(document.getElementById("app")?.dataset.theme);
	document.getElementById("app")!.dataset.theme = "dark2";
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
