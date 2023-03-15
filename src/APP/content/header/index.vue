<template>
	<div class="header">
		<div>
			<span class="logo">Songs</span>
		</div>
		<div>
			<search />
		</div>
		<div>
			<span></span>
		</div>
	</div>
</template>
<script setup lang="ts">
import search from "components/content/search-input/index.vue"
</script>
<style scoped lang="less">
@import "style/common.less";

.header {
	height: 100%;
	.flex-layout(space-around);
	&>:nth-child(1){
		flex-grow: 1;
	}
	&>:nth-child(2){
		flex-grow: 8;
	}
	&>:nth-child(3){
		flex-grow: 2;
	}
	.logo {
		.flex-centerX();
		font-size: 22px;
		line-height: 6vh;
		font-weight: 800;
		font-family: Georgia, serif;
	}
}
</style>
