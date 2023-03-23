<template>
	<div @click="minimize">
		<el-icon size="30"><svg-icon name="fullScreen_exit"></svg-icon></el-icon>
	</div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useSongStore } from "store/index";
const store = useSongStore();
const emits = defineEmits(["minimize"]);
const minimize = () => {
	emits("minimize");
};
</script>
<style scoped lang="less"></style>
