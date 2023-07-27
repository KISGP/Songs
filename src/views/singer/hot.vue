<template>
	<div
		class="back"
		v-infinite-scroll="load"
		:infinite-scroll-immediate="false"
		:infinite-scroll-delay="1000"
	>
		<h2>热门歌手</h2>
		<el-space wrap :size="50" alignment="flex-start">
			<singer-card v-for="(item, index) in hot" :key="item.id" :data="item" :top="index" />
		</el-space>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SINGER } from "service/api";
import { singer } from "type/type";
import singerCard from "components/content/singer-card/singer-card.vue";

const hot = ref<singer[]>([]);
const count = ref<number>(0);
let isMore: boolean = true;

onMounted(async () => {
	const { artists, more } = await SINGER.getHot();
	hot.value = artists;
	count.value = hot.value.length;
	isMore = more;
});

const load = async () => {
	if (isMore) {
		const { artists, more } = await SINGER.getHot(count.value);
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
