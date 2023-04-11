<template>
	<el-menu :collapse="true" router>
		<el-sub-menu index="1">
			<template #title> 音乐 </template>
			<el-menu-item index="/song/recommend">音乐推荐</el-menu-item>
			<el-menu-item index="/song/subscribed">关注歌手新歌</el-menu-item>
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
			<el-menu-item index="/set/theme">基本设置</el-menu-item>
			<el-menu-item index="/set/theme">主题设置</el-menu-item>
			<el-menu-item index="/set/data">数据来源</el-menu-item>
		</el-sub-menu>
		<el-sub-menu index="6">
			<template #title>
				<el-icon><User /></el-icon>
			</template>
			<el-menu-item
				:index="UserStore.netease_login ? `/user/${UserStore.netease_id}` : '/user/login'"
			>
				<div>
					<el-icon :size="60">
						<svg-icon name="netease" />
					</el-icon>
					<span>{{ UserStore.netease_login ? UserStore.netease_name : "登录" }}</span>
				</div>
			</el-menu-item>
			<el-menu-item index="" v-if="UserStore.netease_login">
				<div @click.stop="exit">
					<el-icon :size="60">
						<svg-icon name="exit" />
					</el-icon>
					<span>退出账号</span>
				</div>
			</el-menu-item>
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
</template>
<script setup lang="ts">
import { useUserStore } from "store/index";
import { removeAll } from "utils/storage";
import { showSuccessMessage } from "utils/utils-content";
const UserStore = useUserStore();
const openPage = (url: string) => {
	window.open(url, "_blank");
};

const exit = ()=>{
	removeAll();
	UserStore.update_login(false);
	showSuccessMessage("退出成功");
}
</script>
<style scoped lang="less">
.el-menu {
	padding-top: 8px;
	height: 100%;
	max-width: 200px;
}
</style>
