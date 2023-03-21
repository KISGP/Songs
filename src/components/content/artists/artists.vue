<template>
	<div class="artists" v-for="(item, index) in props.artists">
		<span @click="to(item.id)" class="artist"> {{ item.name }}</span>
		<span>{{ index < props.artists!.length - 1 ? " / " : "" }}</span>
	</div>
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
