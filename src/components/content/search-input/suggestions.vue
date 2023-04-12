<template>
	<div class="back">
		<el-scrollbar height="400px">
			<template v-if="suggestions?.albums">
				<el-divider content-position="left">专辑</el-divider>
				<div
					class="suggestion-item"
					v-for="item in suggestions!.albums"
					@click="router.push(`/album/${item.id}`)"
				>
					<span :title="item.name">{{ item.name }}</span>
					<span :title="item.artistStr">{{ item.artistStr }}</span>
				</div>
			</template>
			<template v-if="suggestions?.artists">
				<el-divider content-position="left">歌手</el-divider>
				<div
					class="suggestion-item"
					v-for="item in suggestions!.artists"
					@click="router.push(`/singer/${item.id}`)"
				>
					<span :title="item.name">{{ item.name }}</span>
				</div>
			</template>
			<template v-if="suggestions?.songs">
				<el-divider content-position="left">歌曲</el-divider>
				<div
					class="suggestion-item"
					v-for="item in suggestions!.songs"
					@click="playSong(item.id)"
				>
					<span :title="item.name">{{ item.name }}</span>
					<span :title="item.artistStr">{{ item.artistStr }}</span>
				</div>
			</template>
			<template v-if="suggestions?.list">
				<el-divider content-position="left">歌单</el-divider>
				<div
					class="suggestion-item"
					v-for="item in suggestions!.list"
					@click="router.push(`/list/${item.id}`)"
				>
					<span :title="item.name">{{ item.name }}</span>
				</div>
			</template>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { ref, PropType } from "vue";
import { useRouter } from "vue-router";
import { useSongStore } from "store/index";
import { suggestionsType, songDetailedType } from "@/interface/interface";
import { getSongsDetail } from "service/api/api";
const router = useRouter();

const props = defineProps({
	suggestions: Object as PropType<suggestionsType>,
});

const playSong = async (id: number) => {
	const r: Array<songDetailedType> = await getSongsDetail([id]);
	useSongStore().update_song(r[0]);
};
</script>
<style scoped lang="less">
@import "../../../assets/style/common.less";
.back {
	.position-centerX();
	width: 32%;
	top: 4vh;
	z-index: 10;
	padding: 10px;
	background-color: var(--suggestion-bg-color);
	border-radius: 6px;
	box-shadow: var(--el-box-shadow-lighter);
	font-size: 0.9rem;
	.suggestion-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2px 15px;
		& > span {
			width: 50%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		& > span:nth-child(2) {
			text-align: right;
		}
		&:hover {
			cursor: pointer;
			background-color: var(--darker-fill);
			border-radius: 6px;
		}
	}
}
</style>
