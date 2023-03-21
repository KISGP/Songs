<template>
	<el-scrollbar>
		<div
			class="comment"
			v-infinite-scroll="load"
			:infinite-scroll-immediate="false"
			:infinite-scroll-distance="100"
			:infinite-scroll-delay="500"
		>
			<div class="user">
				<!-- 用户名头像 -->
				<div>
					<el-image :src="parentComment?.user.cover" class="avatar" loading="lazy" />
					<span>{{ parentComment?.user.name }}</span>
				</div>
				<!-- 点赞 -->
				<div :class="{ 'like-base': true, like: parentComment?.liked }">
					<el-icon><svg-icon name="good" /></el-icon>
					<span>{{ parentComment?.likeCount }}</span>
				</div>
			</div>
			<!-- 评论内容 -->
			<div class="content">
				<span>{{ parentComment?.content }}</span>
			</div>
			<!-- 评论时间 -->
			<div class="footer">
				<span>{{ parentComment?.time }}</span>
			</div>
		</div>
		<h4>全部回复 {{ parentComment.replayCount }}</h4>
		<div class="comment" v-for="(comment, index) in replay" :key="comment.id">
			<div class="user">
				<!-- 用户名头像 -->
				<div>
					<el-image :src="comment.user.cover" class="avatar" loading="lazy" />
					<span>{{ comment.user.name }}</span>
				</div>
				<!-- 点赞 -->
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
			</div>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, PropType, onMounted, onUpdated } from "vue";
import { getFloorComments, likeComment } from "service/api/api";
import { commentType, resources } from "@/interface/interface";
const props = defineProps({
	parentComment: {
		type: Object as PropType<commentType>,
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
const replay = ref<Array<commentType>>([]);

onMounted(async () => {
	replay.value = await getFloorComments(props.parentComment.id, props.id, props.type);
});
onUpdated(async () => {
	replay.value = [];
	replay.value = await getFloorComments(props.parentComment.id, props.id, props.type);
});
const like = async (index: number) => {
	likeComment(props.id, replay.value[index].id, replay.value[index].liked ? 0 : 1, props.type).then(
		(res: boolean) => {
			if (res) {
				replay.value[index].liked = !replay.value[index].liked;
			}
		}
	);
};

const load = () => {
	console.log(213);
};
</script>
<style scoped lang="less" src="./style/style.less"></style>
