<template>
	<el-table
		:data="props.songs"
		:row-style="{ height: '50px' }"
		:lazy="true"
		@row-click="playSong"
		row-class-name="table-row"
		header-row-class-name="table-header"
	>
		<el-table-column type="index" :label="(count || songs.length) + '首'" width="80" />
		<el-table-column v-if="showTitle" label="歌曲">
			<template #default="scope">
				<span :title="scope.row.name">{{ scope.row.name }}</span>
				<span v-for="item in scope.row.alias" :key="item"> ({{ item }}) </span>
			</template>
		</el-table-column>
		<el-table-column v-if="showSingers" label="歌手">
			<template #default="scope">
				<singers :singers="scope.row.singers.singers" />
			</template>
		</el-table-column>
		<el-table-column v-if="showAlbum" label="专辑">
			<template #default="scope">
				<span class="album" @click.stop="router.push(`/album/${scope.row.album.id}`)">
					{{ scope.row.album.name }}
				</span>
			</template>
		</el-table-column>
		<el-table-column v-if="showOperation">
			<template #header> </template>
			<template #default="scope">
				<div class="operate-back">
					<el-icon
						title="添加到播放列表"
						size="25"
						class="operate"
						@click.stop="add2List(scope.row)"
					>
						<svg-icon name="add2List" />
					</el-icon>
					<slot name="operate"> </slot>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { song } from "type/type";
import { message } from "utils/notice";
import singers from "../singers/singers.vue";
import { useDataStore, useSongStore } from "store/index";

const router = useRouter();
const DataStore = useDataStore();
const SongStore = useSongStore();

const props = withDefaults(
	defineProps<{
		songs: song[];
		count?: number | string;
		showTitle?: boolean;
		showSingers?: boolean;
		showAlbum?: boolean;
		showOperation?: boolean;
	}>(),
	{
		showTitle: true,
		showSingers: true,
		showAlbum: true,
		showOperation: true,
	}
);

/**
 * @description 点击表格播放+添加到播放列表
 * */
function playSong(row: song) {
	console.log(123);
	SongStore.play(row);
	DataStore.push_playList(row);
}
/**
 * @description 添加到播放列表
 * */
function add2List(song: song) {
	DataStore.push_playList(song);
	message({
		message: `${song.name} 已添加到播放列表`,
		type: "success",
		duration: 800,
	});
}
</script>
<style scoped lang="less">
.album,
.operate {
	cursor: pointer;
	&:hover {
		color: var(--theme-color);
	}
}
.operate-back {
	display: flex;
	align-items: center;
}
.operate {
	display: none;
}
.el-table__body tr:hover > td .operate {
	display: block;
}

.album {
	&:hover {
		cursor: pointer;
		color: var(--theme-color);
	}
}
</style>
