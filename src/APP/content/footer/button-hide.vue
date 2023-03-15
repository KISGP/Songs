<template>
	<div class="switch-box" @click="hideOrShow">
		<div class="switch">
			<el-icon size="2vw" id="icon">
				<svg-icon v-if="status" name="show"></svg-icon>
				<svg-icon v-else name="hide"></svg-icon>
			</el-icon>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useSongStore } from "store/module/songs";
const SongStore = useSongStore();

const status: Ref<boolean> = ref(true);
const hideOrShow = () => {
	status.value = !status.value;
	SongStore.update_playerStatus(status.value ? "hidden" : "min");
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
			color: var(--them-color);
		}
	}
}
</style>
