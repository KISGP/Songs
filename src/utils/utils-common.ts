// 等待（ms）
export function wait(ms: number): Promise<null> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// 防抖
export function debounce(func: any, delay: number): () => void {
	let timer: ReturnType<typeof setTimeout>;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(func, delay);
	};
}
// 节流
export function throttle(fn: any, delay: number): () => void {
	let lastTime: number = Date.now();
	return function () {
		let nowTime: number = Date.now();
		if (nowTime - lastTime > delay) {
			fn();
			lastTime = nowTime;
		}
	};
}
export function throttle2(fn: any, delay: number): () => void {
	let status: boolean = true;
	return function () {
		if (status) {
			status = false;
			setTimeout(() => {
				fn();
				status = true;
			}, delay);
		}
	};
}

// 时间戳转换
export function transformTimeStamp(number: number | string): string {
	if (!Number.isFinite(number)) {
		number = parseInt(number as string);
	}
	let date = new Date(number);
	let Y = date.getFullYear() + "-";
	let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
	let D = date.getDate() + " ";
	let h = date.getHours() + ":";
	let m = date.getMinutes() + ":";
	let s = date.getSeconds();
	return Y + M + D + h + m + s;
}

// 时间格式转换 s to min
export function s2min(s: number): string {
	let result: string;
	s = parseInt(s.toFixed(0));
	let first: number = Math.floor(s / 60);
	let last: number = s % 60;
	if (first < 10) {
		if (last < 10) {
			result = `0${first}:0${last}`;
		} else {
			result = `0${first}:${last}`;
		}
	} else {
		if (last < 10) {
			result = `${first}:0${last}`;
		} else {
			result = `${first}:${last}`;
		}
	}
	return result;
}
// 时间格式转换 ms to min
export function ms2min(ms: number): string {
	return s2min(ms / 1000);
}

/**
 * @description 处理人数(收藏、播放)
 * @param people 人数
 * @param decimal 保留小数位
 * */
export function handlePeopleCount(people: string | number, decimal: number = 2): string {
	const fixedDecimal = Math.pow(10, decimal);
	if (typeof people == "number") {
		people = people.toString();
	}
	let length: number = people.length;
	let count: number = parseInt(people);
	let result: string = "";

	if (length <= 4) {
		result = count.toString();
	} else if (length >= 5 && length <= 7) {
		result = Math.floor((count / 10000) * fixedDecimal) / fixedDecimal + "万";
	} else if (length == 8) {
		result = Math.floor((count / 10000000) * fixedDecimal) / fixedDecimal + "千万";
	} else if (length >= 9) {
		result = Math.floor((count / 100000000) * fixedDecimal) / fixedDecimal + "亿";
	}
	return result;
}

// 获取CSS变量
export function getCssVar(key: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(key);
}

// 设置CSS变量(单个)
export function setCssVar(key: string, value: string, isImportant?: string | boolean | null): void {
	document.documentElement.style.setProperty(key, value, isImportant ? "important" : "");
}

/**
 * 设置CSS变量(多个)
 * @param css_S CSS变量数组，[[key, value, isImportant],]
 */
export function setCssVarS(css_S: Array<[string, string, string | boolean]>): void {
	css_S.forEach((css) => {
		setCssVar(css[0], css[1], css[2]);
	});
}

// 失去焦点时改变网页标题
export function updateWebTitle(): void {
	document.addEventListener("visibilitychange", function () {
		if (document.visibilityState === "visible") {
			document.title = "Title";
		} else {
			document.title = "ԅ(¯﹃¯ԅ)你去哪了";
		}
	});
}
