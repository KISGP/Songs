<template>
	<div class="back" ref="Div" v-if="DataStore.myCreatedList.length > 0">
		<el-scrollbar height="300px">
			<h5 style="margin-left: 10px">添加到歌单</h5>
			<div
				class="list"
				v-for="(item, index) in DataStore.myCreatedList"
				title="添加到该歌单"
				@click="add(index)"
			>
				<el-image class="img" style="width: 60px; height: 60px" :src="item.cover" fit="cover" />
				<span>{{ item.name }}</span>
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useSongStore, useDataStore } from "store/index";
import { updateList } from "service/api/api";
import { showSuccessMessage } from "utils/utils-content";

const SongStore = useSongStore();
const DataStore = useDataStore();
const emits = defineEmits(["add"]);
const props = defineProps({
	left: String as PropType<string>,
});
const add = async (index: number) => {
	if (
		SongStore.song?.song.id &&
		(await updateList("add", DataStore.myCreatedList[index].id, [SongStore.song.song.id]))
	) {
		showSuccessMessage(`${SongStore.song.song.name}已添加到${DataStore.myCreatedList[index].name}`);
		emits("add");
	}
	if (index === 0) {
		DataStore.reload_likedSongsID();
	}
};
</script>
<style scoped lang="less">
@import "../../../assets/style/common.less";
.back {
	height: 300px;
	background-color: var(--light-fill);
	border-radius: 6px;
	box-shadow: var(--el-box-shadow-lighter);
	position: fixed;
	bottom: calc(var(--height-player) + 10px);
	left: v-bind(left);
	transition: height 0.5s ease;
	overflow: hidden;
	.list {
		width: 250px;
		height: 60px;
		margin: 10px 10px;
		display: flex;
		align-items: center;
		color: var(--regular-text);
		cursor: pointer;
		.img {
			border-radius: 7px;
		}
		& > span {
			margin: 0 5px;
		}
		&:hover {
			color: var(--theme-color);
			background-color: var(--dark-fill);
		}
	}
}
</style>
