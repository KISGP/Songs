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
		<hidden-btn v-show="SongStore.playerStatus === 'hidden' || SongStore.playerStatus === 'min'" />
	</div>
</template>
<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useSongStore } from "store/index";
import { updatePlayerStyle, fixUserInfo, getLikedSongs } from "./index";
import headerBar from "./content/header/index.vue";
import menuBar from "./content/menu/index.vue";
import footerBar from "./content/footer/index.vue";
import hiddenBtn from "./content/footer/button-hide.vue";
const SongStore = useSongStore();

onMounted(async () => {
	// 用户信息挂载到pinia / 补全用户信息
	await fixUserInfo();
	getLikedSongs();
});

// 监听播放器样式
watch(
	() => SongStore.playerStatus,
	(newValue, oldValue) => {
		updatePlayerStyle(newValue);
	}
);
</script>
<style scoped lang="less">
@import "../assets/style/common.less";
@height: var (--header-height);
.global {
	overflow: hidden;
	background: var(--global-bg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.layout {
	.layout-header {
		padding: 0;
		max-height: calc(var(--header-height) - 1px);
		border-bottom: 1px solid var(--el-border-color);
	}
	.layout-menu {
		width: auto;
	}
	.layout-content {
		padding: 0;
		margin: 0;
		height: var(--height-content);
	}
	.layout-footer {
		position: absolute;
		bottom: 0px;
		width: 100%;
	}
}
</style>
