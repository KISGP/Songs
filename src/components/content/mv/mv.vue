<template>
	<div class="card" @click="play">
		<div class="cover">
			<el-image class="img" :src="data?.cover?.url" fit="fill" loading="lazy" />
			<div class="data">
				<div>
					<span>
						<el-icon><VideoPlay /></el-icon>
						{{ data?.playCount }}
					</span>
					<span>{{ ms2min(data?.duration!) }}</span>
				</div>
			</div>
		</div>
		<div class="title _ellipsis">
			{{ data?.name }}
		</div>
		<div class="info">
			<span>{{ data?.singer.name }}</span>
			<span>{{ data?.publishTime }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { mv } from "type/type";
import { MV } from "service/api";
import { ms2min } from "utils/utils-common";

const props = defineProps<{
	data?: mv;
}>();

const width = computed(() => {
	return typeof props.data?.cover?.size === "number"
		? props.data?.cover?.size
		: props.data?.cover?.size.w;
});
const height = computed(() => {
	return typeof props.data?.cover?.size === "number"
		? props.data?.cover?.size
		: props.data?.cover?.size.h;
});

const play = async () => {
	window.open(await MV.getUrl(props.data!.id), "_blank");
};
</script>
<style scoped lang="less">
@w: 264px;
@h: 168px;
.card {
	width: @w;
	max-width: @w;
	border-radius: 7px;
	background-color: var(--dark-fill);
	&:hover{
		color: var(--theme-color);
		background-color: var(--darker-fill);
	}
	.cover {
		cursor: pointer;
		position: relative;
		width: 100%;
		height: v-bind(height);
		border-radius: 7px;
		overflow: hidden;
		.img {
			width: @w;
			height: @h;
		}
		.data {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 100%;
			border-image: linear-gradient(#00000000 75%, #000000) 50%/50%;
			display: flex;
			flex-direction: column-reverse;
			& > div {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: var(--secondary-text);
			}
		}
	}
	.title {
		width: @w;
		max-width: @w;
		margin: 3px 5px;
		font-size: 18px;
		font-weight: bolder;
	}
	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--regular-text);
		& > span {
			margin: 3px 5px;
		}
	}
}
</style>
