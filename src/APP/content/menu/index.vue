<template>
	<el-menu :collapse="true" router>
		<el-sub-menu index="1">
			<template #title> 音乐 </template>
			<el-menu-item index="/song/recommend">音乐推荐</el-menu-item>
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
			<template #title>
				<el-icon><User /></el-icon>
			</template>
			<el-menu-item index="/user/login">
				<div>
					<el-icon :size="60">
						<svg-icon name="netease" />
					</el-icon>
					<span>{{ UserStore.netease_login ? UserStore.netease_name : "登录" }}</span>
				</div>
			</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="5">
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
</template>
<script setup lang="ts">
import { useUserStore } from "store/index";
const UserStore = useUserStore();
const openPage = (url: string) => {
	window.open(url, "_blank");
};
</script>
<style scoped lang="less">
.el-menu {
	padding-top: 8px;
	height: 100%;
	max-width: 200px;
}
</style>
