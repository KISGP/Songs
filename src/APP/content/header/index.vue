<template>
	<div class="header">
		<div>
			<span class="logo">Songs</span>
		</div>
		<div>
			<search />
		</div>
		<div>
			<div>
				<el-icon size="25" @click="router.go(1)"><ArrowRightBold /></el-icon>
			</div>
			<div>
				<el-icon size="25" @click="router.go(-1)"><ArrowLeftBold /></el-icon>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import search from "components/content/search-input/index.vue";
const router = useRouter();
</script>
<style scoped lang="less">
@import "style/common.less";
.header {
	height: 100%;
	.flex-layout(space-around);
	& > :nth-child(1) {
		flex-grow: 1;
	}
	& > :nth-child(2) {
		flex-grow: 8;
	}
	& > :nth-child(3) {
		flex-grow: 2;
		display: flex;
		flex-direction: row-reverse;

		& > div {
			.flex-centerY();
			color: var(--secondary-text);
			&:hover {
				cursor: pointer;
				border-radius: 3px;
				background-color: rgba(204, 209, 219, 0.33);
			}
		}
		& > div:nth-child(1) {
			margin-right: 25px;
		}
		& > div:nth-child(2) {
			margin: 0 25px;
		}
	}
	.logo {
		color: var(--primary-text);
		.flex-centerX();
		font-size: 22px;
		line-height: 6vh;
		font-weight: 800;
		font-family: Georgia, serif;
	}
}
</style>
