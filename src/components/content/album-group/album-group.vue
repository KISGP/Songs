<template>
	<el-space wrap :size="props.size || 60" alignment="flex-start">
		<div class="card" v-for="item in props.data" :key="item.id">
			<albumCard @click="router.push(`/album/${item.id}`)">
				<el-image class="img" :src="item.cover?.url" fit="cover" loading="lazy" />
			</albumCard>
			<span class="name _ellipsis" :title="item.name">
				{{ item.name }}
			</span>
			<span class="artist _ellipsis" :title="item.singers?.singersNameStr">
				{{ item.singers?.singersNameStr }}
			</span>
		</div>
	</el-space>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { album } from "type/type";
import albumCard from "components/common/card-3D/card-3D.vue";
const router = useRouter();

const props = defineProps<{
	data?: album[];
	size?: number;
}>();
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
