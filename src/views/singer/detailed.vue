<template>
	<div class="back">
		<div class="data">
			<div class="head">
				<el-image class="cover" :src="artistData?.info.cover" fit="cover" />
				<div class="message">
					<div class="name">
						<span>{{ artistData?.info.name }}</span>
						<i v-for="item in artistData?.info.alias">{{ item }}</i>
					</div>
					<div class="signature" v-if="artistData?.info.signature">
						<span>个性介绍：{{ artistData?.info.signature }}</span>
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
								<i>{{ hotSongs?.length }}</i>
							</span>
						</template>
						<song-table-common v-if="hotSongs" :songs="hotSongs" />
					</el-tab-pane>
					<el-tab-pane name="song">
						<template #label>
							<span class="tabs-tittle">
								歌曲
								<i>{{ artistData?.info.count.song }}</i>
							</span>
						</template>
						<song-table-common
							v-if="allSong && activePage === 'song'"
							:songs="allSong"
							v-infinite-scroll="load"
							:infinite-scroll-immediate="false"
							:infinite-scroll-delay="1000"
						/>
					</el-tab-pane>
					<el-tab-pane name="album">
						<template #label>
							<span class="tabs-tittle">
								专辑
								<i>{{ artistData?.info.count.album }}</i>
							</span>
						</template>
					</el-tab-pane>
					<el-tab-pane name="mv">
						<template #label>
							<span class="tabs-tittle">
								视频
								<i>{{ artistData?.info.count.mv }}</i>
							</span>
						</template>
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
				<artistIntroductionBrief :introduction="artistData?.introduction" />
			</div>
			<div>
				<span @click="changeVisible('similarArtists')">
					相似歌手
					<el-icon><ArrowRightBold /></el-icon>
				</span>
			</div>
		</div>
	</div>

	<el-dialog v-model="visible.introduction" title="歌手信息" width="50%" center>
		<artistIntroductionDetailed :introduction="artistData?.introduction" />
	</el-dialog>

	<el-dialog v-model="visible.similarArtists" title="相似歌手" width="50%" center>
		<artistsSimilar :similar-artists="similarArtists!" />
	</el-dialog>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
import {
	getDetailedArtist,
	getArtistHotSongs,
	getSimilarArtists,
	getArtistAllSongs,
} from "service/api/api";
import { useDataStore } from "store/index";
import type { artistDetailedType, songDetailedType, artistBriefType } from "@/interface/interface";

import artistIntroductionBrief from "@/components/content/artist-introduction/artist-introduction-brief.vue";
import artistIntroductionDetailed from "@/components/content/artist-introduction/artist-introduction-detailed.vue";
import artistsSimilar from "@/components/content/artists-similar/artists-similar.vue";
import songTableCommon from "@/components/content/songs-table/song-table-common.vue";

const router = useRouter();
const DataStore = useDataStore();
const id: number = parseInt(router.currentRoute.value.params.id as string);

// 歌手信息
const artistData = ref<artistDetailedType>();
// 热门歌曲
const hotSongs = ref<Array<songDetailedType>>();
// 全部歌曲
const allSong = ref<Array<songDetailedType>>();
onBeforeMount(async () => {
	artistData.value = await getDetailedArtist(id);
	hotSongs.value = await getArtistHotSongs(id);
	getSimilarArtists(id).then((res) => {
		similarArtists.value = res;
	});
	getArtistAllSongs(id).then((res) => {
		allSong.value = res;
	});
});

const activePage = ref<string>("hot");
const tabsChange = () => {
	DataStore.update_eScrollBar();
};

const visible = reactive({
	introduction: false,
	similarArtists: false,
});
const changeVisible = (key: "introduction" | "similarArtists") => {
	visible[key as keyof Object] != visible[key as keyof Object];
};

const similarArtists = ref<Array<artistBriefType>>();

const load = async () => {
	allSong.value = allSong.value?.concat(await getArtistAllSongs(id, "hot", allSong.value.length));
	DataStore.update_eScrollBar();
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	padding-bottom: 50px;
	position: relative;
	.data {
		height: 100%;
		width: 80%;
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
