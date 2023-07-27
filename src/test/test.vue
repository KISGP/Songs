<template>
	<div class="card">
		<div class="cover">
			<el-image
				class="img"
				src="https://fastly.picsum.photos/id/560/264/148.jpg?hmac=qy0idchBlve27kf7vYCo-mdU2Oy7x5--jg9LtCfOsME"
				fit="cover"
				loading="lazy"
			/>
			<div class="data">
				<div>
					<span>123</span>
					<span>456</span>
				</div>
			</div>
		</div>
		<div class="title">
			标题
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const cover = computed(() => {
	return "https://picsum.photos/264/148";
});
const width = computed(() => {
	return "264px";
});
const height = computed(() => {
	return "168px";
});
</script>
<style scoped lang="less">
.card {
	width: v-bind(width);
	border-radius: 7px;
	background-color: var(--dark-fill);
	.cover {
		position: relative;
		width: 100%;
		height: v-bind(height);
		border-radius: 7px;
		overflow: hidden;
		.img {
			width: 100%;
			height: 100%;
		}
		.data {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 100%;
			border-image: linear-gradient(#00000000 75%, #000000) 50%/50%;
			display: flex;
			flex-direction: column-reverse;
			& > div {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	.title {
		font-size: 18px;
		margin-top: 10px;
		font-weight: bolder;
	}
}
</style>
