<template>
	<el-button @click="f">+</el-button>
</template>
<script setup lang="ts">
import { toast, message } from "utils/notice";

const f = () => {
	message({
		message: "123",
		type: "success",
	});
};
</script>
<style scoped lang="less"></style>
