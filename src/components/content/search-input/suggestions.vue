<template>
	<div class="back">
		<el-scrollbar>
			<template v-if="suggestions?.albums">
				<el-divider content-position="left">专辑</el-divider>
				<div
					class="suggestion-item"
					v-for="(item, index) in suggestions!.albums"
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
					v-for="(item, index) in suggestions!.artists"
					@click="router.push(`/singer/${item.id}`)"
				>
					<span :title="item.name">{{ item.name }}</span>
				</div>
			</template>
			<template v-if="suggestions?.songs">
				<el-divider content-position="left">歌曲</el-divider>
				<div class="suggestion-item" v-for="(item, index) in suggestions!.songs" @click="playSong">
					<span :title="item.name">{{ strSlice(item.name, 10) }}</span>
					<span :title="item.artistStr">{{ strSlice(item.artistStr) }}</span>
				</div>
			</template>
			<template v-if="suggestions?.list">
				<el-divider content-position="left">歌单</el-divider>
				<div
					class="suggestion-item"
					v-for="(item, index) in suggestions!.list"
					@click="router.push(`/list/${item.id}`)"
				>
					<span :title="item.name">{{ item.name }}</span>
				</div>
			</template>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { ref, Ref, PropType } from "vue";
import { useRouter } from "vue-router";
import { suggestionsType } from "@/interface/interface";
const router = useRouter();

const props = defineProps({
	suggestions: Object as PropType<suggestionsType>,
});

const strSlice = (str: string, length: number = 15): string => {
	return str.length > length ? `${str.slice(0, length)}...` : str;
};

const playSong = () => {};
</script>
<style scoped lang="less">
@import "../../../assets/style/common.less";
.back {
	.position-centerX();
	width: 32%;
	height: 400px;
	top: 4vh;
	z-index: 10;
	padding: 10px;
	background-color: #ffff;
	border-radius: 6px;
	box-shadow: var(--el-box-shadow-lighter);
	.suggestion-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 15px;
		&:hover {
			cursor: pointer;
			background-color: #e7e6e6;
			border-radius: 6px;
		}
	}
}
</style>
