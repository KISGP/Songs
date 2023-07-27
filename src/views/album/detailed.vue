<template>
	<div class="back">
		<!-- 歌单数据 -->
		<div class="dataBack">
			<el-image class="cover" :src="albumData?.cover?.url" fit="cover" loading="lazy" />
			<div class="data">
				<!-- 歌单名称 -->
				<div class="title">
					<span class="alia">{{ albumData?.name }}</span>
				</div>
				<!-- 歌单作者 -->
				<div class="user">
					歌手：
					<singers :singers="albumData?.singers.singers" />
				</div>
				<!-- 歌单简介 -->
				<div class="description" @click="showDescription">
					<span>{{ albumData?.description }}</span>
				</div>
				<!-- 按钮 -->
				<div class="operate">
					<el-button text type="primary" title="分享">
						<el-icon size="20"><Share /></el-icon>
						<span>{{ albumData?.count.share }}</span>
					</el-button>
					<el-button text type="primary" title="显示评论" @click="showComment">
						<el-icon size="20"><svg-icon name="comment" /></el-icon>
						<span>{{ albumData?.count.comment }}</span>
					</el-button>
					<el-button text type="primary" title="收藏" @click="subscribe">
						<el-icon size="20" v-if="albumData?.isSubscribed"><Check /></el-icon>
						<el-icon size="20" v-else><FolderAdd /></el-icon>
						<span>{{ albumData?.count.subscribed }}</span>
					</el-button>
				</div>
			</div>
		</div>
		<!-- 歌单歌曲 -->
		<div class="list">
			<songsTable :songs="songs" />
		</div>
	</div>

	<el-drawer v-model="descriptionVisible" :with-header="false">
		<description
			:cover-img="albumData!.cover?.url"
			:description="albumData!.description"
			:album-type="albumData!.type"
		/>
	</el-drawer>

	<el-drawer v-model="commentVisible" :with-header="false" :z-index="0">
		<comment :id="id" :type="'专辑'" />
	</el-drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { song, albumDetail } from "type/type";
import { ALBUM } from "service/api";
import JSConfetti from "js-confetti";

import singers from "components/content/singers/singers.vue";
import songsTable from "components/content/songs-table/songs-table.vue";
import description from "components/content/description/description.vue";
import comment from "components/content/comment/index.vue";

const router = useRouter();
const jsConfetti = new JSConfetti();

const id: string = router.currentRoute.value.params.id as string;
const albumData = ref<albumDetail | undefined>();
const songs = ref<song[]>([]);

onMounted(async () => {
	albumData.value = await ALBUM.getDetail(id);
	songs.value = albumData.value.songs;
});

const descriptionVisible = ref<boolean>(false);
const showDescription = () => {
	descriptionVisible.value = !descriptionVisible.value;
};

const commentVisible = ref<boolean>(false);
const showComment = () => {
	commentVisible.value = !commentVisible.value;
};

// 收藏专辑
const subscribe = async () => {
	if (albumData.value) {
		const subscribeResult = await ALBUM.subscribe(id, !albumData.value?.isSubscribed);
		// 收藏时播放动画
		if (subscribeResult && !albumData.value?.isSubscribed) {
			jsConfetti.addConfetti();
		}
		albumData.value.isSubscribed = !albumData.value.isSubscribed;
	}
};
</script>
<style scoped lang="less">
.back {
	margin: 3% 5%;
	.dataBack {
		display: flex;
		align-items: center;
		.cover {
			width: 200px;
			height: 200px;
			margin-right: 40px;
			border-radius: 7px;
		}
		.data {
			width: 50%;
			& > div {
				margin: 15px 0;
			}
			.title {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-direction: row;
				& > span:nth-child(1) {
					margin: 10px 0;
					font-weight: bolder;
					font-size: 22px;
				}
				.tag {
					margin: 0 5px;
				}
			}
			.user {
				.avatar {
					width: 30px;
					height: 30px;
					margin: auto 10px auto 5px;
					border-radius: 50%;
					vertical-align: middle;
				}
			}
			.description {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: var(--regular-text);
				&:hover {
					cursor: pointer;
					border-radius: 4px;
					background-color: #a6a9ad56;
				}
			}
			.operate {
				display: flex;
				align-items: center;
				justify-content: space-around;
				color: red;
			}
		}
	}
	.list {
		margin-top: 50px;
	}
}
</style>
