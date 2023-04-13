<template>
	<div class="artists" v-for="(item, index) in props.artists?.slice(0, maxArtists)">
		<span @click.stop="to(item.id)" class="artist"> {{ item.name }}</span>
		<span>{{ index < Math.min(maxArtists, artists?.length as number) - 1 ? " / " : "" }}</span>
	</div>
	<span v-if="maxArtists < (artists?.length as number)"> ......</span>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { artistType } from "@/interface/interface";
const router = useRouter();
const props = defineProps({
	artists: {
		type: Array as PropType<Array<artistType>>,
		require: true,
	},
	maxArtists: {
		type: Number as PropType<number>,
		require: false,
		default: 6,
	},
});

const to = (id: any): void => {
	router.push(`/singer/${id}`);
};
</script>
<style scoped lang="less">
.artists {
	display: inline;
	.artist {
		&:hover {
			cursor: pointer;
			color: var(--theme-color);
		}
	}
}
</style>
