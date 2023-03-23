export type themeType = { [key: string]: string };
export type themes = "LIGHT" | "LIGHT2" | "DARK" | "DARK2";

export const LIGHT: themeType = {
	"--primary-text": "#303133",
	"--regular-text": "#606266",
	"--secondary-text": "#909399",
	"--theme-color": "#409eff",
	"--global-bg": "#FFFFFF",
	"--global-filter": "none",
	"--darker-fill": "#E6E8EB",
	"--dark-fill": "#EBEDF0",
	"--base-fill": "#F0F2F5",
	"--light-fill": "#F5F7FA",
	"--lighter-fill": "#FAFAFA",
	"--table-bg-color": "transparent",
	"--table-bg-color-hover": "#ecf5fffd",
	"--table-border-color": "#ebeef5",
	"--menu-bg-color-hover": "#ecf5ff",
	"--footer-player-bg-color": "#ffffff",
	"--footer-player-border-color": "#dcdfe6",
	"--album-card-bg-color":"rgba(255,255,255,0.7)"
};

export const LIGHT2: themeType = {
	"--primary-text": "#303133",
	"--regular-text": "#606266",
	"--secondary-text": "#909399",
	"--theme-color": "#409eff",
	"--global-bg": `url(${require("../assets/img/light.jpg")})`,
	"--global-filter": "none",
	"--darker-fill": "#E6E8EB",
	"--dark-fill": "#EBEDF0",
	"--base-fill": "#F0F2F5",
	"--light-fill": "#F5F7FA",
	"--lighter-fill": "#FAFAFA",
	"--table-bg-color": "transparent",
	"--table-bg-color-hover": "rgba(236, 245, 255, 0.6)",
	"--table-border-color": "transparent",
	"--menu-bg-color-hover": "#ecf5ff",
	"--footer-player-bg-color": "#ffffff",
	"--footer-player-border-color": "#dcdfe6",
	"--album-card-bg-color":"rgba(255,255,255,0.7)"
};

export const DARK: themeType = {
	"--primary-text": "#e0e0e0",
	"--regular-text": "#b9b9b9",
	"--secondary-text": "#A3A6AD",
	"--theme-color": "#409eff",
	"--global-bg": "rgb(20, 20, 20)",
	"--global-filter": "none",
	"--darker-fill": "#424243",
	"--dark-fill": "#39393A",
	"--base-fill": "#303030",
	"--light-fill": "#262727",
	"--lighter-fill": "#1D1D1D",
	"--table-bg-color": "transparent",
	"--table-bg-color-hover": "#39393A",
	"--table-border-color": "transparent",
	"--menu-bg-color-hover": "#39393A",
	"--footer-player-bg-color": "#242424",
	"--footer-player-border-color": "transparent",
	"--album-card-bg-color":"rgba(31,31,31,0.7)"
};
export const DARK2: themeType = {
	"--primary-text": "#e0e0e0",
	"--regular-text": "#b9b9b9",
	"--secondary-text": "#A3A6AD",
	"--theme-color": "#409eff",
	"--global-bg": `url(${require("../assets/img/dark.png")})`,
	"--global-filter": "none",
	"--darker-fill": "#424243",
	"--dark-fill": "#39393A",
	"--base-fill": "#303030",
	"--light-fill": "#262727",
	"--lighter-fill": "#1D1D1D",
	"--table-bg-color": "transparent",
	"--table-bg-color-hover": "rgba(57, 57, 57, 0.6)",
	"--table-border-color": "transparent",
	"--menu-bg-color-hover": "#39393A",
	"--footer-player-bg-color": "#242424",
	"--footer-player-border-color": "transparent",
	"--album-card-bg-color":"rgba(31,31,31,0.7)"
};
