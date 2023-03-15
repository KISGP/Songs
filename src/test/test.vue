<template>
	<el-button @click="f">按钮</el-button>
</template>
<script setup lang="ts">
import { ElNotification } from "element-plus";
import 'element-plus/dist/index.css'
import { NETEASE } from "service/index";

const f = () => {
	ElNotification({
		title: "Error",
		message: "二维码失效,正在重新获取",
		type: "error",
	});
};
</script>
<style scoped lang="less">
</style>
