<template>
	<div class="global">
		<!-- 基础布局 -->
		<el-container class="layout">
			<!--头部  -->
			<el-header class="layout-header"><header-bar /></el-header>
			<el-container>
				<!-- 菜单 -->
				<el-aside class="layout-menu"><menu-bar /></el-aside>
				<!-- 内容 -->
				<el-main class="layout-content">
					<router-view v-slot="{ Component }" :key="$route.fullPath">
						<keep-alive>
							<component :is="Component" v-if="$route.meta.keepAlive" />
						</keep-alive>
						<component :is="Component" v-if="!$route.meta.keepAlive" />
					</router-view>
				</el-main>
			</el-container>
			<footer-bar class="layout-footer" />
		</el-container>
		<hidden-btn v-show="hiddenBtnStatus" />
	</div>
</template>
<script setup lang="ts">
import { watch, ref, Ref } from "vue";
import { useSongStore, useUserStore } from "store/index";
import { setCssVar } from "utils/utils-common";
import { getItem } from "utils/storage";

import headerBar from "./content/header/index.vue";
import menuBar from "./content/menu/index.vue";
import footerBar from "./content/footer/index.vue";
import hiddenBtn from "./content/footer/button-hide.vue";

const SongStore = useSongStore();
const UserStore = useUserStore();

const hiddenBtnStatus: Ref<boolean> = ref(true);
// 监听播放器样式（隐藏/最小化/全屏）
watch(
	() => SongStore.playerStatus,
	(newValue, oldValue) => {
		if (newValue === "hidden") {
			hiddenBtnStatus.value = true;
			setCssVar("--height-content", "94vh");
			setCssVar("--height-player", "0vh");
		} else if (newValue === "min") {
			hiddenBtnStatus.value = true;
			setCssVar("--height-content", "86vh");
			setCssVar("--height-player", "8vh");
		} else if (newValue === "max") {
			hiddenBtnStatus.value = false;
			setCssVar("--height-player", "100vh");
		}
	}
);

UserStore.update_cookie(getItem("cookie") || "");
UserStore.update_id(getItem("id") || "");
UserStore.update_name(getItem("name") || "");
getItem("cookie") && UserStore.update_login(true);
</script>
<style scoped lang="less">
@import "../assets/style/common.less";
.global {
	.size(100vh,100vw);
	overflow: hidden;
	background: var(--global-bg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.layout {
	.size(100vh,100vw);
	.layout-header {
		padding: 0;
		.max-size(var(--header-height));
		border-bottom: 1px solid var(--el-border-color);
	}
	.layout-menu {
		width: auto;
	}
	.layout-content {
		padding: 0;
		margin: 0;
		.min-size(var(--height-content));
	}
	.layout-footer {
		position: absolute;
		bottom: -1px;
		width: 100%;
	}
}
</style>
