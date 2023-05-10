<template>
	<div ref="back" class="back">
		<el-scrollbar ref="scroll">
			<div :class="{ contain: true, focus: focusStatus }" @mouseup="mouseUp" @mousedown="mouseDown">
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
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
// 该文件是歌词滚动的旧版实现，现在换成better-scroll实现的歌词滚动
import { onMounted, inject, ref, Ref, watch } from "vue";
import type { ElScrollbar } from "element-plus";
import type { lyricsType } from "@/interface/interface";

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

// ref 对象
const back = ref<HTMLDivElement>();
const scroll = ref<InstanceType<typeof ElScrollbar>>();

// 注入的歌词
const lyrics: Ref<lyricsType> | undefined = inject("lyric");
const lyricIndex: Ref<number> | undefined = inject("lyricIndex");

// 手动滑动歌词
const isMouseActive = ref<boolean>(false);
const mouseDown = () => {
	isMouseActive.value = true;
};
const mouseUp = () => {
	isMouseActive.value = false;
};

// 布局属性
let middleBackHeight: number = 0;
const containMargin = ref<string>();

onMounted(() => {
	middleBackHeight = back.value!.clientHeight / 2;
	containMargin.value = `${middleBackHeight}px 0`;
	// 歌词滚动
	watch(
		() => lyricIndex?.value,
		() => {
			if (!isMouseActive.value) {
				const scrollTop = scroll.value!.wrapRef!.scrollTop;
				const y = document.getElementsByClassName("current")[0].getBoundingClientRect().top;
				if (y < middleBackHeight) {
					scroll.value?.scrollTo({
						top: scrollTop - (middleBackHeight - y),
						behavior: "smooth",
					});
				} else {
					scroll.value?.scrollTo({
						top: scrollTop + (y - middleBackHeight),
						behavior: "smooth",
					});
				}
			}
		},
		{ immediate: true }
	);
});
</script>
<style scoped lang="less">
.back {
	width: 50%;
	height: 100%;
	.contain {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: v-bind(containMargin);
		font-size: 1rem;
		color: var(--regular-text);
		p {
			display: flex;
			flex-direction: column;
			align-items: center;
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
