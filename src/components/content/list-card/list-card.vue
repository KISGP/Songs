<template>
	<div class="card">
		<div class="image-box" @click="to">
			<!-- 歌单封面 -->
			<div class="image"></div>
			<!-- 播放量 -->
			<div class="data">
				<div>
					<el-icon><VideoPlay /></el-icon>
					<span>{{ handlePeopleCount(list.playCount.toString()) }}</span>
				</div>
				<span style="padding-right: 5px">{{ list.songCount + "首" }}</span>
			</div>
		</div>
		<!-- 歌单名 -->
		<div class="name">{{ list.name }}</div>
	</div>
</template>
<script setup lang="ts">
import { ref, PropType } from "vue";
import { handlePeopleCount } from "@/utils/utils-common";
import { listBriefType } from "@/interface/interface";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
	list: {
		type: Object as PropType<listBriefType>,
		required: true,
	},
	width: {
		type: String,
		default: "160px",
	},
});
const bg = ref<string>(`url(${props.list.cover})`);
const to = () => {
	router.push(`/list/${props.list.id}`);
};
</script>
<style scoped lang="less">
@import "style/common.less";
@width: v-bind(width);
.card {
	position: relative;
	padding: 0;
	margin: 0;
	width: @width;
}
.image-box {
	position: relative;
	z-index: 10;
	.image {
		cursor: pointer;
		position: relative;
		.size(@width,@width);
		border-radius: 5px;
		object-fit: cover;
		background: v-bind(bg);
		background-size: 100% 100%;
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
	.data {
		position: absolute;
		bottom: 0;
		width: 100%;
		.flex-layout(row,space-between);
		border-radius: 5px;
		color: rgb(255, 255, 255);
		opacity: 0.8;
		background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
		font-size: smaller;
		& > div,
		& > :nth-child(2) {
			padding-left: 5px;
		}
	}
}
.name {
	font-size: 15px;
}
</style>
