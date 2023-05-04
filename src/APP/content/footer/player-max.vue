<template>
	<div class="max">
		<div class="header">
			<el-icon title="退出全屏" size="25" class="icon" @click="minimize">
				<ArrowDownBold />
			</el-icon>
			<el-icon title="隐藏歌曲封面" size="20" class="icon" @click="changeCardVisible">
				<svg-icon :name="cardVisible ? 'left' : 'right'" />
			</el-icon>
			<el-icon title="暂停" size="25" class="icon" @click="playOrPause">
				<svg-icon :name="SongStore.isPlaying ? 'play' : 'pause'" />
			</el-icon>
		</div>
		<div class="main">
			<transition name="card">
				<song-card v-show="cardVisible" />
			</transition>
			<song-lyric />
		</div>
	</div>
</template>
<script setup lang="ts">
// TODO： 实现全屏播放
import { ref } from "vue";
import { useSongStore } from "store/index";
import songLyric from "@/components/content/song-lyric/song-lyric.vue";
import songCard from "@/components/content/song-card/song-card.vue";
const SongStore = useSongStore();

const emits = defineEmits(["minimize", "play", "pause"]);

const minimize = () => {
	emits("minimize");
};
const playOrPause = () => {
	SongStore.isPlaying ? emits("pause") : emits("play");
};

const cardVisible = ref<boolean>(true);
const changeCardVisible = () => {
	cardVisible.value = !cardVisible.value;
};
</script>
<style scoped lang="less">
.max {
	height: 100%;
	display: flex;
	flex-direction: column;

	.header {
		display: flex;
		align-items: center;
		.icon {
			margin: 5px 1%;
			cursor: pointer;
			color: var(--regular-text);
			&:hover {
				color: var(--theme-color);
			}
		}
	}
	.main {
		max-height: calc(100vh - 35px);
		flex-grow: 1;
		display: flex;
		justify-content: space-evenly;
	}
}

.card-enter-active {
	animation: hidden 200ms ease reverse;
}
.card-leave-active {
	animation: hidden 350ms ease;
}
@keyframes hidden {
	from {
		opacity: 1;
		width: 30%;
	}
	to {
		opacity: 0;
		width: 0;
	}
}
</style>
