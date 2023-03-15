<template>
	<div class="artists" v-for="(item, index) in props.artists">
		<span @click="to(item.id)" class="artist"> {{ item.name }}</span>
		<span>{{ index < props.artists.length - 1 ? " / " : "" }}</span>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
	artists: Array as any,
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
