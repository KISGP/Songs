<template>
	<el-tabs v-model="activePage" class="tabs" v-once>
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
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { song } from "type/type";
import { SONG } from "service/api/index";
import songsTable from "components/content/songs-table/songs-table.vue";

const activePage = ref<string>("new");

const newSongs = ref<song[]>([]);
const dailySongs = ref<song[] | null>([]);

onMounted(async () => {
	newSongs.value = await SONG.recommendNew();
	dailySongs.value = await SONG.recommendDaily();
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
