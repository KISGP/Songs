<template>
	<div class="back" v-infinite-scroll="load" :infinite-scroll-immediate="false">
		<!-- 歌单数据 -->
		<div class="dataBack">
			<el-image class="cover" :src="listData?.cover?.url" fit="cover" loading="lazy" />
			<div class="data">
				<!-- 歌单名称 -->
				<div class="title">
					<span class="_ellipsis">{{ listData?.name }}</span>
					<el-tag
						class="tag"
						:hit="true"
						type="info"
						size="small"
						color="var(--darker-fill)"
						v-for="item in listData?.tags"
					>
						{{ item }}
					</el-tag>
				</div>
				<!-- 歌单作者 -->
				<div class="user">
					<el-image :src="listData?.user.cover?.url" class="avatar" />
					<span>{{ listData?.user.name }}</span>
				</div>
				<!-- 歌单简介 -->
				<div v-if="listData?.description" class="description _ellipsis" @click="showDescription">
					<span>{{ listData.description }}</span>
				</div>
				<!-- 按钮 -->
				<div class="operate">
					<el-button text type="primary" title="分享">
						<el-icon size="20"><Share /></el-icon>
						<span>{{ listData?.count.share }}</span>
					</el-button>
					<el-button text type="primary" title="显示评论" @click="showComment">
						<el-icon size="20"><svg-icon name="comment" /></el-icon>
						<span>{{ listData?.count.comment }}</span>
					</el-button>
					<el-button text type="primary" title="收藏">
						<el-icon size="20" v-if="listData?.isSubscribed"><Check /></el-icon>
						<el-icon size="20" v-else><FolderAdd /></el-icon>
						<span>{{ listData?.count.subscribed }}</span>
					</el-button>
				</div>
			</div>
		</div>
		<!-- 歌单歌曲 -->
		<div class="list">
			<songs-table :songs="songs" :count="listData?.count.song" />
		</div>
	</div>

	<el-drawer v-model="descriptionVisible" :with-header="false">
		<description
			:coverImg="listData?.cover?.url"
			:description="listData?.description"
			:tags="listData?.tags"
		/>
	</el-drawer>
	<el-drawer v-model="commentVisible" :with-header="false">
		<comment :id="id" :type="'歌单'" />
	</el-drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { LIST } from "service/api";
import { listDetail, song } from "type/type";

import songsTable from "components/content/songs-table/songs-table.vue";
import description from "components/content/description/description.vue";
import comment from "components/content/comment/index.vue";

const router = useRouter();

const id: string = router.currentRoute.value.params.id as string;
const listData = ref<listDetail>();
const songs = ref<song[]>([]);
let nowSongsCount = 0;
onMounted(async () => {
	listData.value = await LIST.getDetail(id);
	songs.value = await LIST.getPartSongs(id, 20);
	nowSongsCount += 20;
});

const limit: number = 30;
async function load() {
	if (listData.value && nowSongsCount < listData.value.count.song) {
		if (nowSongsCount + limit <= listData.value.count.song) {
			songs.value = songs.value.concat(await LIST.getPartSongs(id, limit, nowSongsCount));
			nowSongsCount += limit;
		} else {
			songs.value = songs.value.concat(
				await LIST.getPartSongs(id, listData.value.count.song - nowSongsCount, nowSongsCount)
			);
			nowSongsCount += listData.value.count.song - nowSongsCount;
		}
	}
}

const descriptionVisible = ref<boolean>(false);
function showDescription() {
	descriptionVisible.value = !descriptionVisible.value;
}
const commentVisible = ref<boolean>(false);
function showComment() {
	commentVisible.value = !commentVisible.value;
}
</script>
<style scoped lang="less">
@w: 200px;
@h: 200px;
.back {
	margin: 3% 5%;
	.dataBack {
		display: flex;
		align-items: center;
		width: 100%;
		.cover {
			width: @w;
			height: @h;
			min-width: @w;
			min-height: @h;
			margin-right: 2%;
			border-radius: 7px;
			box-shadow: var(--el-box-shadow);
		}
		.data {
			height: @h;
			width: calc(100% - @w);
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.title {
				display: flex;
				align-items: flex-end;
				& > span:nth-child(1) {
					color: var(--primary-text);
					font-weight: bolder;
					font-size: 22px;
					margin-right: 1%;
				}
				.tag {
					margin: 0 1%;
				}
				.el-tag {
					border: none;
				}
			}
			.user {
				font-size: 14px;
				color: var(--regular-text);
				.avatar {
					width: 30px;
					height: 30px;
					margin: auto 1%;
					border-radius: 50%;
					vertical-align: middle;
					box-shadow: var(--el-box-shadow);
				}
			}
			.description {
				width: 50%;
				padding: 5px;
				font-size: 16px;
				color: var(--secondary-text);
				&:hover {
					cursor: pointer;
					border-radius: 5px;
					background-color: var(--lighter-fill);
				}
			}
			.operate {
				display: flex;
				align-items: center;
			}
		}
	}
	.list {
		margin-top: 5%;
	}
}
</style>
