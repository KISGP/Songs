<template>
	<div class="suggestions">
		<el-scrollbar max-height="50vh" v-if="suggestions">
			<template v-if="suggestions.songs">
				<div class="suggestion">
					<span class="head">单曲:</span>
					<div
						class="content"
						v-for="item in suggestions.songs"
						:key="item.id"
						@click="SongStore.play(item)"
					>
						<span class="left" :title="item.name">{{ item.name }}</span>
						<span class="right" :title="item.singerNameStr">{{ item.singerNameStr }}</span>
					</div>
				</div>
			</template>
			<template v-if="suggestions.albums">
				<div class="suggestion">
					<span class="head">专辑:</span>
					<div
						class="content"
						v-for="item in suggestions.albums"
						:key="item.id"
						@click="router.push(`/album/${item.id}`)"
					>
						<span class="left" :title="item.name">{{ item.name }}</span>
						<span class="right" :title="item.singerNameStr">{{ item.singerNameStr }}</span>
					</div>
				</div>
			</template>
			<template v-if="suggestions.list">
				<div class="suggestion">
					<span class="head">歌单:</span>
					<div
						class="content"
						v-for="item in suggestions.list"
						:key="item.id"
						@click="router.push(`/list/${item.id}`)"
					>
						<span class="name" :title="item.name">{{ item.name }}</span>
					</div>
				</div>
			</template>
			<template v-if="suggestions.singers">
				<div class="suggestion">
					<span class="head">歌手:</span>
					<div
						class="content"
						v-for="item in suggestions.singers"
						:key="item.id"
						@click="router.push(`/singer/${item.id}`)"
					>
						<span class="name" :title="item.name">{{ item.name }}</span>
					</div>
				</div>
			</template>
		</el-scrollbar>
		<div class="no" v-else>
			<p>暂无搜索结果</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import { suggestions as suggestionsType } from "type/type";
import { useRouter } from "vue-router";
import { useSongStore } from "store/index";
const props = defineProps<{
	suggestions?: suggestionsType;
}>();
const router = useRouter();
const SongStore = useSongStore();
</script>
<style scoped lang="less">
.suggestions {
	position: absolute;
	top: 5vh;
	margin: 3px 0;
	z-index: 10;
	width: 100%;
	border-radius: 5px;
	border: 1px solid var(--lighter-border);
	box-shadow: var(--el-box-shadow);
	background-color: var(--light-fill);
	padding: 3px 0;
}

.suggestion {
	margin: 0 10px;
	border-top: 1px solid var(--light-border);
	.head {
		display: inline-block;
		margin: 0 5px;
		padding: 5px 0 3px 0;
		color: var(--primary-text);
	}
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		margin: 2px 5px;
		padding: 1px 10px;
		height: 30px;
		border-radius: 5px;
		&:hover {
			background-color: var(--dark-fill);
		}
		span {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			&.left {
				width: 65%;
				font-size: 16px;
				color: var(--regular-text);
			}
			&.right {
				width: 35%;
				font-size: 14px;
				color: var(--disabled-text);
			}
			&.name {
				width: 100%;
				font-size: 16px;
				color: var(--regular-text);
			}
		}
	}
}

.no {
	text-align: center;
	color: var(--disabled-text);
}
</style>
