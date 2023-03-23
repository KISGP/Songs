<template>
	<el-scrollbar>
		<div
			class="back"
			v-infinite-scroll="load"
			:infinite-scroll-immediate="false"
			:infinite-scroll-delay="1000"
		>
			<div class="head">
				<h2>我的专辑</h2>
				<span><i>含收藏及购买专辑</i></span>
			</div>
			<el-space wrap :size="50" alignment="flex-start">
				<div class="card" v-for="item in myAlbums.albums" :key="item.id">
					<albumCard @click="to(item.id)">
						<el-image class="img" :src="item.cover" fit="cover" loading="lazy" />
					</albumCard>
					<span class="name" :title="item.name">{{ item.name }}</span>
					<span class="artist" :title="item.artists.artistsStr">{{ item.artists.artistsStr }}</span>
				</div>
			</el-space>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSubscribedAlbum } from "service/api/api";
import { albumBriefType } from "@/interface/interface";
import albumCard from "@/components/common/card-3D/card-3D.vue";
const router = useRouter();

const myAlbums: Ref<{
	albumCount: number;
	albums: Array<albumBriefType>;
}> = ref({
	albumCount: 0,
	albums: [],
});
const nowAlbumCount: Ref<number> = ref(0);
onMounted(async () => {
	myAlbums.value = await getSubscribedAlbum(21, 0);
	nowAlbumCount.value += 21;
});

const to = (id: number | string) => {
	router.push(`/album/${id}`);
};

const limit: number = 10;
const load = async () => {
	if (nowAlbumCount.value < myAlbums.value.albumCount) {
		if (nowAlbumCount.value + limit <= myAlbums.value.albumCount) {
			const { albums } = await getSubscribedAlbum(limit, nowAlbumCount.value);
			myAlbums.value.albums = myAlbums.value.albums.concat(albums);
			nowAlbumCount.value += limit;
		} else {
			const { albums } = await getSubscribedAlbum(
				myAlbums.value.albumCount - nowAlbumCount.value,
				nowAlbumCount.value
			);
			myAlbums.value.albums = myAlbums.value.albums.concat(albums);
			nowAlbumCount.value += myAlbums.value.albumCount - nowAlbumCount.value;
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
			font-size: 12px;
			color: var(--secondary-text);
		}
	}
}
.card {
	width: 180px;
	height: 230px;
	box-shadow: 2px 2px 50px rgba(0, 0, 0, 0.2);
	border-radius: 7px;
	background-color: var(--album-card-bg-color);
	&:hover {
		background-color: var(--base-fill);
	}
	.img {
		cursor: pointer;
		margin-top: -10px;
		margin-left: -10px;
		border-radius: 7px;
	}
	& > span {
		display: block;
		margin: 10px 5%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.name {
		font-size: 18px;
	}
	.artist {
		font-size: 12px;
		color: var(--regular-text);
	}
}
</style>
