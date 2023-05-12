<template>
	<div class="switch-box" @click="hideOrShow">
		<transition name="switch">
			<div class="switch">
				<el-icon size="2vw" id="icon">
					<svg-icon v-if="DataStore.audioDisplayStatus == 'hidden'" name="show"></svg-icon>
					<svg-icon v-if="DataStore.audioDisplayStatus == 'min'" name="hide"></svg-icon>
				</el-icon>
			</div>
		</transition>
	</div>
</template>
<script setup lang="ts">
import { useDataStore } from "store/index";
const DataStore = useDataStore();

const hideOrShow = () => {
	DataStore.update_audioDisplayStatus(DataStore.audioDisplayStatus === "min" ? "hidden" : "min");
};
</script>
<style scoped lang="less">
.switch-box {
	cursor: pointer;
	position: absolute;
	left: 10px;
	bottom: 1vh;
	height: 6vh;
	width: 2vw;
	z-index: 2;
	.switch {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: #444444;
		&:hover {
			color: var(--theme-color);
		}
	}
}
</style>
