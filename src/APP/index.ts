import { setCssVarS } from "utils/utils-common";
import { getAll, getItem } from "utils/storage";
import { useUserStore, useSongStore, useDataStore } from "store/index";
import { getUserInfo, getLikedSongsID, getMyList } from "service/api/api";
import { listBriefType } from "@/interface/interface";
import { themeType } from "@/interface/interface";

// 检查用户信息是否完整并挂载到pinia
export async function fixUserInfo() {
	const UserStore = useUserStore();
	const { cookie, id, name } = getAll();
	if (cookie) {
		UserStore.update_cookie(cookie);
		if (id && name) {
			UserStore.update_id(parseInt(id));
			UserStore.update_name(name);
		} else {
			const user = await getUserInfo();
			UserStore.update_id(parseInt(user.id));
			UserStore.update_name(user.name);
		}
		UserStore.update_login(true);
	} else {
		UserStore.update_login(false);
	}
}

// 获取喜欢的音乐列表
export async function getLikedSongs() {
	// const id = getItem("id");
	// id &&
	// 	useSongStore().update_likedSongsID(async (likedSongsID) => {
	// 		await (
	// 			await getLikedSongsID(parseInt(id))
	// 		).forEach((id: number) => {
	// 			likedSongsID.push(id);
	// 		});
	// 	});
}

// 获取我创建的歌单
export async function getMyCreateList() {
	// const SongStore = useSongStore();
	// const id = getItem("id");
	// const name = getItem("name");
	// if (id && name) {
	// 	getMyList(parseInt(id), name, "created").then((res: listBriefType[]) => {
	// 		res.forEach((item: listBriefType) => {
	// 			SongStore.push_myCreatedList(item);
	// 			SongStore.push_myCreatedListID(item.id);
	// 		});
	// 	});
	// }
}

// 初始化主题
export function initTheme() {
	const data = useDataStore();
	data.updateTheme((getItem("theme") as themeType) || data.theme);
}
