<template>
	<el-scrollbar>
		<div class="back">
			<h2>歌手榜单</h2>
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
				<artist-card
					v-for="(item, index) in artists.cache"
					:key="item.id"
					:data="item"
					:top="index"
				/>
			</el-space>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getTopArtists } from "service/api/api";
import { artistBriefType } from "@/interface/interface";
import artistCard from "@/components/content/artist-card/artist-card.vue";

const artists = reactive<{
	cache: artistBriefType[];
	China: artistBriefType[];
	America: artistBriefType[];
	Korea: artistBriefType[];
	Japan: artistBriefType[];
}>({
	cache: [],
	China: [],
	America: [],
	Korea: [],
	Japan: [],
});
onMounted(async () => {
	artists.cache = artists.China = await getTopArtists("华语");
	artists.America = await getTopArtists("欧美");
	artists.Korea = await getTopArtists("韩国");
	artists.Japan = await getTopArtists("日本");
});

const activePage = ref<string>("China");
const tabChange = (name: string) => {
	switch (name) {
		case "China":
			artists.cache = artists.China;
			break;
		case "America":
			artists.cache = artists.America;
			break;
		case "Korea":
			artists.cache = artists.Korea;
			break;
		case "Japan":
			artists.cache = artists.Japan;
			break;
	}
};
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
