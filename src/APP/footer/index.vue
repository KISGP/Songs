<template>
	<div class="player">
		<audio
			ref="audioRef"
			:src="SongStore.song?.song.url"
			@timeupdate="audioUpdate"
			@durationchange="getMaxTime"
			@ended="end"
			autoplay
		/>
		<playerMin
			v-if="DataStore.audioDisplayStatus == 'min'"
			:currentTime="songData.currentTime"
			:maxTime="songData.maxTime"
			:lyric="songData.currentLyric.content"
			@maximize="maximize"
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
					v-model="songData.currentTime"
					:max="songData.maxTime"
					@input="progressUpdate"
					:format-tooltip="(val:number) => s2min(val)"
					:disabled="SongStore.song?.song.id"
				/>
			</template>
		</playerMin>
		<playerMax
			v-if="DataStore.audioDisplayStatus == 'max' && SongStore.song?.song.id"
			@minimize="minimize"
			@play="play"
			@pause="pause"
			:translation-v="songData.lyric?.translator?.id != null"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, reactive, provide } from "vue";
import { useSongStore, useDataStore } from "store/index";
import { getLyric, likeSong } from "service/api/api";
import { s2min, debounce } from "utils/utils-common";
import { showSuccessMessage, showErrorMessage } from "utils/utils-content";
import type { lyricsType } from "@/interface/interface";
import playerMin from "./player-min.vue";
import playerMax from "./player-max.vue";

const SongStore = useSongStore();
const DataStore = useDataStore();

onMounted(() => {
	// 按下ESC键最 大/小 化
	window.addEventListener("keyup", (e) => {
		if (e.key == "Escape") {
			if (DataStore.audioDisplayStatus == "max" && SongStore.song?.song.id) {
				minimize();
			} else if (DataStore.audioDisplayStatus == "min") {
				maximize();
			}
		}
	});
});

watch(
	() => SongStore.song,
	async () => {
		if (DataStore.audioDisplayStatus == "hidden") {
			DataStore.update_audioDisplayStatus("min");
		}
		songData.lyric = await getLyric(SongStore.song!.song.id);
	}
);

const audioRef = ref<HTMLAudioElement>();
type songDataType = {
	currentTime: number; // 当前时间
	maxTime: number; // 歌曲时长
	lyric: lyricsType; // 全部歌词
	currentLyric: { content: string; index: number }; // 当前歌词
	rate: number; // TODO: 播放速率
};
const songData: songDataType = reactive({
	currentTime: 0,
	maxTime: 0,
	lyric: { lyric: null, translator: null },
	currentLyric: { content: "", index: 0 },
	rate: 0,
});
provide<lyricsType>("lyric", songData.lyric);
provide<number>("lyricIndex", songData.currentLyric.index);

// audio更新
const audioUpdate = debounce(() => {
	// 更新歌曲当前播放时间
	songData.currentTime = audioRef.value!.currentTime;
	// 更新当前歌词
	if (songData.lyric.lyric) {
		for (let i = 0; i < songData.lyric.lyric.length; i++) {
			if (songData.currentTime < songData.lyric.lyric[i].time) {
				if (songData.currentLyric.content != songData.lyric.lyric[i - 1].content) {
					songData.currentLyric = {
						content: songData.lyric.lyric[i - 1].content,
						index: i - 1,
					};
				}
				return;
			}
		}
	}
}, 250);

// 歌曲时长
function getMaxTime() {
	songData.maxTime = audioRef.value!.duration;
}

// 播放
function play() {
	audioRef.value!.play();
	SongStore.update_isPlaying(true);
}
// 播放结束
function end() {
	SongStore.update_isPlaying(false);
	songData.currentTime = 0;
	next();
}
// 暂停
function pause() {
	audioRef.value!.pause();
	SongStore.update_isPlaying(false);
}
// 下一首
function next() {
	SongStore.update_song(
		SongStore.playList[
			(SongStore.playList.indexOf(SongStore.song!) + 1) % SongStore.playList.length
		]
	);
}
// 上一首
function prev() {
	const length = SongStore.playList.length;
	let index = SongStore.playList.indexOf(SongStore.song!);
	if (index < 1) {
		index = length;
	}
	SongStore.update_song(SongStore.playList[(index - 1) % length]);
}
// 修改音量
function changeVolume(val: number) {
	audioRef.value!.volume = val;
}
// 进度条更新
function progressUpdate(val: number) {
	audioRef.value!.currentTime = songData.currentTime = val;
}

// 播放器（全屏 / 最小化）
function maximize() {
	DataStore.update_audioDisplayStatus("max");
}
function minimize() {
	DataStore.update_audioDisplayStatus("min");
}

// 添加到我喜欢的音乐
async function like(isLiked: boolean) {
	if (SongStore.song?.song.id) {
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
}
</script>
<style scoped lang="less">
.player {
	position: relative;
	height: var(--height-player);
	transition: height 600ms ease;
	border-top: 1px solid var(--footer-player-border-color);
	background-color: var(--lighter-fill);
	box-shadow: var(--el-box-shadow-light);
	overflow: hidden;
	z-index: 2;
}
</style>
