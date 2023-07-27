<template>
	<div class="artists" v-if="props.singers">
		<template v-for="(item, index) in props.singers" :key="item.id">
			<span @click.stop="to(item.id)" class="artist"> {{ item.name }}</span>
			<span>{{ index < props.singers.length - 1 ? " / " : "" }}</span>
		</template>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { singer } from "type/type";
const router = useRouter();
const props = defineProps<{
	singers: singer[] | undefined;
	maxSingers?: number;
}>();

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
