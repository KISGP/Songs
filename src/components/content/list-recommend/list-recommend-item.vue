<template>
	<div class="card" v-once>
		<div>
			<div class="cover" @click="router.push(`/list/${props.list.id}`)">
				<div class="image"></div>
				<div class="data">
					<div>
						<el-icon><VideoPlay /></el-icon>
						<span>{{ formatPeopleCount(props.list.playCount) }}</span>
					</div>
					<span>{{ props.list.songCount + "首" }}</span>
				</div>
			</div>
			<div class="title">{{ props.list.name }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { list } from "type/type";
import { useRouter } from "vue-router";
import { formatPeopleCount } from "utils/tool";
const router = useRouter();

const props = defineProps<{
	list: list;
}>();

const cover = ref<string>(`url(${props.list.cover?.url})`);
</script>
<style scoped lang="less">
@width: 160px;
.card {
	position: relative;
	padding: 0;
	margin: 0;
	width: @width;
	& > div {
		width: @width;
	}
	.cover {
		cursor: pointer;
		position: relative;
		height: @width;
		width: @width;
		border-radius: 7px;
		box-shadow: var(--el-box-shadow);
		&:hover::after {
			content: "";
			z-index: 1;
			position: absolute;
			bottom: 0;
			width: @width;
			height: @width;
			background-image: v-bind(cover);
			background-repeat: no-repeat;
			background-size: cover;
			transform: scale(1.08);
			filter: blur(8px) brightness(0.8) opacity(0.8);
		}
		.image {
			position: relative;
			z-index: 2;
			width: @width;
			height: @width;
			border-radius: 7px;
			overflow: hidden;
			background-image: v-bind(cover);
			background-repeat: no-repeat;
			background-size: cover;
			&::before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				border-image: linear-gradient(#00000000 75%, #000000) 50%/50%;
			}
		}
		.data {
			z-index: 2;
			user-select: none;
			width: 92%;
			color: var(--placeholder-text);
			opacity: 0.8;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			bottom: 1%;
			left: 50%;
			transform: translateX(-50%);
			& > div {
				display: flex;
				align-items: center;
			}
		}
	}
	.title {
		padding: 5% 3% 0 3%;
		font-size: 16px;
		color: var(--regular-text);
	}
}
</style>
