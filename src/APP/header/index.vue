<template>
	<div class="header">
		<div>
			<span class="logo" @click="router.push('/')">Songs</span>
		</div>
		<div>
			<el-switch
				class="switch"
				v-model="theme"
				@change="updateTheme"
				inline-prompt
				:active-icon="Sunny"
				:inactive-icon="Moon"
				style="--el-switch-on-color: var(--darker-fill); --el-switch-off-color: var(--darker-fill)"
			/>
			<el-divider style="color: red" direction="vertical" />
			<search v-show="store.searchVisible" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "store/index";
import { Sunny, Moon } from "@element-plus/icons-vue";
import storage from "utils/storage";
import search from "components/content/search-head/index.vue";

const router = useRouter();
const store = useDataStore();

const theme = ref<boolean>();
onBeforeMount(() => {
	theme.value = storage.getItem("theme") === "dark" ? true : false;
});
function updateTheme(val: boolean) {
	if (val) {
		store.update_theme("dark");
	} else {
		store.update_theme("light");
	}
}
</script>
<style scoped lang="less">
.header {
	display: flex;
	justify-content: space-around;
	height: 100%;
	& > :nth-child(1) {
		flex-grow: 1;
		margin: 0 2%;
	}
	& > :nth-child(2) {
		flex-grow: 8;
		margin: 0 2%;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		.switch {
			margin: 0 1%;
		}
	}
	.logo {
		user-select: none;
		font-size: 22px;
		line-height: 6vh;
		font-weight: 800;
		font-family: Georgia, serif;
		color: var(--primary-text);
	}
}
</style>
