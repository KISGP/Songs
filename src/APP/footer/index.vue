<template>
	<div class="player">
		<audio ref="audioRef" :src="SongStore.song?.song.url" preload="auto" autoplay />
		<playerMin v-if="DataStore.audioDisplayStatus == 'min'">
			<template v-slot:progress>
				<el-slider
					size="small"
					v-model="SongStore.currentTime"
					:max="SongStore.audio?.duration"
					:format-tooltip="(val:number) => s2min(val)"
					:disabled="SongStore.song?.song.id == undefined"
					@input="progressUpdate"
				/>
			</template>
		</playerMin>
		<playerMax
			v-if="DataStore.audioDisplayStatus == 'max' && SongStore.song?.song.id"
			:translation-v="SongStore.lyricObject.translator != null"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSongStore, useDataStore } from "store/index";
import { s2min } from "utils/utils-common";
import playerMax from "@/components/content/player/player-max.vue";
import playerMin from "@/components/content/player/player-min.vue";

const SongStore = useSongStore();
const DataStore = useDataStore();

const audioRef = ref<HTMLAudioElement>();

onMounted(() => {
	// 初始化audio
	SongStore.init_audio(audioRef.value!);
});

// 进度条更新
function progressUpdate(val: number) {
	SongStore.modify_audio("time", val);
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
