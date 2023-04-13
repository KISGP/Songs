<template>
	<div class="back" @click="play">
		<div class="cover">
			<el-image class="img" :src="data?.cover" fit="cover" lazy />
			<div class="count">
				<span>
					<el-icon><VideoPlay /></el-icon>
					{{ data?.playCount }}
				</span>
				<span>{{ ms2min(data?.duration!) }}</span>
			</div>
		</div>
		<div class="title">
			<span>{{ data?.name }}</span>
		</div>
		<div class="info">
			<span>{{ data?.artist.name }}</span>
			<span>{{ data?.publishTime }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { ms2min } from "utils/utils-common";
import { videoType } from "@/interface/interface";
import { getMVUrl } from "service/api/api";

const props = defineProps({
	w: {
		type: Number as PropType<number>,
		required: false,
		default: 260,
	},
	data: {
		type: Object as PropType<videoType>,
		required: true,
	},
});
const width: string = props.w + "px";
const height: string = props.w * (9 / 16) + "px";

const play = async () => {
	window.open(await getMVUrl(props.data.id), "_blank");
};
</script>
<style scoped lang="less">
.back {
	display: inline-block;
	width: v-bind(w);
	border-radius: 5px;
	overflow: hidden;
	background-color: var(--dark-fill);
	color: var(--primary-text);
	padding-bottom: 4px;
	max-width: v-bind(width);
	&:hover {
		background-color: var(--darker-fill);
	}
	.cover {
		position: relative;
		border-radius: 5px;
		width: v-bind(width);
		height: v-bind(height);
		.img {
			cursor: pointer;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			overflow: hidden;
		}
		.count {
			position: absolute;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			bottom: 0;
			color: rgb(255, 255, 255);
			opacity: 0.8;
			background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgb(0, 0, 0) 100%);
			font-size: 0.8rem;
			& > span {
				display: flex;
				align-items: center;
				padding: 0 5px;
			}
		}
	}

	.title {
		cursor: pointer;
		padding: 3px 10px;
		font-size: 1.1rem;
	}
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--secondary-text);
		& > span {
			padding: 0 10px;
			font-size: 0.8rem;
		}
		& > span:nth-child(1):hover {
			cursor: pointer;
			color: var(--theme-color);
		}
	}
}
</style>
