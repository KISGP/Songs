<template>
	<div class="switch-box" @click="hideOrShow">
		<div class="switch">
			<el-icon size="2vw" id="icon">
				<svg-icon v-if="SongStore.playerStatus == 'hidden'" name="show"></svg-icon>
				<svg-icon v-if="SongStore.playerStatus == 'min'" name="hide"></svg-icon>
			</el-icon>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useSongStore } from "store/module/songs";
const SongStore = useSongStore();

const hideOrShow = () => {
	if (SongStore.playerStatus == "min") {
		SongStore.update_playerStatus("hidden");
	} else {
		SongStore.update_playerStatus("min");
	}
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
