import { themeType } from "@/interface/interface";

// 存储数据的key
type localStorageType = "cookie" | "id" | "name" | "theme" | "firstSearch";

// 判断浏览器是否支持 LocalStorage 存储
export function isSupportLocalStorage() {
	if (!window.localStorage) {
	}
}

// 储存数据
export const setItem = (key: localStorageType, value: string): void => {
	window.localStorage.setItem(key, value);
};

// 获取指定数据
export function getItem(key: localStorageType): string | null {
	return window.localStorage.getItem(key);
}

// 获取所有数据
export function getAll(): { [key: string]: string } {
	let r: { [key: string]: string } = {};
	for (let i = 0; i < window.localStorage.length; i++) {
		const key: string = window.localStorage.key(i) || "";
		r[key] = getItem(key as localStorageType) || "";
	}
	return r;
}

// 删除指定缓存数据
export function removeItem(key: localStorageType): void {
	window.localStorage.removeItem(key);
}

// 删除多个缓存数据
export function removeItemS(keys: Array<localStorageType>): void {
	keys.forEach((key) => {
		window.localStorage.removeItem(key);
	});
}

// 删除所有缓存数据
export function removeAll(): void {
	window.localStorage.clear();
}
