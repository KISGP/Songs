<template>
	<div
		class="comment"
		v-for="(comment, index) in comments"
		:key="comment.id"
	>
		<div class="user">
			<!-- 用户名头像 -->
			<div>
				<el-image :src="comment.user.cover" class="avatar" loading="lazy" />
				<span>{{ comment.user.name }}</span>
			</div>
			<!-- 点赞 -->
			<!-- TODO: 添加点赞动画 -->
			<div :class="{ 'like-base': true, like: comment.liked }" @click="like(index)">
				<el-icon><svg-icon name="good" /></el-icon>
				<span>{{ comment.likeCount }}</span>
			</div>
		</div>
		<!-- 评论内容 -->
		<div class="content">
			<span>{{ comment.content }}</span>
		</div>
		<!-- 评论时间 -->
		<div class="footer">
			<span>{{ comment.time }}</span>
			<span v-if="comment.replayCount > 0" @click="showFloorComment(index)">
				<span>显示更多回复 {{ comment.replayCount }}</span>
			</span>
		</div>
	</div>

	<el-drawer v-model="floorVisible" :append-to-body="true" :with-header="false">
		<commentFloor :parentComment="floorComment!" :id="id" :type="type" />
	</el-drawer>
</template>
<script setup lang="ts">
import { ref, PropType } from "vue";
import { likeComment } from "service/api/api";
import { commentType, resources } from "@/interface/interface";
import commentFloor from "./comment-floor.vue";

const props = defineProps({
	comments: {
		type: Array as PropType<Array<commentType>>,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	type: {
		type: String as PropType<resources>,
		required: true,
	},
});

const like = async (index: number) => {
	likeComment(
		props.id,
		props.comments[index].id,
		props.comments[index].liked ? 0 : 1,
		props.type
	).then((res: boolean) => {
		if (res) {
			props.comments[index].liked = !props.comments[index].liked;
		}
	});
};
const floorVisible = ref<boolean>(false);
const floorComment = ref<commentType>();
const showFloorComment = (index: number) => {
	floorVisible.value = !floorVisible.value;
	floorComment.value = props.comments[index];
};
</script>
<style scoped lang="less" src="./style/style.less"></style>
