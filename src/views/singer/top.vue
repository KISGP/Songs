<template>
	<div class="back">
		<h2>歌手榜单</h2>
		<!-- TODO: el-tab-pane 切换大量数据时如何优化 -->
		<el-tabs v-model="activePage" class="demo-tabs" @tab-change="tabChange">
			<el-tab-pane name="China">
				<template #label>
					<span class="tabs-tittle">华语</span>
				</template>
			</el-tab-pane>
			<el-tab-pane name="America" :lazy="true">
				<template #label>
					<span class="tabs-tittle">欧美</span>
				</template>
			</el-tab-pane>
			<el-tab-pane name="Korea" :lazy="true">
				<template #label>
					<span class="tabs-tittle">韩国</span>
				</template>
			</el-tab-pane>
			<el-tab-pane name="Japan" :lazy="true">
				<template #label>
					<span class="tabs-tittle">日本</span>
				</template>
			</el-tab-pane>
		</el-tabs>
		<el-space class="space" wrap :size="50" alignment="flex-start">
			<singer-card
				v-for="(item, index) in singers.cache"
				:key="item.id"
				:data="item"
				:top="index"
			/>
		</el-space>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { SINGER } from "service/api/index";
import { singer } from "type/type";
import singerCard from "components/content/singer-card/singer-card.vue";

const singers = reactive<{
	cache: singer[];
	China: singer[];
	America: singer[];
	Korea: singer[];
	Japan: singer[];
}>({
	cache: [],
	China: [],
	America: [],
	Korea: [],
	Japan: [],
});
onMounted(async () => {
	singers.cache = singers.China = await SINGER.getTop("华语");
	singers.America = await SINGER.getTop("欧美");
	singers.Korea = await SINGER.getTop("韩国");
	singers.Japan = await SINGER.getTop("日本");
});

const activePage = ref<string>("China");
function tabChange(name: string) {
	switch (name) {
		case "China":
			singers.cache = singers.China;
			break;
		case "America":
			singers.cache = singers.America;
			break;
		case "Korea":
			singers.cache = singers.Korea;
			break;
		case "Japan":
			singers.cache = singers.Japan;
			break;
	}
}
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	.tabs-tittle {
		font-size: 18px;
	}
	.space {
		margin: 50px 5%;
	}
}
</style>
