<template>
	<div class="back">
		<div class="search">
			<input type="text" v-model="inputVal" @keyup.enter="search" />
			<div class="icon" @click="search">
				<el-icon size="26"><Search /></el-icon>
			</div>
		</div>
		<el-tabs v-model="activePages" @tab-change="tabsChange">
			<el-tab-pane label="单曲" name="单曲" />
			<el-tab-pane label="专辑" name="专辑" />
			<el-tab-pane label="歌手" name="歌手" />
			<el-tab-pane label="歌单" name="歌单" />
			<el-tab-pane label="用户(no)" name="用户" />
			<el-tab-pane label="MV(no)" name="MV" />
			<el-tab-pane label="歌词(no)" name="歌词" />
			<el-tab-pane label="电台(no)" name="电台" />
			<el-tab-pane label="视频(no)" name="视频" />
			<el-tab-pane label="综合(no)" name="综合" />
			<el-tab-pane label="声音(no)" name="声音" />
		</el-tabs>
		<span class="result-count" v-if="result?.count > 0 || inputVal">
			搜索结果数:{{ result?.count }}
		</span>
		<div class="result" v-if=" result?.result.length! > 0">
			<template v-if="activePages == '单曲'">
				<songTableCommon
					:songs="result.result"
					v-infinite-scroll="load"
					:infinite-scroll-immediate="false"
					:infinite-scroll-delay="1000"
				/>
			</template>
			<template v-if="activePages == '专辑'">
				<albumGroup
					:data="result.result"
					v-infinite-scroll="load"
					:infinite-scroll-immediate="false"
					:infinite-scroll-delay="1000"
				/>
			</template>
			<template v-if="activePages == '歌手'">
				<artistCardGroup :data="result.result" />
			</template>
			<template v-if="activePages == '歌单'">
				<list-card-group :list="result.result" />
			</template>
		</div>
		<div v-else>
			<h3>{{ tip }}</h3>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { search as s } from "service/api/api";
import { getItem } from "utils/storage";
import { searchType } from "@/interface/interface";
import songTableCommon from "@/components/content/songs-table/song-table-common.vue";
import albumGroup from "@/components/content/album-group/album-group.vue";
import artistCardGroup from "@/components/content/artist-card/artist-card-group.vue";
import listCardGroup from "@/components/content/list-card/list-card-group.vue";

const router = useRouter();

const activePages = ref<string>(getItem("firstSearch") || "单曲");
// 切换搜索结果类型
const tabsChange = async () => {
	result.value = { count: 0, result: [] };
	search();
};

const inputVal = ref<string>((router.currentRoute.value.query.content as string) || "");
const result = ref<any>();
const tip = ref<string>("");
// 搜索
const search = async () => {
	if (inputVal.value) {
		result.value = await s(inputVal.value, activePages.value as searchType);
		if (result.value.count > 0) {
			tip.value = "";
		} else {
			tip.value = "无搜索结果";
		}
	}
};
// 加载
const load = async () => {
	result.value.result = result.value?.result.concat(
		(await s(inputVal.value, activePages.value as searchType, result.value.result.length)).result
	);
};
</script>
<style scoped lang="less">
.flex-center() {
	display: flex;
	justify-content: center;
	align-items: center;
}
.back {
	margin: 4% 5%;
	.search {
		display: flex;
		align-items: center;
		height: 2rem;
		margin: 20px 0;
		input {
			display: inline-flex;
			height: 100%;
			width: 30rem;
			font-size: 1.2rem;
			border-radius: 7px 0 0 7px;
			color: var(--regular-text);
			border: 1px solid var(--darker-fill);
			padding: 0 5px;
			&:focus {
				cursor: auto;
			}
		}
		.icon {
			cursor: pointer;
			.flex-center();
			height: calc(2rem + 2px);
			width: 5rem;
			border-radius: 0 7px 7px 0;
			background-color: var(--base-fill);
			&:hover {
				color: var(--theme-color);
				background-color: var(--darker-fill);
			}
		}
	}
	.result-count {
		display: inline-block;
		margin: 5px 5px 15px 5px;
		color: var(--regular-text);
		font-size: 0.8rem;
	}
	.result {
		margin: 0 2%;
	}
}
</style>
