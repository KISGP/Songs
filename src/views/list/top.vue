<template>
	<div class="back">
		<list-card-group :list="topList" />
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { getTopList } from "service/api/api";
import { listBriefType } from "@/interface/interface";
import listCardGroup from "@/components/content/list-card/list-card-group.vue";

const topList: Ref<Array<listBriefType>> = ref([]);
onMounted(async () => {
	topList.value = await getTopList();
});
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	width: 90%;
}
</style>
