import { ElMessage, MessageParams } from "element-plus";
import "element-plus/es/components/message/style/css";

export function showMessage(option?: MessageParams) {
	ElMessage(option);
}
export function showSuccessMessage(message: string) {
	ElMessage({
		message,
		type: "success",
	});
}

export function showErrorMessage(message: string) {
	ElMessage({
		message,
		type: "error",
	});
}
