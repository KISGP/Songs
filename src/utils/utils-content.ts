import axios from "axios";
import { useToast } from "vue-toastification";
import { artistType } from "../interface/interface";
import { ElMessage, MessageParams } from "element-plus";
import "element-plus/es/components/message/style/css";

// 歌手名称数组 => 字符串
export function getArtistsName(
	array: any,
	maxLength: number | null = null,
	nameKey: string = "name"
): string {
	let r: string = "";
	if (Array.isArray(array)) {
		array.forEach((e, index) => {
			r += e[nameKey];
			if (index < array.length - 1) {
				r += " / ";
			}
		});
		if (maxLength && r.length > maxLength) {
			r = r.slice(0, maxLength) + "...";
		}
	}
	return r;
}

// 返回修改后的歌手数组
export function getArtistsArray(artists: any): Array<artistType> {
	let res: Array<artistType> = [];
	artists.forEach((artist: any) => {
		res.push({
			id: artist.id,
			name: artist.name,
		});
	});
	return res;
}

// 歌词处理，返回[{time:"",content:""}]
type resultType = Array<{ time: number; content: string }>;
export function handleLyric(lyric: any): resultType {
	let result: resultType = [];
	const lyricArray = lyric.slice(lyric.indexOf("[00:")).split("\n");
	lyricArray.pop();
	lyricArray.forEach((item: string) => {
		let index = item.indexOf("]") + 1;
		const foo = item
			.slice(0, index)
			.replace(/[\[\]]+/g, "")
			.split(":");
		const time = parseInt(foo[0]) * 60 + parseFloat(parseFloat(foo[1]).toFixed(3));
		result.push({
			time: time,
			content: item.slice(index),
		});
	});
	return result;
}

// 获取时间戳
export function getTimeStamp(): number {
	return new Date().getTime();
}

export function showNotification(
	type: "success" | "warning" | "info" | "error" | "default",
	message: string
): void {
	const toast = useToast();
	switch (type) {
		case "success":
			toast.success(message);
			break;
		case "warning":
			toast.warning(message);
			break;
		case "error":
			toast.error(message);
			break;
		case "info":
			toast.info(message);
			break;
		default:
			toast(message);
			break;
	}
}

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

export function downloadFile(url: string, fileName: string) {
	axios
		.get(url, {
			responseType: "blob",
		})
		.then((res) => {
			const link = window.URL.createObjectURL(new Blob([res.data]));
			const type = url?.split(".").pop();
			let a = document.createElement("a");
			a.style.display = "none";
			a.href = link;
			a.download = fileName + "." + type;
			document.body.appendChild(a);
			a.click();
		});
}
