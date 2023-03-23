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
				v-show="
					suggestionsVisible &&
					(suggestionsResult.albums ||
						suggestionsResult.artists ||
						suggestionsResult.list ||
						suggestionsResult.songs)
				"
				:suggestions="suggestionsResult"
			/>
		</transition>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { suggestionsType } from "@/interface/interface";
import { getSearchSuggestions } from "service/api/api";
import { debounce } from "utils/utils-common";
import suggestions from "./suggestions.vue";

const router = useRouter();

const placeholder = ref<string>("Search");
const suggestionsVisible = ref<boolean>(false);
const value = ref<string>("");
const valueCache = ref<string>("");

watch(
	() => router.currentRoute.value.fullPath,
	() => {
		value.value = "";
		valueCache.value = "";
		suggestionsResult.value = {};
	}
);

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

const suggestionsResult = ref<suggestionsType>({});
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
		color: var(--regular-text);
		border: 1px solid var(--darker-fill);
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
