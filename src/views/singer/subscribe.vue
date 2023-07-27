<template>
	<div class="back">
		<h2>关注歌手</h2>
		<el-space wrap :size="50" alignment="flex-start">
			<div class="artist" v-for="item in subscribeArtists">
				<singer-card style="border-right: 1px solid rgba(60, 60, 60, 0.6)" :data="item" />
				<el-icon class="del" size="20" @click.stop="changeDialogVisible(item)">
					<MoreFilled />
				</el-icon>
			</div>
		</el-space>
	</div>
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
import { SINGER } from "service/api";
import { message } from "utils/notice";
import { singer } from "type/type";
import singerCard from "components/content/singer-card/singer-card.vue";

const subscribeArtists = ref<singer[]>();
onMounted(async () => {
	subscribeArtists.value = await SINGER.getSubscribedSinger();
});

const checkArtist = ref<singer>();
const dialogVisible = ref<boolean>(false);
const changeDialogVisible = (artist: singer) => {
	dialogVisible.value = !dialogVisible.value;
	checkArtist.value = artist;
};
const delArtist = async () => {
	if (await SINGER.subscribe(checkArtist.value?.id!, false)) {
		subscribeArtists.value?.splice(subscribeArtists.value.indexOf(checkArtist.value!), 1);
		message({
			message: "取消关注成功",
			type: "success",
		});
		dialogVisible.value = !dialogVisible.value;
	} else {
		message({
			message: "取消关注失败",
			type: "error",
		});
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
