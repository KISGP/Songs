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
		<el-table-column type="index" :label="props.songsCount + '首'" width="80" />
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
					<el-button size="small" @click.stop="playAll">播放全部</el-button>
				</slot>
			</template>
			<template #default="scope">
				<slot name="scope">
					<el-icon
						title="添加到播放列表"
						size="25"
						class="operate"
						@click.stop="add2List(scope.row, true)"
					>
						<svg-icon name="add2List" />
					</el-icon>
				</slot>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { useSongStore } from "store/index";
import { songDetailedType } from "@/interface/interface";
import { showSuccessMessage } from "utils/utils-el";
import artists from "../artists/artists.vue";
const store = useSongStore();
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

// 播放歌曲
const playSong = async (row: songDetailedType): Promise<void> => {
	store.update_song(row);
	add2List(row, false);
};

// 播放所有歌曲（添加到播放列表）
const playAll = () => {
	store.update_playList((playList) => {
		props.songs.forEach((song) => {
			playList.push(song);
		});
	});
	store.update_song(props.songs[0]);
	showSuccessMessage(`已添加到播放列表`);
};
// 添加到播放列表
const add2List = (songData: songDetailedType, feedback?: boolean) => {
	store.update_playList((playList) => {
		if (playList.indexOf(songData) < 0) {
			playList.push(songData);
			feedback && showSuccessMessage(`[ ${songData.song.name} ]已添加到播放列表`);
		}
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

.album {
	&:hover {
		cursor: pointer;
		color: var(--theme-color);
	}
}
</style>
