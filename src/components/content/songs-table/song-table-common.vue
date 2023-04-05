<template>
	<el-table
		:data="props.songs"
		:style="{ width: props.tableWidth }"
		:row-style="{ height: '50px' }"
		:lazy="false"
		@row-click="playSong"
		row-class-name="table-row"
		header-row-class-name="table-header"
	>
		<el-table-column type="index" :label="length + '首'" width="80" />
		<el-table-column label="歌曲标题">
			<template #default="scope">
				<span>{{ scope.row.song.name }}</span>
				<span v-for="item in scope.row.song.alia"> ({{ item }}) </span>
			</template>
		</el-table-column>
		<el-table-column label="歌手">
			<template #default="scope">
				<artists :artists="scope.row.artists.artists" />
			</template>
		</el-table-column>
		<el-table-column label="专辑">
			<template #default="scope">
				<span class="album" @click.stop="router.push(`/album/${scope.row.album.id}`)">{{
					scope.row.album.name
				}}</span>
			</template>
		</el-table-column>
		<el-table-column>
			<template #header>
				<slot name="header">
					<el-button size="small" @click.stop="playAll(songs)">播放全部</el-button>
				</slot>
			</template>
			<template #default="scope">
				<div class="operate-back">
					<el-icon
						title="添加到播放列表"
						size="25"
						class="operate"
						@click.stop="add2List(scope.row, true)"
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
import { PropType, computed } from "vue";
import { useRouter } from "vue-router";
import { songDetailedType } from "@/interface/interface";
import { add2List, playAll, playSong } from "./song-table";
import artists from "../artists/artists.vue";
const router = useRouter();

const props = defineProps({
	songs: {
		type: Array as PropType<Array<songDetailedType>>,
		required: true,
	},
	songsCount: {
		type: Number as PropType<number>,
		default: 0,
	},
	tableWidth: {
		type: String,
		default: "100%",
	},
});

const length = computed(() => {
	if (props.songs) {
		return props.songs.length;
	} else {
		return 0;
	}
});
</script>
<style scoped lang="less" src="./song-table.less"></style>
