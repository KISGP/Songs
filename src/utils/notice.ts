import { useToast } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";
import { ElMessage, MessageParams } from "element-plus";
import "element-plus/es/components/message/style/css";

interface optionType extends Omit<ToastOptions, "type"> {
	type?: "success" | "error" | "default" | "info" | "warning";
}

/**
 * @description 来源于第三方库的通知组件封装 https://vue-toastification.maronato.dev/
*/
export function toast(msg: string, option: optionType = {}) {
	useToast()(msg, option as ToastOptions);
}

/**
 * @description ElementPlus的消息提示封装
*/
export function message(
	option: MessageParams & {
		message: string;
		duration?: number;
		type?: "success" | "warning" | "info" | "error";
	}
) {
	ElMessage(option);
}