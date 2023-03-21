import { defineComponent, watch } from "vue";
import { setCssVar } from "utils/utils-common";
import { getAll } from "utils/storage";
import { useUserStore } from "store/index";
import { getUserInfo } from "service/api/api";


// 修改播放器样式
export function updatePlayerStyle(status: "hidden" | "max" | "min") {
	if (status === "hidden") {
		setCssVar("--height-content", "94vh");
		setCssVar("--height-player", "0vh");
	} else if (status === "min") {
		setCssVar("--height-content", "86vh");
		setCssVar("--height-player", "8vh");
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
