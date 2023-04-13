<template>
	<el-space wrap :size="size" alignment="flex-start">
		<div class="card" v-for="item in data" :key="item.id">
			<albumCard @click="router.push(`/album/${item.id}`)">
				<el-image class="img" :src="item.cover" fit="cover" loading="lazy" />
			</albumCard>
			<span class="name" :title="item.name">{{ item.name }}</span>
			<span class="artist" :title="item.artists.artistsStr">{{ item.artists.artistsStr }}</span>
		</div>
	</el-space>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { albumBriefType } from "@/interface/interface";
import albumCard from "@/components/common/card-3D/card-3D.vue";
const router = useRouter();

const props = defineProps({
	data: {
		type: Array as PropType<albumBriefType[]>,
		required: true,
	},
	size: {
		type: Number as PropType<number>,
		required: false,
		default: 50,
	},
});
</script>
<style scoped lang="less">
.card {
	width: 180px;
	height: 230px;
	box-shadow: 2px 2px 50px rgba(0, 0, 0, 0.2);
	border-radius: 7px;
	background-color: var(--album-card-bg-color);
	&:hover {
		background-color: var(--base-fill);
	}
	.img {
		cursor: pointer;
		margin-top: -10px;
		margin-left: -10px;
		border-radius: 7px;
	}
	& > span {
		display: block;
		margin: 10px 5%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.name {
		font-size: 18px;
	}
	.artist {
		font-size: 12px;
		color: var(--regular-text);
	}
}
</style>
