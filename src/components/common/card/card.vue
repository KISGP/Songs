<template>
	<div class="image-box">
		<div class="image">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, PropType } from "vue";

const props = defineProps({
	width: {
		type: String as PropType<string>,
		default: "160px",
	},
});
</script>
<style scoped lang="less">
@import "style/common.less";
@width: v-bind(width);
.image-box {
	position: relative;
	z-index: 10;
	.image {
		cursor: pointer;
		position: relative;
		.size(@width,@width);
		border-radius: 5px;
		&:hover::after {
			content: "";
			position: absolute;
			top: 10%;
			.size();
			background: inherit;
			transform: scale(1.1);
			background-size: 100% 100%;
			filter: blur(10px) brightness(1) opacity(0.8);
			z-index: -1;
		}
	}
}
</style>
