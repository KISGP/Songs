<template>
	<svg class="svg-icon" v-bind="$attrs" :style="{ color: color }">
		<use :xlink:href="iconName" :href="iconName" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: "",
	},
});
const iconName = computed(() => `#icon-${props.name}`);
</script>

<style scoped>
.svg-icon {
	fill: currentColor;
	vertical-align: middle;
}
</style>
