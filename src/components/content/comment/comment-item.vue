<template>
	<!-- TODO: 添加评论背景卡片 -->
	<div class="comment" v-for="(comment, index) in comments" :key="comment.id">
		<div class="user">
			<!-- 用户名头像 -->
			<div>
				<el-image :src="comment.user.cover" class="avatar" loading="lazy" />
				<span>{{ comment.user.name }}</span>
			</div>
			<!-- 点赞 -->
			<!-- TODO: 添加点赞动画 -->
			<div :class="{ 'like-base': true, like: comment.isLiked }" @click="like(index)">
				<el-icon><svg-icon name="good" /></el-icon>
				<span>{{ comment.count.like }}</span>
			</div>
		</div>
		<!-- 评论内容 -->
		<div class="content">
			<span>{{ comment.content }}</span>
		</div>
		<!-- 评论时间 -->
		<div class="footer">
			<span>{{ comment.time }}</span>
			<span v-if="comment.count.replay > 0" @click="showFloorComment(index)">
				<span>显示更多回复 {{ comment.count.replay }}</span>
			</span>
		</div>
	</div>

	<el-drawer v-model="floorVisible" :append-to-body="true" :with-header="false">
		<commentFloor :parentComment="floorComment!" :id="id" :type="type" />
	</el-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { likeComment } from "service/api/api";
import { comment, resources } from "type/type";
import commentFloor from "./comment-floor.vue";

const props = defineProps<{
	comments: comment[];
	id: string;
	type: resources;
}>();

const like = async (index: number) => {
	likeComment(
		props.id,
		props.comments[index].id,
		props.comments[index].isLiked ? 0 : 1,
		props.type
	).then((res: boolean) => {
		if (res) {
			props.comments[index].isLiked = !props.comments[index].isLiked;
		}
	});
};
const floorVisible = ref<boolean>(false);
const floorComment = ref<comment>();
const showFloorComment = (index: number) => {
	floorVisible.value = !floorVisible.value;
	floorComment.value = props.comments[index];
};
</script>
<style scoped lang="less" src="./style/style.less"></style>
