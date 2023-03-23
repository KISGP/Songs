import { setCssVar, setCssVarS, wait } from "utils/utils-common";
import { getAll, getItem } from "utils/storage";
import { useUserStore, useSongStore } from "store/index";
import { getUserInfo, getLikedSongsID, getMyList } from "service/api/api";
import { listBriefType } from "@/interface/interface";
import { DARK, DARK2, LIGHT, LIGHT2 } from "@/constant/theme";
// 修改播放器样式
export async function updatePlayerStyle(status: "hidden" | "max" | "min") {
	if (status === "hidden") {
		setCssVar("--height-content", "94vh");
		setCssVar("--height-player", "0vh");
	} else if (status === "min") {
		setCssVar("--height-player", "8vh");
		await wait(600);
		setCssVar("--height-content", "86vh");
	} else if (status === "max") {
		setCssVar("--height-player", "100vh");
	}
}

// 检查用户信息是否完整并挂载到pinia
export async function fixUserInfo() {
	const UserStore = useUserStore();
	const { cookie, id, name } = getAll();
	if (cookie) {
		UserStore.update_cookie(cookie);
		if (id && name) {
			UserStore.update_id(id);
			UserStore.update_name(name);
		} else {
			const user = await getUserInfo();
			UserStore.update_id(user.id);
			UserStore.update_name(user.name);
		}
		UserStore.update_login(true);
	} else {
		UserStore.update_login(false);
	}
}

// 获取喜欢的音乐列表
export async function getLikedSongs() {
	getItem("id") &&
		useSongStore().update_likedSongsID(async (likedSongsID) => {
			await (
				await getLikedSongsID(getItem("id")!)
			).forEach((id: number) => {
				likedSongsID.push(id);
			});
		});
}

export async function getMyCreateList() {
	const UserStore = useUserStore();
	const SongStore = useSongStore();
	await (
		await getMyList(UserStore.netease_id, UserStore.netease_name, "created")
	).forEach((item: listBriefType) => {
		SongStore.push_myCreatedList(item);
		SongStore.push_myCreatedListID(item.id);
	});
}

// 初始化主题
export function initTheme() {
	switch (getItem("theme") || "DARK2") {
		case "DARK":
			setCssVarS(DARK);
			break;
		case "DARK2":
			setCssVarS(DARK2);
			break;
		case "LIGHT":
			setCssVarS(LIGHT);
			break;
		case "LIGHT2":
			setCssVarS(LIGHT2);
			break;
	}
}
