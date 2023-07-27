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
				<div :class="{ 'like-base': true, like: parentComment?.isLiked }">
					<el-icon><svg-icon name="good" /></el-icon>
					<span>{{ parentComment?.count.like }}</span>
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
		<h4>全部回复 {{ parentComment.count.replay }}</h4>
		<div class="comment" v-for="(comment, index) in replay" :key="comment.id">
			<div class="user">
				<!-- 用户名头像 -->
				<div>
					<el-image :src="comment.user.cover" class="avatar" loading="lazy" />
					<span>{{ comment.user.name }}</span>
				</div>
				<!-- 点赞 -->
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
			</div>
		</div>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
import { COMMENT } from "service/api/index";
import { comment, resources } from "type/type";

const props = defineProps<{
	parentComment: comment;
	id: string;
	type: resources;
}>();

const replay = ref<comment[]>([]);

onMounted(async () => {
	replay.value = await COMMENT.floor(props.parentComment.id, props.id, props.type);
});
onUpdated(async () => {
	replay.value = [];
	replay.value = await COMMENT.floor(props.parentComment.id, props.id, props.type);
});

async function like(index: number) {
	COMMENT.like(
		props.id,
		replay.value[index].id,
		replay.value[index].isLiked ? 0 : 1,
		props.type
	).then((res: boolean) => {
		if (res) {
			replay.value[index].isLiked = !replay.value[index].isLiked;
		}
	});
}

function load() {}
</script>
<style scoped lang="less" src="./style/style.less"></style>
