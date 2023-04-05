<template>
	<el-scrollbar>
		<div class="back">
			<h2>关注歌手</h2>
			<el-space wrap :size="50" alignment="flex-start">
				<div
					class="artist"
					v-for="item in subscribeArtists"
					@click="router.push(`/singer/${item.id}`)"
				>
					<el-image class="img" :src="item.cover" fit="cover" loading="lazy" />
					<span>{{ item.name }}</span>
					<el-icon class="del" size="20" @click.stop="changeDialogVisible(item)"
						><MoreFilled
					/></el-icon>
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
import { useRouter } from "vue-router";
import { getSubscribedArtists, subscribeArtist } from "service/api/api";
import { showErrorMessage, showSuccessMessage } from "utils/utils-content";
import { artistBriefType } from "@/interface/interface";

const router = useRouter();
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
	width: 300px;
	background-color: var(--light-fill);
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	.img {
		width: 100px;
		height: 100px;
		border-radius: 5px;
		position: relative;
	}
	& > span {
		flex-grow: 1;
		text-align: center;
	}
	.del {
		transform: rotate(90deg);
		margin: 0 5px;
		&:hover {
			color: var(--theme-color);
		}
	}
	&:hover {
		background-color: var(--dark-fill);
	}
}

.dialog {
	color: var(--regular-text);
	& > p > span {
		color: var(--theme-color);
	}
}
</style>
