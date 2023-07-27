<template>
	<div class="back">
		<list-recommend :lists="topList" />
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LIST } from "service/api/index";
import { list } from "type/type";
import ListRecommend from "components/content/list-recommend/list-recommend.vue";

const topList = ref<list[]>([]);
onMounted(async () => {
	topList.value = await LIST.getTop();
});
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	width: 90%;
}
</style>
