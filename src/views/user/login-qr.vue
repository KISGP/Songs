<template>
	<div class="back">
		<p>使用网易云APP扫码登录</p>
		<div class="image">
			<el-image style="width: 200px; height: 200px" :src="base64" fit="contain"></el-image>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "store/module/user";
import { getQRKey, getQRImgBase64, checkQRStatus, getUserInfo } from "service/api/api";
import { showNotification } from "utils/utils-content";
import { setItem } from "utils/storage";
const store = useUserStore();
const router = useRouter();
onMounted(() => {
	createQR();
});
onUnmounted(() => {
	clearInterval(timer);
});

// 二维码base64
const base64: Ref<string> = ref("");
// 二维码key
const key: Ref<string> = ref("");
// 二维码状态(800:二维码过期, 801:等待扫码, 802:待确认, 803:登录成功)
const status: Ref<800 | 801 | 802 | 803> = ref(800);

// 创建二维码
const createQR = async (): Promise<boolean> => {
	try {
		// 请求二维码Key
		key.value = await getQRKey();
		// 生成二维码图片的 base64
		base64.value = await getQRImgBase64(key.value);
		// 修改状态为等待扫码
		status.value = 801;
		return true;
	} catch (error: any) {
		showNotification("error", `二维码创建失败${error}`);
		return false;
	}
};
// 检查二维码状态
const timer: ReturnType<typeof setInterval> = setInterval(async () => {
	if (!base64.value) return;
	// 获取二维码状态
	const { state, cookie } = await checkQRStatus(key.value);
	status.value = state;
	switch (status.value) {
		case 800: // 二维码失效
			showNotification("error", "二维码失效,正在重新获取");
			createQR();
			break;
		case 803: // 登录成功
			showNotification("success", "登录成功,稍后跳转");
			store.update_cookie(cookie);
			const { id, name } = await getUserInfo();
			store.update_login(true);
			store.update_id(parseInt(id));
			store.update_name(name);
			setItem("cookie", cookie);
			setItem("id", id);
			setItem("name", name);
			router.push((router.currentRoute.value.query.redirect as string | undefined) || "/");
			break;
		default:
			break;
	}
}, 2000);
</script>
<style scoped lang="less">
@import "style/common.less";
.back {
	.position-centerXY();
	.size(250px,200px);
	& > .image {
		.size(200px,200px);
		border-radius: 10px;
		box-shadow: var(--el-box-shadow-light);
		border-radius: var(--el-border-radius-base);
		overflow: hidden;
	}
	& > p {
		text-align: center;
	}
}
</style>
