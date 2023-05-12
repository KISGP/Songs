<template>
	<div class="back">
		<h2>基本设置</h2>
		<div class="firstSearch">
			<span>搜索首选设置</span>
			<el-select
				v-model="firstSearch"
				:placeholder="storage.getItem('firstSearch')"
				@change="saveFirstSearch"
			>
				<el-option
					v-for="item in firstSearchOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value"
					:disabled="storage.getItem('firstSearch') === item.value"
				/>
			</el-select>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import storage from "utils/storage";
const firstSearch = ref<string>("");
const firstSearchOptions = [
	{ value: "单曲", label: "单曲" },
	{ value: "专辑", label: "专辑" },
	{ value: "歌单", label: "歌单" },
	{ value: "用户", label: "用户" },
	{ value: "MV", label: "MV" },
	{ value: "歌词", label: "歌词" },
	{ value: "电台", label: "电台" },
	{ value: "视频", label: "视频" },
	{ value: "综合", label: "综合" },
	{ value: "声音", label: "声音" },
];

const saveFirstSearch = () => {
	storage.setItem("firstSearch", firstSearch.value);
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	.firstSearch {
		font-size: 1.1rem;
		& > span {
			padding: 2px 10px;
		}
	}
}
</style>
