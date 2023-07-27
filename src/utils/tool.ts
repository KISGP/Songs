import { singer } from "@/type/type";
import { el } from "element-plus/es/locale";
import { setActivePinia } from "pinia";

/**
 * @param url - 网易云图片链接
 * @param width - 默认裁剪后的大小是 width x width
 * @param height - 当需要裁剪成其它比例时可以传入
 * @description 返回要裁剪后的图片，网易云的图片在后面加上 param 即可裁剪
 */
export function cutImg(
	url: string,
	width: number = 160,
	height?: number
):
	| {
			url: string;
			size: number;
	  }
	| undefined {
	if (url) {
		if (height) {
			return {
				url: `${url}?param=${width}y${height}`,
				// size没啥修改的必要，没有用的地方
				size: width,
			};
		} else {
			return {
				url: `${url}?param=${width}y${width}`,
				size: width,
			};
		}
	} else {
		return undefined;
	}
}

/**
 * @description 重新裁剪图片
 */
export function reCutImg(
	url: string,
	oldSize: number | { w: number; h: number },
	newSize: number | { w: number; h: number }
): string {
	let searchValue: string;
	let replaceValue: string;
	if (typeof oldSize === "number") {
		searchValue = `param=${oldSize}y${oldSize}`;
	} else {
		searchValue = `param=${oldSize.w}y${oldSize.h}`;
	}
	if (typeof newSize === "number") {
		replaceValue = `param=${newSize}y${newSize}`;
	} else {
		replaceValue = `param=${newSize.w}y${newSize.h}`;
	}
	return url.replace(searchValue, replaceValue);
}

/**
 * @param singers - 歌手数组
 * @param maxLength - 拼接后的最大长度
 * @param key - 歌手名字的键
 * @description 拼接歌手名字
 */
export function spliceSingersName(
	singers: any[],
	maxLength: number | false = false,
	key: string = "name"
): string {
	let res = singers
		.map((e) => {
			return e[key];
		})
		.join(" / ");

	if (typeof maxLength === "boolean" && !maxLength) {
		return res;
	} else {
		return res.slice(0, maxLength - 3) + "...";
	}
}

/**
 * @param singers - 歌手数组
 * @param idKey - 歌手id的键
 * @param nameKey - 歌手名字的键
 * @description 拼接歌手名字
 */
export function modifySingers(
	singers: any[],
	idKey: string = "id",
	nameKey: string = "name"
): singer[] {
	return singers.map((e): singer => {
		return {
			id: e[idKey],
			name: e[nameKey],
		};
	});
}

/**
 * @param fn 要执行的函数
 * @param delay_ms 延时(ms)
 * @description 节流函数
 * */
export function throttle(fn: any, delay_ms: number): () => void {
	let status: boolean = true;
	return function () {
		if (status) {
			fn();
			status = false;
			setTimeout(() => {
				status = true;
			}, delay_ms);
		}
	};
}

/**
 * @param count 人数
 * @param decimal 保留多少位小数
 * @description 将人数格式化成字符串
 * */
export function formatPeopleCount(count: number, decimal: number = 2): string {
	let res: string;
	if (count >= 10000 && count < 10000000) {
		res = (count / 10000).toFixed(decimal) + "万";
	} else if (count >= 10000000 && count < 100000000) {
		res = (count / 10000000).toFixed(decimal) + "千万";
	} else if (count >= 100000000) {
		res = (count / 100000000).toFixed(decimal) + "亿";
	} else {
		res = count.toString();
	}
	return res;
}
