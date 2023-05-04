<template>
	<el-scrollbar>
		<el-tabs
			v-model="activePage"
			v-infinite-scroll="load"
			:infinite-scroll-immediate="false"
			:infinite-scroll-delay="1000"
		>
			<el-tab-pane name="recommend">
				<template #label>
					<span>推荐(error)</span>
				</template>
				<comment-item :comments="recommendC!" :type="type" :id="id" />
			</el-tab-pane>
			<el-tab-pane name="hot">
				<template #label>
					<span>最热(error)</span>
				</template>
				<comment-item :comments="hotC!" :type="type" :id="id" />
			</el-tab-pane>
			<el-tab-pane name="new">
				<template #label>
					<span>时间</span>
				</template>
			</el-tab-pane>
			<comment-item :comments="newC!" :type="type" :id="id" />
		</el-tabs>
	</el-scrollbar>
</template>
<script setup lang="ts">
import { ref, onMounted, PropType } from "vue";
import { getComment } from "service/api/api";
import { commentType, resources } from "@/interface/interface";
import commentItem from "./comment-item.vue";

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	type: {
		type: String as PropType<resources>,
		required: true,
	},
});

const recommendC = ref<Array<commentType>>([]);
const recommendPage = ref<number>(1);

const hotC = ref<Array<commentType>>([]);
const hotPage = ref<number>(1);

const newC = ref<Array<commentType>>([]);
const newPage = ref<number>(1);
onMounted(async () => {
	hotC.value = await getComment(props.id, "热度", props.type, hotPage.value);
	recommendC.value = await getComment(props.id, "推荐", props.type, recommendPage.value);
	newC.value = await getComment(props.id, "时间", props.type, newPage.value);
});

const activePage = ref<string>("recommend");

// FIXME: 推荐评论只能请求第一页评论，第二页以后没有请求数据。热度评论请求成功，但无法拼接到数组后面。只有时间评论正常
const load = async () => {
	if (activePage.value === "hot") {
		// hotC.value = hotC.value.concat(await getComment(props.id, "热度", props.type, ++hotPage.value));
		// console.log(hotC.value.length);
	} else if (activePage.value === "recommend") {
		// recommendC.value = recommendC.value.concat(
		// 	await getComment(props.id, "推荐", props.type, ++recommendPage.value)
		// );
	} else if (activePage.value === "new") {
		newC.value = newC.value.concat(
			await getComment(
				props.id,
				"时间",
				props.type,
				++newPage.value,
				20,
				newC.value[newC.value.length - 1].timeStamp
			)
		);
	}
};
</script>
<style scoped lang="less"></style>
