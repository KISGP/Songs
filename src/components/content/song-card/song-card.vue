<template>
	<div class="back">
		<div class="cover">
			<el-image :src="src" fit="cover" lazy />
		</div>
		<div class="message">
			<div class="title">{{ SongStore.song.song.name }}</div>
			<div class="alias" v-if="SongStore.song.song.alia">
				<span v-for="item in SongStore.song.song.alia">{{ item }}</span>
			</div>
			<div class="artists">
				<el-icon class="icon"><User /></el-icon>
				<artists :artists="SongStore.song.artists.artists" />
			</div>
			<div class="album" @click="to(`/album/${SongStore.song.song.id}`)">
				<el-icon class="icon"><svg-icon name="album" /></el-icon>
				<span> {{ SongStore.song.album.name }}</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSongStore } from "store/index";

import artists from "../artists/artists.vue";
const router = useRouter();
const SongStore = useSongStore();

let temp = SongStore.song.song.cover.split("?");
temp[1] = temp[1].replaceAll(SongStore.song.song.coverSize.toString(), "270");
const src = temp.join("?");

const to = (path: string) => {
	router.push(path);
};
</script>
<style scoped lang="less">
.back {
	margin: 5px 0;
	padding-left: 5%;
	width: 30%;
	min-width: 270px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	position: relative;
	overflow: hidden;
	.hidden {
		overflow: hidden;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		color: var(--regular-text);
	}
	.cover {
		width: 270px;
		height: 270px;
		border-radius: 7px;
		overflow: hidden;
	}
	.message {
		color: var(--primary-text);
		.title {
			font-size: 38px;
			padding: 12px 0;
		}
		.alias {
			font-size: 22px;
			padding: 12px 5px;
			color: var(--regular-text);
		}
		.artists,
		.album {
			font-size: 14px;
			padding: 5px 0;
			display: flex;
			align-items: center;
			color: var(--secondary-text);
			.icon {
				margin: 0 5px;
			}
			&:hover > .icon {
				cursor: pointer;
				color: var(--theme-color);
			}
		}
		.album:hover {
			cursor: pointer;
			color: var(--theme-color);
		}
	}
}
</style>
