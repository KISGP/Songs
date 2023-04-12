<template>
	<div class="back">
		<!-- 歌单数据 -->
		<div class="dataBack">
			<el-image class="cover" :src="albumData?.album.cover" fit="cover" loading="lazy" />
			<div class="data">
				<!-- 歌单名称 -->
				<div class="title">
					<span class="alia">{{ albumData?.album.name }}</span>
				</div>
				<!-- 歌单作者 -->
				<div class="user">
					歌手：
					<artists :artists="albumData?.artists.artists" />
				</div>
				<!-- 歌单简介 -->
				<div class="description" @click="showDescription">
					<span>{{ albumData?.album.description }}</span>
				</div>
				<!-- 按钮 -->
				<div class="operate">
					<el-button text type="primary" title="分享">
						<el-icon size="20"><Share /></el-icon><span>{{ albumData?.album.shareCount }}</span>
					</el-button>
					<el-button text type="primary" title="显示评论" @click="showComment">
						<el-icon size="20"><svg-icon name="comment" /></el-icon>
						<span>{{ albumData?.album.commentCount }}</span>
					</el-button>
					<el-button text type="primary" title="收藏" @click="subscribe">
						<el-icon size="20" v-if="albumData?.album.subscribed"><Check /></el-icon>
						<el-icon size="20" v-else><FolderAdd /></el-icon>
						<span>{{ albumData?.album.subscribedCount }}</span>
					</el-button>
				</div>
			</div>
		</div>
		<!-- 歌单歌曲 -->
		<div class="list">
			<songsTable :songs="songs" :songs-count="songsCount" />
		</div>
	</div>

	<el-drawer v-model="descriptionVisible" :with-header="false">
		<description
			:coverImg="albumData!.album.cover"
			:description="albumData!.album.description"
			:album-type="albumData!.album.type"
		/>
	</el-drawer>

	<el-drawer v-model="commentVisible" :with-header="false" :z-index="0">
		<comment :id="id" :type="'专辑'" />
	</el-drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { albumDetailedType, songDetailedType } from "@/interface/interface";
import { getDetailedAlbum, subscribeAlbum } from "service/api/api";
import JSConfetti from "js-confetti";
import artists from "@/components/content/artists/artists.vue";
import songsTable from "@/components/content/songs-table/song-table-common.vue";
import description from "@/components/content/description/description.vue";
import comment from "@/components/content/comment/index.vue";

const router = useRouter();
const jsConfetti = new JSConfetti();

const id: string = router.currentRoute.value.params.id as string;
const albumData = ref<albumDetailedType | undefined>();
const songs = ref<Array<songDetailedType>>([]);
const songsCount = ref<number>(0);
onMounted(async () => {
	albumData.value = await getDetailedAlbum(id);
	songs.value = albumData.value.songs;
	songsCount.value = albumData.value.album.songCount;
});

const descriptionVisible = ref<boolean>(false);
const showDescription = () => {
	descriptionVisible.value = !descriptionVisible.value;
};

const commentVisible = ref<boolean>(false);
const showComment = () => {
	commentVisible.value = !commentVisible.value;
};

const subscribe = async () => {
	if (
		(await subscribeAlbum(id, !albumData.value!.album.subscribed)) &&
		!albumData.value!.album.subscribed
	) {
		jsConfetti.addConfetti();
	}
	albumData.value!.album.subscribed = !albumData.value!.album.subscribed;
};
</script>
<style scoped lang="less" src="assets/style/detailedPage.less"></style>
