<template>
	<el-scrollbar ref="eScroll">
		<div class="back" v-infinite-scroll="load" :infinite-scroll-immediate="false">
			<!-- 歌单数据 -->
			<div class="dataBack">
				<el-image class="cover" :src="listData?.list.cover" fit="cover" loading="lazy" />
				<div class="data">
					<!-- 歌单名称 -->
					<div class="title">
						<span>{{ listData?.list.name }}</span>
						<el-tag class="tag" v-for="item in listData?.list.tags" size="small" round>
							{{ item }}
						</el-tag>
					</div>
					<!-- 歌单作者 -->
					<div class="user">
						<el-image :src="listData?.user.cover" class="avatar" />
						<span>{{ listData?.user.name }}</span>
					</div>
					<!-- 歌单简介 -->
					<div class="description" @click="showDescription">
						<span>{{ listData?.list.description }}</span>
					</div>
					<!-- 按钮 -->
					<div class="operate">
						<el-button text type="primary" title="分享">
							<el-icon size="20"><Share /></el-icon>
							<span>{{ listData?.count.shareCount }}</span>
						</el-button>
						<el-button text type="primary" title="显示评论" @click="showComment">
							<el-icon size="20"><svg-icon name="comment" /></el-icon>
							<span>{{ listData?.count.commentCount }}</span>
						</el-button>
						<el-button text type="primary" title="收藏">
							<el-icon size="20" v-if="listData?.list.subscribed"><Check /></el-icon>
							<el-icon size="20" v-else><FolderAdd /></el-icon>
							<span>{{ listData?.count.subscribedCount }}</span>
						</el-button>
					</div>
				</div>
			</div>
			<!-- 歌单歌曲 -->
			<div class="list">
				<songsTable
					:songs="songs"
					:songs-count="listData?.count.songCount"
					@vnode-before-update="beforeUpdate"
					@vnode-updated="update"
				/>
			</div>
		</div>
	</el-scrollbar>

	<el-drawer v-model="descriptionVisible" :with-header="false">
		<description
			:coverImg="listData!.list.cover"
			:description="listData!.list.description"
			:tags="listData!.list.tags"
		/>
	</el-drawer>
	<el-drawer v-model="commentVisible" :with-header="false">
		<comment :id="id" :type="'歌单'" />
	</el-drawer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ElScrollbar } from "element-plus";
import { useRouter } from "vue-router";
import { listDetailedType, songDetailedType } from "@/interface/interface";
import { getDetailedList, getListAllSong } from "service/api/api";
import songsTable from "components/content/songs-table/index.vue";
import description from "@/components/content/description/description.vue";
import comment from "@/components/content/comment/index.vue";

const router = useRouter();

const id: string = router.currentRoute.value.params.id as string;
const listData = ref<listDetailedType | undefined>();
const songs = ref<Array<songDetailedType>>([]);
let nowSongsCount = 0;
onMounted(async () => {
	listData.value = await getDetailedList(id);
	songs.value = await getListAllSong(id, 20);
	nowSongsCount += 20;
});

const eScroll = ref<InstanceType<typeof ElScrollbar> | null>(null);
const limit: number = 30;
const load = async () => {
	if (listData.value && nowSongsCount < listData.value.count.songCount) {
		if (nowSongsCount + limit <= listData.value.count.songCount) {
			songs.value = songs.value.concat(await getListAllSong(id, limit, nowSongsCount));
			nowSongsCount += limit;
		} else {
			songs.value = songs.value.concat(
				await getListAllSong(id, listData.value.count.songCount - nowSongsCount, nowSongsCount)
			);
			nowSongsCount += listData.value.count.songCount - nowSongsCount;
		}
	}
};

// 解决el-table无限滚动下滚动条自动置地带来的无限加载数据问题
let scrollTop = 0;
const beforeUpdate = () => {
	if (eScroll.value) {
		scrollTop = eScroll.value.wrapRef!.scrollTop;
	}
};
const update = () => {
	eScroll.value?.scrollTo({
		top: scrollTop,
		behavior: "instant",
	});
};

const descriptionVisible = ref<boolean>(false);
const showDescription = () => {
	descriptionVisible.value = !descriptionVisible.value;
};
const commentVisible = ref<boolean>(false);
const showComment = () => {
	commentVisible.value = !commentVisible.value;
};
</script>
<style scoped lang="less" src="assets/style/detailedPage.less"></style>
