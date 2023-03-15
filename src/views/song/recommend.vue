<template>
	<el-scrollbar>
		<el-tabs v-model="activePage" class="tabs">
			<el-tab-pane name="new">
				<template #label>
					<span class="tabs-tittle">新音乐</span>
				</template>
				<songs-table :songs="newSongs" :songs-count="newSongsCount" />
			</el-tab-pane>
			<el-tab-pane name="daily">
				<template #label>
					<span class="tabs-tittle">每日推荐</span>
				</template>
				<songs-table :songs="dailySongs" :songs-count="dailySongsCount" tableWidth="100%" />
			</el-tab-pane>
		</el-tabs>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { songDataType } from "@/interface/interface";
import { getRecommendNewSong, getRecommendDailySongs } from "service/api/api";
import songsTable from "components/content/songs-table/index.vue";

const activePage: Ref<string> = ref("new");

const newSongs: Ref<Array<songDataType>> = ref([]);
const newSongsCount: Ref<number> = ref(0);
const dailySongs: Ref<Array<songDataType>> = ref([]);
const dailySongsCount: Ref<number> = ref(0);
onMounted(async () => {
	newSongs.value = await getRecommendNewSong();
	newSongsCount.value = newSongs.value.length;
	dailySongs.value = await getRecommendDailySongs();
	dailySongsCount.value = dailySongs.value.length;
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
