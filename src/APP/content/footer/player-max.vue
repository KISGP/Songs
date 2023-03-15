<template>
	<div class="max" @click="minimize"></div>
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
<style scoped lang="less">
.max {
	width: 50%;
	height: 50%;
	background-color: aquamarine;
	position: absolute;
}
</style>
