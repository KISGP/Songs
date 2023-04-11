<template>
	<el-scrollbar>
		<el-tabs v-model="activePage" class="tabs">
			<el-tab-pane name="new">
				<template #label>
					<span class="tabs-tittle">新音乐</span>
				</template>
				<songs-table :songs="newSongs" />
			</el-tab-pane>
			<el-tab-pane name="daily">
				<template #label>
					<span class="tabs-tittle">每日推荐</span>
				</template>
				<songs-table v-if="dailySongs" :songs="dailySongs" />
			</el-tab-pane>
		</el-tabs>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { songDetailedType } from "@/interface/interface";
import { getRecommendNewSong, getRecommendDailySongs } from "service/api/api";
import songsTable from "@/components/content/songs-table/song-table-common.vue";

const activePage = ref<string>("new");

const newSongs = ref<Array<songDetailedType>>([]);
const dailySongs = ref<Array<songDetailedType> | null>([]);
onMounted(async () => {
	newSongs.value = await getRecommendNewSong();
	getRecommendDailySongs().then((res) => {
		dailySongs.value = res;
	});
});
</script>
<style scoped lang="less">
.tabs {
	margin: 2% 5%;
	.tabs-tittle {
		font-size: 18px;
	}
}
</style>
