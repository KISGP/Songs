import axios from "axios";
import { artistType } from "../interface/interface";
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

// 获取时间戳
export function getTimeStamp(): number {
	return new Date().getTime();
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
