<template>
	<div
		class="back"
		v-infinite-scroll="load"
		:infinite-scroll-immediate="false"
		:infinite-scroll-delay="1000"
	>
		<div class="head">
			<h2>我的专辑</h2>
			<span
				><i>含收藏及购买专辑共 {{ myAlbums.albumCount }} 张</i></span
			>
		</div>
		<albumGroup class="content" :data="myAlbums.albums" />
	</div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { ALBUM } from "service/api";
import { album } from "type/type";
import albumGroup from "components/content/album-group/album-group.vue";

const myAlbums: Ref<{
	albumCount: number;
	albums: album[];
}> = ref({
	albumCount: 0,
	albums: [],
});
onMounted(async () => {
	myAlbums.value = await ALBUM.getSubscribed(21, 0);
});

const limit: number = 10;
const load = async () => {
	if (myAlbums.value.albums.length < myAlbums.value.albumCount) {
		if (myAlbums.value.albums.length + limit <= myAlbums.value.albumCount) {
			const { albums } = await ALBUM.getSubscribed(limit, myAlbums.value.albums.length);
			myAlbums.value.albums = myAlbums.value.albums.concat(albums);
			myAlbums.value.albums.length += limit;
		} else {
			const { albums } = await ALBUM.getSubscribed(
				myAlbums.value.albumCount - myAlbums.value.albums.length,
				myAlbums.value.albums.length
			);
			myAlbums.value.albums = myAlbums.value.albums.concat(albums);
			myAlbums.value.albums.length += myAlbums.value.albumCount - myAlbums.value.albums.length;
		}
	}
};
</script>
<style scoped lang="less">
.back {
	margin: 3% 5%;
	.head {
		margin: 25px auto;
		& > h2 {
			display: inline-block;
		}
		& > span {
			margin: 0 10px;
			font-size: 0.75rem;
			color: var(--secondary-text);
		}
	}
	.content {
		margin-left: 3%;
	}
}
</style>
