<template>
	<div class="back">
		<div class="data">
			<div class="head">
				<el-image class="cover" :src="data.singerData?.info.cover?.url" fit="cover" />
				<div class="message">
					<div class="name">
						<span>{{ data.singerData?.info.name }}</span>
						<i v-for="item in data.singerData?.info.alias">{{ item }}</i>
					</div>
					<div class="signature" v-if="data.singerData?.info.signature">
						<span>个性介绍：{{ data.singerData?.info.signature }}</span>
					</div>
					<div>
						<el-button>关注</el-button>
					</div>
				</div>
			</div>
			<div class="content">
				<el-tabs v-model="activePage" :stretch="true" @tab-change="tabsChange">
					<el-tab-pane name="hot">
						<template #label>
							<span class="tabs-tittle">
								热门歌曲
								<i>{{ data.hotSongs?.length }}</i>
							</span>
						</template>
						<songs-table v-if="data.hotSongs" :songs="data.hotSongs" />
					</el-tab-pane>
					<el-tab-pane name="all">
						<template #label>
							<span class="tabs-tittle">
								歌曲
								<i>{{ data.singerData?.info.count.song }}</i>
							</span>
						</template>
						<songs-table
							v-if="data.allSong && activePage === 'all'"
							:songs="data.allSong"
							v-infinite-scroll="load"
							:infinite-scroll-immediate="false"
							:infinite-scroll-delay="1000"
						/>
					</el-tab-pane>
					<el-tab-pane name="album">
						<template #label>
							<span class="tabs-tittle">
								专辑
								<i>{{ data.singerData?.info.count.album }}</i>
							</span>
						</template>
						<album-group
							style="margin: 5% 0 0 5%"
							:data="data.albums"
							:size="60"
							v-infinite-scroll="load"
							:infinite-scroll-immediate="false"
							:infinite-scroll-delay="1000"
						/>
					</el-tab-pane>
					<el-tab-pane name="mv">
						<template #label>
							<span class="tabs-tittle">
								视频
								<i>{{ data.singerData?.info.count.mv }}</i>
							</span>
						</template>
						<mv-group
							:data="data.mv"						
							:infinite-scroll-immediate="false"
							:infinite-scroll-delay="1000"
							v-infinite-scroll="load"
							style="margin: 2%;"
						/>
					</el-tab-pane>
					<el-tab-pane name="dynamic">
						<template #label>
							<span class="tabs-tittle"> 动态 </span>
						</template>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<div class="other">
			<div>
				<span @click="changeVisible('introduction')">
					歌手信息
					<el-icon><ArrowRightBold /></el-icon>
				</span>
				<introduction-brief :introduction="data.singerData?.introduction" />
			</div>
			<div>
				<span @click="changeVisible('similarSingers')">
					相似歌手
					<el-icon><ArrowRightBold /></el-icon>
				</span>
			</div>
		</div>
	</div>

	<el-dialog v-model="visible.introduction" title="歌手信息" width="50%" center>
		<introduction-detailed :introduction="data.singerData?.introduction" />
	</el-dialog>

	<el-dialog v-model="visible.similarSingers" title="相似歌手" width="50%" center>
		<singers-similar :similar-singers="data.similarSingers!" />
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "store/index";
import { SINGER } from "service/api";
import type { singerDetail, song, singer, album, mv } from "type/type";

import IntroductionBrief from "components/content/singer-introduction/brief.vue";
import IntroductionDetailed from "components/content/singer-introduction/detailed.vue";
import singersSimilar from "components/content/singers-similar/singers-similar.vue";
import songsTable from "components/content/songs-table/songs-table.vue";
import albumGroup from "components/content/album-group/album-group.vue";
import mvGroup from "components/content/mv/mv-group.vue";

const router = useRouter();
const DataStore = useDataStore();
const id: number = Number(router.currentRoute.value.params.id);

// 歌手信息
const data = reactive<{
	singerData?: singerDetail;
	similarSingers?: singer[];
	hotSongs?: song[];
	allSong?: song[];
	albums?: album[];
	mv?: mv[];
}>({});

onMounted(async () => {
	data.singerData = await SINGER.getDetail(id);
	data.similarSingers = (await SINGER.getSimilar(id)) || [];
	data.hotSongs = (await SINGER.getHotSongs(id)) || [];
	data.allSong = (await SINGER.getAllSongs(id)) || [];
	data.albums = (await SINGER.getAlbums(id)) || [];
	data.mv = (await SINGER.getMV(id)) || [];
});

const activePage = ref<string>("mv");
function tabsChange() {
	// DataStore.update_eScrollBar();
}

const visible = reactive<{
	introduction: boolean;
	similarSingers: boolean;
}>({
	introduction: false,
	similarSingers: false,
});
function changeVisible(key: "introduction" | "similarSingers") {
	visible[key] = !visible[key];
}

async function load() {
	switch (activePage.value) {
		case "all":
			data.allSong = data.allSong!.concat(
				await SINGER.getAllSongs(id, "hot", data.allSong!.length)
			);
			break;
		case "album":
			data.albums = data.albums!.concat(await SINGER.getAlbums(id, data.albums!.length));
			break;
		case "mv":
			data.mv = data.mv!.concat(await SINGER.getMV(id, data.mv!.length));
			break;
	}
	// DataStore.update_eScrollBar();
}
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	position: relative;
	.data {
		height: 100%;
		width: 100%;
		.head {
			height: 300px;
			display: flex;
			align-items: center;
			.cover {
				width: 200px;
				height: 200px;
				min-height: 200px;
				min-width: 200px;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: var(--el-box-shadow-lighter);
			}
			.message {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				margin-left: 50px;
				color: var(--primary-text);
				& > div {
					margin: 20px 10px;
				}
				.name {
					font-size: 24px;
					& > span {
						margin-right: 10px;
					}
					& > i {
						margin: 0 10px;
						font-size: 14px;
						color: var(--secondary-text);
					}
				}
				.signature {
					margin: 0 10px;
					font-size: 16px;
					color: var(--regular-text);
				}
			}
		}

		.content {
			margin-top: 2%;
			height: 600px;
			.tabs-tittle {
				font-size: 18px;
				& > i {
					font-size: 14px;
					margin: 0 5px;
				}
			}
		}
	}
	.other {
		position: absolute;
		top: 5%;
		right: 2%;
		width: 16%;
		&:hover {
			cursor: pointer;
		}
		& > div {
			padding: 10px 0;
			margin: 4% 2%;
			background-color: var(--light-fill);
			border-radius: 7px;
			overflow: hidden;
			& > span {
				display: flex;
				align-items: center;
				margin: 10px;
				color: var(--primary-text);
				&:hover {
					color: var(--theme-color);
				}
			}
		}
	}
}
</style>
