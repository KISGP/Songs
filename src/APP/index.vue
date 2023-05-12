<template>
	<div class="global">
		<!-- 基础布局 -->
		<el-container class="layout">
			<!--头部  -->
			<el-header class="layout-header"><header-bar /></el-header>
			<el-container>
				<!-- 菜单 -->
				<el-aside class="layout-menu" v-show="DataStore.menuVisible"><menu-bar /></el-aside>
				<!-- 内容 -->
				<el-main class="layout-content">
					<el-scrollbar ref="eScrollBar">
						<router-view v-slot="{ Component }" :key="$route.fullPath">
							<keep-alive>
								<component :is="Component" v-if="$route.meta.keepAlive" />
							</keep-alive>
							<component :is="Component" v-if="!$route.meta.keepAlive" />
						</router-view>
					</el-scrollbar>
				</el-main>
			</el-container>
			<footer-bar class="layout-footer" />
		</el-container>
		<hidden-btn
			v-show="DataStore.audioDisplayStatus === 'hidden' || DataStore.audioDisplayStatus === 'min'"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import storage from "utils/storage";
import { useUserStore, useSongStore, useDataStore } from "store/index";
import { getUserInfo, getLikedSongsID, getMyList } from "service/api/api";
import { themeType } from "@/interface/interface";
import { ElScrollbar } from "element-plus";
import headerBar from "./header/index.vue";
import menuBar from "./menu/index.vue";
import footerBar from "./footer/index.vue";
import hiddenBtn from "@/components/content/button-hide/button-hide.vue";

const SongStore = useSongStore();
const DataStore = useDataStore();
const UserStore = useUserStore();
const eScrollBar = ref<InstanceType<typeof ElScrollbar>>();

onMounted(async () => {
	// // 获取localStorage下存储的用户信息
	// const { cookie, id, name } = storage.getAll();
	// if (cookie) {
	// 	// 存储用户cookie到pinia
	// 	UserStore.update_cookie(cookie);
	// 	// 存储用户ID和Name到pinia
	// 	if (id && name) {
	// 		UserStore.update_id(parseInt(id));
	// 		UserStore.update_name(name);
	// 	} else {
	// 		const user = await getUserInfo();
	// 		UserStore.update_id(user.id);
	// 		UserStore.update_name(user.name);
	// 	}
	// 	// 修改登录状态
	// 	UserStore.update_login(true);
	// 	// 获取喜欢的音乐列表ID
	// 	SongStore.update_likedSongsID(async (likedSongsID) => {
	// 		(await getLikedSongsID(UserStore.netease_id)).forEach((id: number) => {
	// 			likedSongsID.push(id);
	// 		});
	// 	});
	// 	// 获取我创建的歌单
	// 	(await getMyList(UserStore.netease_id, UserStore.netease_name, "created")).forEach((list) => {
	// 		SongStore.push_myCreatedList(list);
	// 		SongStore.push_myCreatedListID(list.id);
	// 	});
	// }
	// // 初始化主题
	// DataStore.update_theme((storage.getItem("theme") as themeType) || DataStore.theme);
	// // 存储滚动条ref对象到pinia
	// DataStore.init_eScrollBar(eScrollBar.value!);
	// // 监听网页变化，修改标题
	// document.addEventListener("visibilitychange", function () {
	// 	if (document.visibilityState === "visible") {
	// 		document.title = "Song";
	// 	} else {
	// 		document.title = SongStore.song?.song.name || "Song";
	// 	}
	// });
});
</script>
<style scoped lang="less">
@import "../assets/style/common.less";
@height: var (--header-height);
.global {
	background: var(--global-bg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
}
.layout {
	backdrop-filter: none;
	.layout-header {
		padding: 0;
		height: var(--header-height);
		border-bottom: 1px solid var(--darker-fill);
	}
	.layout-menu {
		width: auto;
		height: 94vh;
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
