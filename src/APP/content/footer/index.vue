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
			@volume="changeVolume"
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
		<playerMax
			v-if="SongStore.playerStatus == 'max' && SongStore.song.song.id"
			@minimize="minimizePlayer"
			@play="play"
			@pause="pause"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, reactive, provide } from "vue";
import { useSongStore } from "store/index";
import { getLyric, likeSong } from "service/api/api";
import type { lyricType } from "@/interface/interface";
import { s2min, debounce } from "utils/utils-common";
import { showSuccessMessage, showErrorMessage } from "utils/utils-content";
import playerMin from "./player-min.vue";
import playerMax from "./player-max.vue";

const SongStore = useSongStore();

onMounted(() => {
	// FIXME: 按下ESC键最 大/小 化
	// window.addEventListener("keyup", (e) => {
	// 	if (e.key == "Escape") {
	// 		if (SongStore.playerStatus == "max") {
	// 			minimizePlayer();
	// 		} else if (SongStore.playerStatus == "min") {
	// 			maximizePlayer();
	// 		}
	// 	}
	// });
});
watch(
	() => SongStore.song,
	async () => {
		SongStore.playerStatus != "min" && SongStore.update_playerStatus("min");
		lyricArray.value = await getLyric(SongStore.song.song.id);
	}
);

// 播放器（全屏 / 最小化）
const maximizePlayer = () => {
	SongStore.update_playerStatus("max");
};
const minimizePlayer = () => {
	SongStore.update_playerStatus("min");
};

const audioRef = ref<HTMLAudioElement | null>(null);
const audio: {
	currentTime: number;
	maxTime: number;
} = reactive({
	currentTime: 0,
	maxTime: 0,
});
// audio更新
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

// 进度条更新
const progressUpdate = (val: number) => {
	audioRef.value!.currentTime = val;
	audio.currentTime = val;
};

// 全部歌词
const lyricArray = ref<lyricType>([]);
// 当前歌词
const currentLyric = ref<string>("");
const currentLyricIndex = ref<number>(0);
provide("lyric", lyricArray);
provide("lyricIndex", currentLyricIndex);
// 更新当前歌词
const updateCurrentLyric = () => {
	for (let index = 0; index < lyricArray.value.length; index++) {
		if (audio.currentTime < lyricArray.value[index].time) {
			if (currentLyric.value != lyricArray.value[index - 1].content) {
				currentLyric.value = lyricArray.value[index - 1].content;
				currentLyricIndex.value = index - 1;
			}
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

// 修改音量
const changeVolume = (val: number) => {
	audioRef.value!.volume = val;
};
</script>
<style scoped lang="less">
.player {
	position: relative;
	height: var(--height-player);
	transition: height 0.6s ease;
	border-top: 1px solid var(--footer-player-border-color);
	background-color: var(--lighter-fill);
	box-shadow: var(--el-box-shadow-light);
	overflow: hidden;
	z-index: 2;
}
</style>
