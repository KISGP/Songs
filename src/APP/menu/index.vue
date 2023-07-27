<template>
	<el-menu :collapse="true" router>
		<el-sub-menu index="1">
			<template #title> 音乐 </template>
			<el-menu-item index="/song/recommend">音乐推荐</el-menu-item>
			<el-menu-item index="/song/subscribed">关注新歌</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="2">
			<template #title> 歌单 </template>
			<el-menu-item index="/list/recommend">歌单推荐</el-menu-item>
			<el-menu-item index="/list/my">我的歌单</el-menu-item>
			<el-menu-item index="/list/top">榜单</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="3">
			<template #title> 专辑 </template>
			<el-menu-item index="/album/my">我的专辑</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="4">
			<template #title> 歌手 </template>
			<el-menu-item index="/singer/subscribe">关注列表</el-menu-item>
			<el-menu-item index="/singer/all">全部歌手</el-menu-item>
			<el-menu-item index="/singer/hot">热门歌手</el-menu-item>
			<el-menu-item index="/singer/top">榜单</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="5">
			<template #title>
				<el-icon><Setting /></el-icon>
			</template>
			<el-menu-item index="/set/basic">基本设置</el-menu-item>
			<el-menu-item index="/set/theme">主题设置</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="6">
			<template #title>
				<el-icon><User /></el-icon>
			</template>
			<template v-if="UserStore.netease_login">
				<el-menu-item :index="`/user/${UserStore.netease_id}`">
					<div>
						<el-icon :size="60"><svg-icon name="netease" /></el-icon>
						<span>{{ UserStore.netease_name }}</span>
					</div>
				</el-menu-item>
				<el-menu-item index="">
					<div @click.stop="exit">
						<el-icon :size="60"><svg-icon name="exit" /></el-icon>
						<span>退出账号</span>
					</div>
				</el-menu-item>
			</template>
			<template v-else>
				<el-menu-item index="">
					<div @click.stop="changeLoginVisible(true)" style="width: 100%">
						<el-icon :size="60"><svg-icon name="netease" /></el-icon>
						<span>登录</span>
					</div>
				</el-menu-item>
			</template>
		</el-sub-menu>
		<el-sub-menu index="7">
			<template #title>
				<el-icon>
					<svg-icon name="github" />
				</el-icon>
			</template>
			<el-menu-item index="" @click="openPage('https://github.com/GP-root/Songs')">
				项目地址
			</el-menu-item>
		</el-sub-menu>
	</el-menu>

	<el-dialog
		v-model="loginVisible"
		width="350px"
		align-center
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:destroy-on-close="true"
	>
		<login @loginSuccess="changeLoginVisible(false)" />
	</el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import storage from "utils/storage";
import { toast } from "utils/notice";
import { useUserStore } from "store/index";
import login from "components/content/login/login.vue";

const UserStore = useUserStore();

// 打开新页面
function openPage(url: string) {
	window.open(url, "_blank");
}

// 账号退出
function exit() {
	storage.removeAll();
	UserStore.update_login(false);
	toast("退出成功", {
		type: "success",
	});
}

const loginVisible = ref<boolean>(false);
function changeLoginVisible(val: boolean) {
	loginVisible.value = val;
}
</script>
<style scoped lang="less">
.el-menu {
	padding-top: 8px;
	height: 100%;
	max-width: 200px;
}
</style>
