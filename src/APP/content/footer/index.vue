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
			v-if="SongStore.playerStatus == 'min'"
			:currentTime="audio.currentTime"
			:maxTime="audio.maxTime"
			:lyric="currentLyric"
			@maximize="maximizePlayer"
			@next="next"
			@prev="prev"
			@play="play"
			@pause="pause"
			@like="like"
		>
			<template v-slot:progress>
				<el-slider
					size="small"
					v-model="audio.currentTime"
					:max="audio.maxTime"
					@input="progressUpdate"
					:format-tooltip="(val:number) => s2min(val)"
					:disabled="!SongStore.song.song.id"
				/>
			</template>
		</playerMin>
		<playerMax v-if="SongStore.playerStatus == 'max'" @minimize="minimizePlayer" />
	</div>
</template>
<script setup lang="ts">
import { ref, Ref, watch, reactive } from "vue";
import { useSongStore } from "store/index";
import { getLyric, likeSong } from "service/api/api";
import type { lyricType } from "@/interface/interface";
import { s2min, debounce } from "utils/utils-common";
import { showSuccessMessage, showErrorMessage } from "utils/utils-content";
import playerMin from "./player-min.vue";
import playerMax from "./player-max.vue";

const SongStore = useSongStore();

watch(
	() => SongStore.song,
	async () => {
		SongStore.update_isPlaying(true);
		SongStore.playerStatus != "min" && SongStore.update_playerStatus("min");
		lyricArray.value = await getLyric(SongStore.song.song.id);
	}
);

// 播放器（全屏 / 最小化）
const maximizePlayer = (): void => {
	SongStore.update_playerStatus("max");
};
const minimizePlayer = (): void => {
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
const audioUpdate = debounce(() => {
	audio.currentTime = audioRef.value!.currentTime;
	if (lyricArray.value.length > 0) {
		updateCurrentLyric();
	}
}, 200);
// 歌曲时长
const getMaxTime = () => {
	audio.maxTime = audioRef.value!.duration;
};

// 播放结束
const playEnd = () => {
	SongStore.update_isPlaying(false);
	audio.currentTime = 0;
	next();
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

// 歌曲
const lyricArray: Ref<lyricType> = ref([]);
const currentLyric: Ref<string> = ref("");
const updateCurrentLyric = () => {
	for (let index = 0; index < lyricArray.value.length; index++) {
		if (audio.currentTime < lyricArray.value[index].time) {
			if (currentLyric.value != lyricArray.value[index - 1].content)
				currentLyric.value = lyricArray.value[index - 1].content;
			return;
		}
	}
};

// 添加到我喜欢的音乐
const like = async (isLiked: boolean) => {
	if (SongStore.song.song.id) {
		const res: boolean = await likeSong(SongStore.song.song.id, isLiked);
		if (res && !isLiked) {
			showSuccessMessage("成功移出我喜欢的音乐");
			SongStore.song.song.isLiked = isLiked;
		} else if (res && isLiked) {
			showSuccessMessage("成功添加到我喜欢的音乐");
			SongStore.song.song.isLiked = isLiked;
		} else {
			showErrorMessage("移出/添加 错误");
		}
		SongStore.reload_likedSongsID();
	}
};
</script>
<style scoped lang="less">
.player {
	height: var(--height-player);
	transition: height 0.6s ease;
	border-top: 1px solid var(--footer-player-border-color);
	background-color: var(--footer-player-bg-color);
	overflow: hidden;
	z-index: 2;
}
</style>
