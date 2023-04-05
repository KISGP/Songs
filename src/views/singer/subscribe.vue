<template>
	<el-scrollbar>
		<div class="back">
			<h2>关注歌手</h2>
			<el-space wrap :size="50" alignment="flex-start">
				<div class="artist" v-for="item in subscribeArtists">
					<artist-card style="border-right: 1px solid rgba(60, 60, 60, 0.6);" :data="item"></artist-card>
					<el-icon class="del" size="20" @click.stop="changeDialogVisible(item)">
						<MoreFilled />
					</el-icon>
				</div>
			</el-space>
		</div>
	</el-scrollbar>
	<el-dialog v-model="dialogVisible" title="取消关注" width="30%">
		<div class="dialog">
			<p>取消关注后对方将从你的关注列表移除</p>
			<p>
				是否取消关注&nbsp;<span>{{ checkArtist?.name }}</span>
			</p>
		</div>
		<template #footer>
			<el-button text @click="delArtist">确认</el-button>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getSubscribedArtists, subscribeArtist } from "service/api/api";
import { showErrorMessage, showSuccessMessage } from "utils/utils-content";
import { artistBriefType } from "@/interface/interface";
import artistCard from "@/components/content/artist-card/artist-card.vue";

const subscribeArtists = ref<artistBriefType[]>();
onMounted(async () => {
	subscribeArtists.value = await getSubscribedArtists();
});

const checkArtist = ref<artistBriefType>();
const dialogVisible = ref<boolean>(false);
const changeDialogVisible = (artist: artistBriefType) => {
	dialogVisible.value = !dialogVisible.value;
	checkArtist.value = artist;
};
const delArtist = async () => {
	if (await subscribeArtist(checkArtist.value?.id!, false)) {
		subscribeArtists.value?.splice(subscribeArtists.value.indexOf(checkArtist.value!), 1);
		showSuccessMessage("取消关注成功");
		dialogVisible.value = !dialogVisible.value;
	} else {
		showErrorMessage("取消关注失败");
	}
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
}
.artist {
	background-color: var(--light-fill);
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	.del-back {
		border-top: 1px solid var(--el-border-color);
	}
	.del {
		transform: rotate(90deg);
		margin: 0 5px;
		&:hover {
			color: var(--theme-color);
		}
	}
}

.dialog {
	color: var(--regular-text);
	& > p > span {
		color: var(--theme-color);
	}
}
</style>
