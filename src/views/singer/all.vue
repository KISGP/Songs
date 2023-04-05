<template>
	<el-scrollbar>
		<div
			class="back"
			v-infinite-scroll="load"
			:infinite-scroll-immediate="false"
			:infinite-scroll-delay="1000"
		>
			<h2>全部歌手</h2>
			<div class="filter">
				<span>类型：</span>
				<el-radio-group v-model="filter.type" @change="change">
					<el-radio :label="-1" border>全部</el-radio>
					<el-radio :label="1" border>男歌手</el-radio>
					<el-radio :label="2" border>女歌手</el-radio>
					<el-radio :label="3" border>乐队</el-radio>
				</el-radio-group>
			</div>
			<div class="filter">
				<span>地区：</span>
				<el-radio-group v-model="filter.area" @change="change">
					<el-radio :label="-1" border>全部</el-radio>
					<el-radio :label="7" border>华语</el-radio>
					<el-radio :label="96" border>欧美</el-radio>
					<el-radio :label="8" border>日本</el-radio>
					<el-radio :label="16" border>韩国</el-radio>
					<el-radio :label="0" border>其他</el-radio>
				</el-radio-group>
			</div>
			<div class="filter">
				<span>首字母索引：</span>
				<div style="max-width: 100px">
					<el-input
						v-model="filter.initial"
						size="small"
						maxlength="1"
						@input="check"
						@change="change"
					/>
				</div>
			</div>
			<el-space style="margin-top: 30px" wrap :size="50" alignment="flex-start">
				<artist-card v-for="item in data" :key="item.id" :data="item"></artist-card>
			</el-space>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getFilteredArtist } from "service/api/api";
import { artistBriefType } from "@/interface/interface";
import artistCard from "@/components/content/artist-card/artist-card.vue";

const filter = reactive<{
	type: number;
	area: number;
	initial: string;
}>({
	type: -1,
	area: -1,
	initial: "a",
});
const check = (value: string) => {
	if (value && !/^[a-zA-Z]*$/.test(value)) {
		filter.initial = "";
	}
};

const data = ref<artistBriefType[]>([]);
let isMore: boolean = true;
let count: number = 0;
onMounted(() => {
	change();
});

const change = async () => {
	data.value = [];
	const { artists, more } = await getFilteredArtist(filter.type, filter.area, filter.initial);
	data.value = artists;
	isMore = more;
	count = artists.length;
};
const load = async () => {
	if (isMore) {
		const { artists, more } = await getFilteredArtist(
			filter.type,
			filter.area,
			filter.initial,
			count
		);
		data.value = data.value.concat(artists);
		isMore = more;
		count += artists.length;
	}
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	.filter {
		& > span {
			font-size: 18px;
			margin: 10px;
		}
		display: flex;
		align-items: center;
	}
}
</style>
