<template>
	<div class="search">
		<input
			v-once
			type="text"
			placeholder="Search"
			v-model="inputValue"
			@focus="focus"
			@blur="blur"
			@input="input"
			@keyup.enter="search"
		/>
		<transition name="suggestions">
			<suggestions v-show="suggestionsVisible" :suggestions="suggestionsResult" />
		</transition>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { suggestions as suggestionsType } from "type/type";
import { SEARCH } from "service/api";
import { debounce } from "utils/utils-common";
import suggestions from "./suggestions.vue";

const router = useRouter();

watch(
	() => router.currentRoute.value.fullPath,
	() => {
		inputValue.value = "";
		suggestionsResult.value = undefined;
	}
);

const inputValue = ref<string>("");
const suggestionsVisible = ref<boolean>(false);
const suggestionsResult = ref<suggestionsType>();

// 输入时获取搜索建议
const input = debounce(async () => {
	if (inputValue.value) {
		const res = await SEARCH.getSuggestion(inputValue.value);
		const { songs, albums, list, singers } = res;
		if (songs || albums || list || singers) {
			suggestionsResult.value = res;
		} else {
			suggestionsResult.value = undefined;
		}
		suggestionsVisible.value = true;
	} else {
		suggestionsResult.value = undefined;
		suggestionsVisible.value = false;
	}
}, 400);
// 聚焦显示建议
function focus() {
	if (inputValue.value) {
		suggestionsVisible.value = true;
	}
}
// 失焦隐藏建议
function blur() {
	suggestionsVisible.value = false;
}
// 按下回车搜索
function search() {
	if (inputValue.value) {
		router.push({
			path: "/search",
			query: {
				content: inputValue.value,
				type: 1,
			},
		});
	} else {
		router.push("/search");
	}
}
</script>
<style scoped lang="less">
@import "../../../assets/style/common.less";
.search {
	position: relative;
	margin: 0 1%;
	input {
		padding: 0 5px;
		height: 4vh;
		width: 250px;
		color: var(--regular-text);
		border-radius: 7px;
		border: 1px solid var(--darker-fill);
		transition: all 300ms ease;
		&:focus {
			width: 350px;
			border: 1px solid var(--theme-color);
		}
	}
}
.suggestions-enter-active {
	animation: fadeIn 250ms ease;
}
.suggestions-leave-active {
	animation: fadeOut 300ms ease;
}
</style>
