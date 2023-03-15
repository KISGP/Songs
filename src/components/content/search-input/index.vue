<template>
	<div class="search">
		<input
			type="text"
			:placeholder="placeholder"
			v-model="value"
			@focus="focus"
			@blur="blur"
			@input="input"
			@keyup.enter="search"
		/>
		<transition name="suggestions" appear>
			<suggestions
				v-show="suggestionsVisible && suggestionsResult"
				:suggestions="suggestionsResult"
			/>
		</transition>
	</div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { suggestionsType } from "@/interface/interface";
import { getSearchSuggestions } from "service/api/api";
import { debounce } from "utils/utils-common";
import suggestions from "./suggestions.vue";

const placeholder: Ref<string> = ref("Search");
const suggestionsVisible: Ref<boolean> = ref(false);
const value: Ref<string> = ref("");
const valueCache: Ref<string> = ref("");

const focus = () => {
	placeholder.value = "";
	if (!suggestionsResultIsEmpty()) suggestionsVisible.value = true;
	value.value = valueCache.value;
};
const blur = () => {
	placeholder.value = "Search";
	suggestionsVisible.value = false;
	valueCache.value = value.value;
	value.value = "";
};

const suggestionsResult: Ref<suggestionsType> = ref({});
const suggestionsResultIsEmpty = (): boolean => {
	return Object.keys(suggestionsResult.value).length > 0 ? false : true;
};

const input = debounce(async () => {
	if (value.value) {
		suggestionsResult.value = await getSearchSuggestions(value.value);
		if (!suggestionsResultIsEmpty()) suggestionsVisible.value = true;
	} else {
		suggestionsResult.value = {};
		suggestionsVisible.value = false;
	}
}, 400);
const search = async () => {};
</script>
<style scoped lang="less">
@import "../../../assets/style/common.less";
.search {
	position: relative;
	height: 100%;
	input {
		.position-centerXY();
		height: 4vh;
		width: 15%;
		border-radius: 50px;
		border: 1px solid var(--el-border-color);
		text-align: center;
		padding: 0 5px;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
		&:focus {
			width: 30%;
			border-radius: 5px;
			text-align: left;
			cursor: auto;
			border: 1px solid var(--theme-color);
		}
	}
}
.suggestions-enter-active {
	animation: fadeIn 300ms ease;
}
.suggestions-leave-active {
	animation: fadeOut 500ms ease;
}
</style>
