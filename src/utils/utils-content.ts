import axios from "axios";
import "element-plus/es/components/message/style/css";

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
