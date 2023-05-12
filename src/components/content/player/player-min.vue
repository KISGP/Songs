<template>
	<div class="min">
		<el-row :gutter="20">
			<el-col :span="4">
				<!-- 歌曲图片 -->
				<div class="left">
					<div class="song-img">
						<div class="cover" @click="DataStore.update_audioDisplayStatus('max')">
							<el-icon size="40">
								<svg-icon name="fullScreen" />
							</el-icon>
						</div>
						<el-image
							style="width: 100%; height: 100%"
							:src="SongStore.song?.song.cover"
							fit="cover"
						/>
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
								<el-icon class="foo" size="40" @click="SongStore.operate_audio('prev')">
									<svg-icon name="previous_song" class="operateColor" />
								</el-icon>
								<!-- 暂停/继续 -->
								<el-icon class="foo" size="40">
									<svg-icon
										class="operateColor"
										:name="SongStore.isPlaying ? 'play' : 'pause'"
										@click="SongStore.operate_audio(SongStore.isPlaying ? 'pause' : 'play')"
									/>
								</el-icon>
								<!-- 下一首 -->
								<el-icon class="foo" size="40" @click="SongStore.operate_audio('next')">
									<svg-icon name="next_song" class="operateColor" />
								</el-icon>
							</div>
						</div>
						<!-- 进度条盒子 -->
						<div class="barBox">
							<div class="messageBox" ref="messageBoxRef">
								<!-- 歌名 -->
								<span> {{ SongStore.song?.song.name || "歌名" }} </span>
								<!-- 时间 -->
								<span style="margin-left: 10px">
									{{ `${s2min(SongStore.currentTime)} / ${s2min(SongStore.audio?.duration ?? 0)}` }}
								</span>
							</div>
							<slot name="progress"> </slot>
							<!-- 歌词 -->
							<div class="lyric">
								<span>{{ SongStore.currentLyric.content }}&nbsp;</span>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="right">
					<div :class="{ liked: true, 'liked-true': SongStore.song?.song.isLiked }">
						<el-icon
							size="25"
							:title="SongStore.song?.song.isLiked ? '移出我喜欢的音乐' : '添加我喜欢的音乐'"
							@click="SongStore.likeSong(!SongStore.song?.song.isLiked!)"
						>
							<svg-icon name="like" />
						</el-icon>
					</div>
					<div class="option">
						<el-icon size="25" title="列表" @click="changeDrawerVisual">
							<svg-icon name="list_footer" />
						</el-icon>
					</div>
					<div
						class="option"
						:class="{ hover: add2list.visible }"
						v-if="UserStore.netease_login"
						ref="add2listDiv"
					>
						<el-icon size="25" title="添加到歌单" @click="changeAdd2listVisible">
							<svg-icon name="list_add" />
						</el-icon>
					</div>
					<div class="option" :class="{ hover: volume.visible }" ref="volumeDiv">
						<el-icon size="25" title="音量">
							<svg-icon v-if="volume.val > 0" name="volume" @click="changeVolumeVisible" />
							<svg-icon v-else name="volume_no" @click="changeVolumeVisible" />
						</el-icon>
					</div>
					<div class="option">
						<el-icon size="25" title="下载" @click="download">
							<Download />
						</el-icon>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>

	<!-- 音量调节 -->
	<transition name="songAdd2List" v-show="volume.visible">
		<div class="volume-back">
			<div>
				<el-slider
					v-model="volume.val"
					vertical
					height="150px"
					:show-tooltip="false"
					:disabled="SongStore.song?.song.id == undefined"
					@input="volumeChange"
				/>
			</div>
			<div>
				<span>{{ volume.val }}</span>
			</div>
		</div>
	</transition>

	<!-- 添加到歌单BOX -->
	<transition name="songAdd2List" v-show="add2list.visible">
		<songAdd2List @add="changeAdd2listVisible" :left="add2list.DivLeft" />
	</transition>

	<!-- 列表 -->
	<el-drawer v-model="list.visible" :with-header="false">
		<el-tabs v-model="activeList" class="demo-tabs">
			<el-tab-pane label="播放列表" name="播放列表">
				<playList :songs="DataStore.playList" :songs-count="DataStore.playList.length" />
			</el-tab-pane>
			<el-tab-pane label="历史播放" name="历史播放">
				<playList :songs="DataStore.historyList" :songs-count="DataStore.historyList.length" />
			</el-tab-pane>
		</el-tabs>
	</el-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useSongStore, useUserStore, useDataStore } from "store/index";
import { downloadFile } from "utils/utils-content";
import { s2min } from "utils/utils-common";
import playList from "components/content/playList/playList.vue";
import songAdd2List from "@/components/content/song-add2List/song-add2List.vue";

const SongStore = useSongStore();
const UserStore = useUserStore();
const DataStore = useDataStore();

const activeList = ref("播放列表");

// 播放列表
const list = reactive<{
	visible: boolean;
}>({
	visible: false,
});
const changeDrawerVisual = () => {
	list.visible = !list.visible;
	volume.visible = add2list.visible = false;
};

// 添加到歌单
const add2list = reactive<{
	Div: HTMLDivElement | null;
	DivLeft: string;
	visible: boolean;
}>({
	Div: null,
	DivLeft: "",
	visible: false,
});
const add2listDiv = ref<HTMLDivElement>();
const changeAdd2listVisible = () => {
	add2list.visible = !add2list.visible;
	const { x, width } = add2listDiv.value!.getBoundingClientRect();
	add2list.DivLeft = x - (270 - width) / 2 + "px";
	volume.visible = list.visible = false;
};

// 声音
const volume = reactive<{
	val: number;
	DivLeft: string;
	visible: boolean;
}>({
	val: 100,
	DivLeft: "",
	visible: false,
});
const volumeDiv = ref<HTMLDivElement>();
const changeVolumeVisible = () => {
	volume.visible = !volume.visible;
	const { x, width } = volumeDiv.value!.getBoundingClientRect();
	volume.DivLeft = x - (58 - width) / 2 + "px";
	add2list.visible = list.visible = false;
};
const volumeChange = (val: number) => {
	SongStore.modify_audio("volume", val / 100);
};

// 下载
const download = () => {
	SongStore.song?.song.url && downloadFile(SongStore.song.song.url, SongStore.song.song.name);
};
</script>
<style scoped lang="less">
@import "style/common.less";
@height: var(--height-player);
.min {
	height: @height;
	max-height: @height;
	overflow: hidden;
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
		.option {
			&:hover {
				color: var(--theme-color);
				cursor: pointer;
			}
		}
		.hover {
			color: var(--theme-color);
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

.volume-back {
	position: fixed;
	bottom: calc(var(--height-player) + 10px);
	left: v-bind("volume.DivLeft");
	height: 220px;
	padding: 10px 10px 20px 10px;
	border-radius: 7px;
	background-color: var(--base-fill);
	text-align: center;
	& > div:nth-child(1) {
		height: 200px;
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
