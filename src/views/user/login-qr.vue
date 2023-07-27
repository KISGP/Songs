<template>
	<div class="back">
		<p>使用网易云APP扫码登录</p>
		<div class="image">
			<el-image style="width: 200px; height: 200px" :src="base64" fit="contain" />
		</div>
	</div>
</template>
<script setup lang="ts">
// TODO: 把登录页面改为登录dialog，不要页面跳转
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "store/module/user";
import { LOGIN, USER } from "service/api";
import { toast } from "utils/notice";
import storage from "utils/storage";
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
		key.value = await LOGIN.getKey();
		// 生成二维码图片的 base64
		base64.value = await LOGIN.getBase64(key.value);
		// 修改状态为等待扫码
		status.value = 801;
		return true;
	} catch (error: any) {
		toast(`二维码创建失败${error}`, {
			type: "error",
			timeout: 2000,
		});
		return false;
	}
};
// 检查二维码状态
const timer: ReturnType<typeof setInterval> = setInterval(async () => {
	if (!base64.value) return;
	// 获取二维码状态
	const { statusCode, cookie } = await LOGIN.checkQRStatus(key.value);
	status.value = statusCode;
	switch (status.value) {
		case 800: // 二维码失效
			toast("二维码失效,请刷新页面", {
				type: "error",
				timeout: 2000,
			});
			break;
		case 803: // 登录成功
			toast("登录成功", {
				type: "success",
				timeout: 1500,
			});
			store.update_cookie(cookie);
			const { id, name } = await USER.getIdAndName();
			store.update_login(true);
			store.update_id(id);
			store.update_name(name);
			storage.setItems({
				cookie,
				id: id.toString(),
				name,
			});
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
