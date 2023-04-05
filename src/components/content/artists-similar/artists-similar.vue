<template>
	<el-scrollbar :height="height">
		<el-space wrap size="large" alignment="flex-start">
			<div class="back" v-for="item in similarArtists" @click="to(item.id)">
				<el-image class="img" :src="item.cover" fit="cover" loading="lazy"/>
				<span>{{ item.name }}</span>
			</div>
		</el-space>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import type { artistBriefType } from "@/interface/interface";

const router = useRouter();

const props = defineProps({
	similarArtists: {
		type: Array as PropType<Array<artistBriefType>>,
		required: true,
	},
});

const height = window.innerHeight / 2;
const to = (id: any): void => {
	router.push(`/singer/${id}`);
};
</script>
<style scoped lang="less">
.back {
	display: flex;
	align-items: center;
	height: 100px;
	width: 220px;
	color: var(--primary-text);
	background-color: var(--dark-fill);
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		color: var(--theme-color);
	}
	.img {
		width: 80px;
		height: 80px;
		border-radius: 5px;
	}
	& > span {
		text-align: center;
		flex-grow: 1;
	}
}
</style>
