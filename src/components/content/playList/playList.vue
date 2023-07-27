<template>
	<el-table :data="props.songs" :row-style="{ height: '50px' }" @row-click="playSong">
		<el-table-column type="index" :label="`${props.songs?.length}首`" width="80" />
		<el-table-column label="歌曲标题">
			<template #default="scope">
				<span>{{ scope.row.song.name }}</span>
			</template>
		</el-table-column>
		<el-table-column label="歌手">
			<template #default="scope">
				<span>{{ scope.row.artists.artistsStr }}</span>
			</template>
		</el-table-column>
		<el-table-column>
			<template #header>
				<el-button size="small" @click.stop="deleteList">删除该列表</el-button>
			</template>
			<template #default="scope">
				<div class="operate">
					<el-button size="small" @click.stop="deleteOneSong(scope.row)">删除</el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts">
import { useSongStore, useDataStore } from "store/index";
import { song } from "type/type";
const SongStore = useSongStore();
const DataStore = useDataStore();

const props = defineProps<{
	songs: song[] | null;
}>();

const playSong = async (row: any): Promise<void> => {
	SongStore.play(row);
};

const deleteOneSong = (songData: song) => {
	DataStore.update_playList((playList) => {
		playList = playList.splice(playList.indexOf(songData), 1);
	});
};
const deleteList = () => {
	DataStore.update_playList((playList) => {
		playList = playList.splice(0, playList.length);
	});
};
</script>
<style scoped lang="less">
.album,
.operate {
	cursor: pointer;
	&:hover {
		color: var(--theme-color);
	}
}

.operate {
	display: none;
}
.el-table__body tr:hover > td .operate {
	display: block;
}
</style>
