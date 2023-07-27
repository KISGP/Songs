<template>
	<div class="back">
		<div class="imageBox">
			<el-image :class="{ mark: isNeedMask, image: true }" :src="base64" fit="contain" />
		</div>
		<p>使用网易云APP扫码登录</p>
	</div>
</template>
<script setup lang="ts">
import { useUserStore } from "store/module/user";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import storage from "utils/storage";
import { throttle } from "utils/tool";
import { toast } from "utils/notice";
import { LOGIN, USER } from "service/api";

const store = useUserStore();
const router = useRouter();

const emit = defineEmits(["loginSuccess"]);

onMounted(() => {
	createQR();
});

onUnmounted(() => {
	clearInterval(checkStatus);
	base64.value = "";
	key.value = "";
	status.value = 800;
});

// 二维码 base64
const base64 = ref<string>("");
// 二维码key
const key = ref<string>("");
// 二维码状态(800:二维码过期, 801:等待扫码, 802:待确认, 803:登录成功)
const status = ref<800 | 801 | 802 | 803>(800);

// 创建二维码
async function createQR(): Promise<boolean> {
	try {
		// 请求二维码Key
		key.value = await LOGIN.getKey();
	} catch (error) {
		console.error("二维码key请求失败", error);
		toast("二维码key请求失败", {
			type: "error",
			timeout: 2000,
		});
	}
	try {
		// 生成二维码图片的 base64
		base64.value = await LOGIN.getBase64(key.value);
		// 修改状态为等待扫码
		status.value = 801;
		return true;
	} catch (error: any) {
		toast("二维码生成失败", {
			type: "error",
			timeout: 2000,
		});
	}
	return false;
}

// 检查二维码状态
const checkStatus: ReturnType<typeof setInterval> = setInterval(async () => {
	// 判断二维码是否存在
	if (base64.value === "") return;

	// 获取二维码状态
	try {
		const { statusCode, cookie } = await LOGIN.checkQRStatus(key.value);
		// 更新二维码状态
		status.value = statusCode;
		// 处理相应状态的二维码
		switch (status.value) {
			// 二维码失效
			case 800:
				qrInvalid();
				break;
			// 登录成功
			case 803:
				loginSuccess(cookie);
				break;
		}
	} catch (error) {
		getQrStatusFailed();
	}
}, 2000);

// 二维码失效后操作
const isNeedMask = ref<boolean>(false);
const qrInvalid = throttle(async () => {
	isNeedMask.value = true;
	toast("二维码已失效", {
		type: "error",
		timeout: 4000,
	});
	if (await createQR()) {
		isNeedMask.value = false;
	}
}, 4000);

// 登录成功后操作
const loginSuccess = async (cookie: string) => {
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
	emit("loginSuccess");
};

// 获取二维码状态失败
const getQrStatusFailed = throttle(() => {
	toast("获取二维码状态失败", {
		type: "error",
		timeout: 4000,
	});
}, 4000);
</script>
<style scoped lang="less">
@import "style/common.less";
.back {
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	.imageBox {
		margin: 0 auto;
		width: 200px;
		height: 200px;
		box-shadow: var(--el-box-shadow-light);
		border-radius: var(--el-border-radius-base);
		overflow: hidden;
		.image {
			width: 200px;
			height: 200px;
		}
		.mark {
			&::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) 50%/50%;
			}
		}
	}

	p {
		text-align: center;
	}
}
</style>
