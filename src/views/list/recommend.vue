<template>
		<el-tabs v-model="activePage" class="tabs">
			<el-tab-pane name="list">
				<template #label>
					<span class="tabs-tittle">推荐歌单</span>
				</template>
				<div class="back">
					<list-card-group :list="list" />
				</div>
			</el-tab-pane>
			<el-tab-pane name="dailyList">
				<template #label>
					<span class="tabs-tittle">每日推荐</span>
				</template>
				<div class="back">
					<list-card-group :list="dailyList" />
				</div>
			</el-tab-pane>
		</el-tabs>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { getRecommendDailyList, getRecommendList } from "service/api/api";
import { listBriefType } from "@/interface/interface";
import listCardGroup from "@/components/content/list-card/list-card-group.vue";

const list: Ref<Array<listBriefType>> = ref([]);
const dailyList: Ref<Array<listBriefType>> = ref([]);
onMounted(async () => {
	list.value = await getRecommendList();
	 getRecommendDailyList().then((res)=>{
		dailyList.value = res;
	});
});
const activePage: Ref<string> = ref("list");
</script>
<style scoped lang="less">
.tabs {
	margin: 2% 5%;
	.tabs-tittle {
		font-size: 18px;
	}
	.back {
		width: 90%;
		margin: 0 auto;
	}
}
</style>
