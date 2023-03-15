<template>
	<div class="player">
		<audio
			id="audio"
			ref="audioRef"
			:src="SongStore.song.song.url"
			@timeupdate="audioUpdate"
			@durationchange="getMaxTime"
			@ended="playEnd"
			@update="audioUpdate"
			autoplay
		/>
		<playerMin
			v-if="playerStyle"
			:currentTime="audio.currentTime"
			:maxTime="audio.maxTime"
			@maximize="maximizePlayer"
			@next="next"
			@prev="prev"
			@play="play"
			@pause="pause"
		>
			<template v-slot:progress>
				<el-slider
					size="small"
					v-model="audio.currentTime"
					:max="audio.maxTime"
					@input="progressUpdate"
					:format-tooltip="(val:number) => s2min(val)"
				/>
			</template>
		</playerMin>
		<playerMax v-else @minimize="minimizePlayer" />
	</div>
</template>
<script setup lang="ts">
import { ref, Ref, watch, reactive } from "vue";
import { useSongStore } from "store/index";
import { s2min } from "utils/utils-common";
import playerMin from "./player-min.vue";
import playerMax from "./player-max.vue";

const SongStore = useSongStore();

watch(
	() => SongStore.song,
	() => {
		SongStore.update_isPlaying(true);
		SongStore.update_playerStatus("min");
	}
);

// 播放器（全屏 / 最小化）
const playerStyle: Ref<boolean> = ref(true);
const maximizePlayer = (): void => {
	playerStyle.value = false;
	SongStore.update_playerStatus("max");
};
const minimizePlayer = (): void => {
	playerStyle.value = true;
	SongStore.update_playerStatus("min");
};

const audioRef: Ref<HTMLAudioElement | null> = ref(null);
const audio: {
	currentTime: number;
	maxTime: number;
} = reactive({
	currentTime: 0,
	maxTime: 0,
});
const audioUpdate = () => {
	audio.currentTime = audioRef.value!.currentTime;
};
// 歌曲时长
const getMaxTime = () => {
	audio.maxTime = audioRef.value!.duration;
};

// 播放结束
const playEnd = () => {
	SongStore.update_isPlaying(false);
	audio.currentTime = 0;
};

// 下一首
const next = () => {
	SongStore.update_song(
		SongStore.playList[(SongStore.playList.indexOf(SongStore.song) + 1) % SongStore.playList.length]
	);
};
// 上一首
const prev = () => {
	const length = SongStore.playList.length;
	let index = SongStore.playList.indexOf(SongStore.song);
	if (index - 1 < 0) {
		index = length;
	}
	SongStore.update_song(SongStore.playList[(index - 1) % length]);
};
// 播放
const play = () => {
	audioRef.value!.play();
	SongStore.update_isPlaying(true);
};
// 暂停
const pause = () => {
	audioRef.value!.pause();
	SongStore.update_isPlaying(false);
};
const progressUpdate = (val: number) => {
	audioRef.value!.currentTime = val;
	audio.currentTime = val;
};
</script>
<style scoped lang="less">
.player {
	border-top: 1px solid var(--el-border-color);
	height: var(--height-player);
	transition: height 0.6s ease-in-out;
	background-color: #fdfdfd;
	overflow: hidden;
	z-index: 2;
}
</style>
