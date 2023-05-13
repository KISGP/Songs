import { useToast } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";
import { ElMessage, MessageParams } from "element-plus";
import "element-plus/es/components/message/style/css";

interface optionType extends Omit<ToastOptions, "type"> {
	type?: "success" | "error" | "default" | "info" | "warning";
}
export function toast(msg: string, option: optionType = {}) {
	useToast()(msg, option as ToastOptions);
}

export function message(
	option: MessageParams & {
		message: string;
		type?: "success" | "warning" | "info" | "error";
	}
) {
	ElMessage(option);
}
