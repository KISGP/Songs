const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

module.exports = defineConfig({
	transpileDependencies: true,
	productionSourceMap:false,
	configureWebpack: {
		resolve: {
			alias: {
				'views': '@/views',
				'components': '@/components',
				'utils':"@/utils",
				'store':"@/store",
				'service':"@/service",
				'router':"@/router",
				'assets':"@/assets",
				'style':"@/assets/style"
			},
		},
		plugins: [
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
	},
	chainWebpack: (config) => {
		config.module.rules.delete("svg"); //删除默认配置中处理svg,
		config.module
			.rule("svg-sprite-loader")
			.test(/.svg$/)
			.include.add(path.join(__dirname, "./src/assets/svg")) //处理svg目录
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
			});
	},
});
