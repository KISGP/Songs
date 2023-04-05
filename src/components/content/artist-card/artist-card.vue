<template>
	<div class="card" @click="router.push(`/singer/${data.id}`)">
		<el-image class="img" :src="data.cover" fit="cover" lazy />
		<span>{{ data.name }}</span>
    <i v-for="item in data.alias">{{ item }}</i>
	</div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { artistBriefType } from "@/interface/interface";
const router = useRouter();
const props = defineProps({
	data: {
		type: Object as PropType<artistBriefType>,
		required: true,
	},
	top: {
		type: Number as PropType<number>,
		required: false,
		default: 0,
	},
});
</script>
<style scoped lang="less">
@width: 180px;
@img-width: 150px;
.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: @width;
  min-height: 258px;
	background-color: var(--light-fill);
	border-radius: 4px;
	cursor: pointer;
	margin: 1% 0;
	&:hover {
		background-color: var(--darker-fill);
	}
	.img {
		width: @img-width;
		height: @img-width;
		border-radius: 7px;
		overflow: hidden;
		margin: 10px 0;
	}
  &>span,
  &>i{
    margin: 5px 0;
  }
  &>span{
    font-size: 18px;
  }
  &>i{
    font-size: 12px;
    color: var(--secondary-text);
  }
}
</style>
