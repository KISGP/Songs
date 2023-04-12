<template>
	<div
		class="back"
		v-infinite-scroll="load"
		:infinite-scroll-immediate="false"
		:infinite-scroll-delay="1000"
	>
		<h2>热门歌手</h2>
		<el-space wrap :size="50" alignment="flex-start">
			<artist-card v-for="(item, index) in hot" :key="item.id" :data="item" :top="index" />
		</el-space>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHotArtist } from "service/api/api";
import { artistBriefType } from "@/interface/interface";
import artistCard from "@/components/content/artist-card/artist-card.vue";

const hot = ref<artistBriefType[]>([]);
const count = ref<number>(0);
let isMore: boolean = true;
onMounted(async () => {
	const { artists, more } = await getHotArtist();
	hot.value = artists;
	count.value = hot.value.length;
	isMore = more;
});

const load = async () => {
	if (isMore) {
		const { artists, more } = await getHotArtist(count.value);
		hot.value = hot.value.concat(artists);
		count.value = hot.value.length;
		isMore = more;
	}
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
}
</style>
