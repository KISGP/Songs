<template>
	<el-tabs v-model="activePage" class="tabs">
		<el-tab-pane name="list">
			<template #label>
				<span class="tabs-tittle">推荐歌单</span>
			</template>
			<list-recommend :lists="list" />
		</el-tab-pane>
		<el-tab-pane name="dailyList">
			<template #label>
				<span class="tabs-tittle">每日推荐</span>
			</template>
			<list-recommend :lists="dailyList" />
		</el-tab-pane>
	</el-tabs>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LIST } from "service/api";
import { list as listType } from "type/type";
import ListRecommend from "components/content/list-recommend/list-recommend.vue";

const activePage = ref<string>("list");

const list = ref<listType[]>([]);
const dailyList = ref<listType[]>([]);
onMounted(async () => {
	list.value = await LIST.recommend();
	dailyList.value = await LIST.recommendDaily();
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
