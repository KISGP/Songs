<template>
	<div id="container" ref="container">
		<div
			id="inner"
			ref="inner"
			@mousemove="mousemove"
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
// TODO: 需要优化，当页面存在大量这个组件时可能会造成卡顿
import { ref, onMounted } from "vue";

const props = withDefaults(
	defineProps<{
		width?: string;
		height?: string;
		rate?: number;
	}>(),
	{
		width: "160px",
		height: "160px",
		rate: 1,
	}
);

const container = ref<HTMLElement>();
const inner = ref<HTMLElement>();

// XY为鼠标相对container的象限坐标
const X = ref(0);
const Y = ref(0);
const transform = ref("");
const update = (event: MouseEvent, specifiedX?: number, specifiedY?: number) => {
	if (specifiedX != undefined && specifiedY != undefined) {
		X.value = specifiedX;
		Y.value = specifiedY;
	} else {
		X.value = event.offsetX - container.value!.offsetWidth / 2;
		Y.value = (event.offsetY - container.value!.offsetHeight / 2) * -1;
	}
	transform.value = `rotateY(${(X.value / inner.value!.offsetHeight) * props.rate}deg) rotateX(${
		(Y.value / inner.value!.offsetWidth) * props.rate
	}deg)`;
};

const mouseenter = (event: MouseEvent) => {
	update(event);
};

let lastTime: number = Date.now();
const mousemove = (event: MouseEvent) => {
	let nowTime: number = Date.now();
	if (nowTime - lastTime > 100) {
		update(event);
		lastTime = nowTime;
	}
};
const mouseleave = (event: MouseEvent) => {
	update(event, 0, 0);
};
</script>
<style scoped lang="less">
#container {
	perspective: 25px;
}

#inner {
	width: v-bind(width);
	height: v-bind(height);
	transform: v-bind(transform);
	transition: transform 0.5s;
	-webkit-transition: transform 0.5s;
	-moz-transition: transform 0.5s;
	-o-transition: transform 0.5s;
	&:hover {
		transform: scale(1.15) v-bind(transform);
		box-shadow: 2px 2px 50px rgba(0, 0, 0, 0.2);
	}
}
</style>
