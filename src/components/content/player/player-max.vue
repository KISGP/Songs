<template>
	<div ref="max" class="max">
		<div class="header">
			<el-icon title="退出全屏" size="25" class="icon" @click="minimize">
				<ArrowDownBold />
			</el-icon>
			<el-icon title="隐藏歌曲封面" size="20" class="icon" @click="changeCardVisible">
				<svg-icon :name="cardVisible ? 'left' : 'right'" />
			</el-icon>
			<el-icon
				size="25"
				class="icon"
				:title="SongStore.isPlaying ? '暂停' : '播放'"
				@click="SongStore.operate_audio(SongStore.isPlaying ? 'pause' : 'play')"
			>
				<svg-icon :name="SongStore.isPlaying ? 'play' : 'pause'" />
			</el-icon>
			<el-icon title="聚焦" size="25" class="icon" @click="focus">
				<svg-icon :name="focusStatus ? 'focus-in' : 'focus-out'" />
			</el-icon>
			<el-icon
				v-if="translationV"
				title="翻译"
				size="25"
				class="icon"
				@click="changeTranslationVisible"
			>
				<svg-icon name="translate" />
			</el-icon>
		</div>
		<div class="main">
			<transition name="card" appear>
				<song-card v-show="cardVisible" />
			</transition>
			<song-lyric :focus-status="focusStatus" :show-translation="translationVisible" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSongStore, useDataStore } from "store/index";
import songLyric from "@/components/content/song-lyric/song-lyric.vue";
import songCard from "@/components/content/song-card/song-card.vue";
const SongStore = useSongStore();
const DataStore = useDataStore();

const props = defineProps({
	translationV: {
		type: Boolean,
	},
});

const minimize = () => {
	DataStore.update_audioDisplayStatus("min");
};

// 歌曲封面
const cardVisible = ref<boolean>(true);
const changeCardVisible = () => {
	cardVisible.value = !cardVisible.value;
};

// 歌词聚焦
const focusStatus = ref<boolean>(false);
const focus = () => {
	focusStatus.value = !focusStatus.value;
};

// 翻译
const translationVisible = ref<boolean>(true);
const changeTranslationVisible = () => {
	translationVisible.value = !translationVisible.value;
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
		height: calc(100vh - 35px);
		flex-grow: 1;
		display: flex;
		justify-content: space-evenly;
	}
}

.card-enter-active {
	animation: hidden 150ms ease-in reverse;
}
.card-leave-active {
	animation: hidden 200ms ease-in;
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
