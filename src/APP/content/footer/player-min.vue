<template>
	<div class="min">
		<el-row :gutter="20">
			<el-col :span="4">
				<div class="left">
					<div class="song-img">
						<div class="cover" @click="emits('maximize')">
							<el-icon size="40">
								<svg-icon name="fullScreen" />
							</el-icon>
						</div>
						<el-image style="width: 100%; height: 100%" :src="store.song.song.cover" fit="cover" />
					</div>
				</div>
			</el-col>
			<el-col :span="14">
				<div class="center">
					<div class="audioBox" ref="audioBoxRef">
						<!-- 操作台 -->
						<div class="operate">
							<div class="operateBtn">
								<!-- 上一首 -->
								<el-icon class="foo" size="40" @click="emits('prev')">
									<svg-icon name="previous_song" class="operateColor" />
								</el-icon>
								<!-- 暂停/继续 -->
								<el-icon class="foo" size="40">
									<svg-icon
										v-if="store.isPlaying"
										name="play"
										class="operateColor"
										@click="emits('pause')"
									/>
									<svg-icon v-else name="pause" class="operateColor" @click="emits('play')" />
								</el-icon>
								<!-- 下一首 -->
								<el-icon class="foo" size="40" @click="emits('next')">
									<svg-icon name="next_song" class="operateColor" />
								</el-icon>
							</div>
						</div>
						<!-- 进度条盒子 -->
						<div class="barBox">
							<div class="messageBox" ref="messageBoxRef">
								<!-- 歌名 -->
								<span> {{ store.song.song.name || "歌名" }} </span>
								<!-- 时间 -->
								<span style="margin-left: 10px">
									{{ s2min(props.currentTime as number) }} /
									{{ s2min(props.maxTime as number) }}
								</span>
							</div>
							<slot name="progress"> </slot>
							<div class="lyric">
								<span>[{{ props.lyric }}] </span>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="right">
					<div :class="{ liked: true, 'liked-true': store.song.song.isLiked }">
						<el-icon
							size="25"
							:title="store.song.song.isLiked ? '移出我喜欢的音乐' : '添加我喜欢的音乐'"
							@click="emits('like', !store.song.song.isLiked)"
						>
							<svg-icon name="like" />
						</el-icon>
					</div>
					<div class="list">
						<el-icon size="25" title="列表" @click="changeDrawerVisual">
							<svg-icon name="list_footer" />
						</el-icon>
					</div>
					<div class="list">
						<el-icon size="25" title="添加到歌单" @click="add2list">
							<svg-icon name="list_add" />
						</el-icon>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>

	<transition name="songAdd2List" v-show="songAdd2ListVisible">
		<songAdd2List @add="add2list"/>
	</transition>

	<el-drawer v-model="listBox" :with-header="false" size="40%">
		<el-tabs v-model="activeList" class="demo-tabs">
			<el-tab-pane label="播放列表" name="播放列表">
				<playList :songs="store.playList" :songs-count="store.playList.length" />
			</el-tab-pane>
			<el-tab-pane label="历史播放" name="历史播放">
				<playList :songs="store.historyList" :songs-count="store.historyList.length" />
			</el-tab-pane>
		</el-tabs>
	</el-drawer>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { useSongStore } from "store/index";
import { s2min } from "utils/utils-common";
import playList from "components/content/playList/playList.vue";
import songAdd2List from "@/components/content/song-add2List/song-add2List.vue";

const store = useSongStore();

const props = defineProps({
	currentTime: Number,
	maxTime: Number,
	lyric: String,
});

const emits = defineEmits(["maximize", "play", "pause", "prev", "next", "like"]);

const listBox: Ref<boolean> = ref(false);
const changeDrawerVisual = () => {
	listBox.value = !listBox.value;
};

const activeList = ref("播放列表");

const songAdd2ListVisible = ref<boolean>(false);
const add2list = () => {
	songAdd2ListVisible.value = !songAdd2ListVisible.value;
};
</script>
<style scoped lang="less">
@import "style/common.less";
@height: var(--height-player);
.min {
	height: @height;
	max-height: @height;
	// overflow: hidden;
	.left {
		height: @height;
		position: relative;
		float: right;
		.song-img {
			.size(100%,@height);
			right: 5%;
			border-radius: 5px;
			overflow: hidden;
			&:hover > div[class="cover"] {
				.flex-centerY();
				.size();
				position: absolute;
				top: 0;
				z-index: 10;
				border-radius: 5px;
				color: var(--theme-color);
				background-color: rgba(70, 70, 70, 0.8);
				cursor: pointer;
			}
			.cover {
				display: none;
			}
		}
	}
	.center,
	.right {
		height: @height;
	}
	.right {
		.flex-layout(row, space-evenly);
		.list {
			&:hover {
				color: var(--theme-color);
				cursor: pointer;
			}
		}
		.liked {
			cursor: pointer;
			color: var(--secondary-text);
		}
		.liked-true {
			color: red;
		}
	}
}
.audioBox {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	height: 100%;
	.operate {
		max-width: 150px;
		.flex-centerX();
		.operateBtn {
			.flex-centerX();
			.foo {
				&:hover {
					cursor: pointer;
					border-radius: 5px;
					background-color: rgba(204, 209, 219, 0.33);
				}
				&:active {
					transform: scale(0.95);
				}
			}
			.operateColor {
				color: var(--theme-color);
			}
		}
	}

	.barBox {
		margin: 0 50px;
		position: relative;
		width: 100%;
		.flex-centerY();
		justify-content: space-evenly;
		.messageBox {
			width: 100%;
			font-size: 14px;
			text-align: center;
		}
		.progressBox {
			position: relative;
			.size(5px,100%);
			border: 0;
			border-radius: 2px;
			background-color: var(--el-border-color);
			caret-color: transparent;
			cursor: pointer;
			.progressBar {
				position: absolute;
				left: 0;
				top: 0;
				.size(5px,0);
				border: 0;
				border-radius: 2px;
				background-color: var(--el-color-primary);
				.slide {
					.size(10px,10px);
					border-radius: 50%;
					background-color: rgb(151, 144, 144);
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					&:hover {
						.size(12px,12px);
						box-shadow: 2px black;
					}
				}
			}
		}
		.lyric {
			margin: 0 auto;
			width: 600px;
			white-space: nowrap;
			text-align: center;
			font-size: 14px;
		}
	}
}

.songAdd2List-enter-active {
	animation: foo 400ms ease;
}
.songAdd2List-leave-active {
	animation: foo 500ms ease reverse;
}
@keyframes foo {
	from {
		height: 0;
		opacity: 0;
	}
	to {
		transform: 300px;
	}
}
</style>
