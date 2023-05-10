<template>
	<div class="wrapper">
		<div :class="{ content: true, focus: focusStatus }">
			<p
				v-for="(item, index) in lyrics?.lyric"
				:key="item.time"
				:class="{ current: index == lyricIndex }"
			>
				<span>{{ item.content }}</span>
				<span v-show="translationVisible" :class="{ translation: index != lyricIndex }">
					{{ item.translation }}
				</span>
			</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref, watch } from "vue";
import type { lyricsType } from "@/interface/interface";

import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";
import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

const props = defineProps({
	focusStatus: {
		type: Boolean,
		default: false,
	},
	translationVisible: {
		type: Boolean,
		default: true,
	},
});

// 注入的歌词
const lyrics: Ref<lyricsType> | undefined = inject("lyric");
const lyricIndex: Ref<number> | undefined = inject("lyricIndex");

let scroll: BScrollConstructor;
onMounted(() => {
	scroll = new BScroll(".wrapper", {
		mouseWheel: true,
		scrollbar: {
			fadeInTime: 200,
			fadeOutTime: 1000,
		},
	});
	middleHeight = document.querySelector(".wrapper")!.clientHeight / 2;
});

// 歌词滚动
let middleHeight: number = 0;
watch(
	() => lyricIndex?.value,
	() => {
		scroll.scrollToElement(".current", 1000, true, middleHeight);
	}
);
</script>
<style scoped lang="less">
.wrapper {
	position: relative;
	width: 50%;
	height: calc(100vh - 35px);
	overflow: hidden;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1rem;
		color: var(--regular-text);
		p {
			display: flex;
			flex-direction: column;
			align-items: center;
			transition: font-size 0.35s ease;
		}
		.current {
			font-size: 1.5rem;
			color: var(--theme-color);
			filter: none;
			& > span:nth-child(2) {
				font-size: 1rem;
			}
		}
		&:active {
			cursor: grab;
			user-select: none;
		}
		.translation {
			color: var(--secondary-text);
			font-size: 0.8rem;
		}
	}
	.focus > p {
		filter: blur(3px);
	}
}
</style>
