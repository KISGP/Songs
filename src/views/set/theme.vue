<template>
	<div class="back">
		<el-space wrap size="large" alignment="flex-start">
			<div class="pre" style="background-color: #fff" @click="store.updateTheme('light')">
				<span style="color: rgb(48, 49, 51)">浅色</span>
			</div>
			<div class="pre" style="background-color: #1b1b1b" @click="store.updateTheme('dark')">
				<span style="color: rgb(186, 186, 186)">深色</span>
			</div>
			<div class="pre dark2" @click="store.updateTheme('dark2')">
				<span style="color: rgb(186, 186, 186)">深色图片</span>
			</div>
			<div class="pre light2" @click="store.updateTheme('light2')">
				<span style="color: rgb(48, 49, 51)">浅色图片</span>
			</div>
		</el-space>
	</div>
</template>
<script setup lang="ts">
import { useDataStore } from "store/index";
import { themeType } from "@/interface/interface";
const store = useDataStore();

</script>
<style scoped lang="less">
.back {
	position: relative;
	margin: 2% 5%;
	.pre {
		cursor: pointer;
		position: relative;
		display: inline-block;
		width: 240px;
		height: 160px;
		border-radius: 15px;
		background-size: 100% 100%;
		background-position: right;
		border: 1px solid var(--theme-color);
		& > span {
			position: absolute;
			font-size: 20px;
			right: 20px;
			bottom: 10px;
			backdrop-filter: blur(10px);
			border-radius: 7px;
			overflow: hidden;
			padding: 3px 2px;
		}
	}
	.dark2 {
		background-image: url(../../assets/img/dark.png);
	}
	.light2 {
		background-image: url(../../assets/img/light.jpg);
	}
	.save {
		margin: 20px;
	}
}
</style>
