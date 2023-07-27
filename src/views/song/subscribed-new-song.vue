<template>
	<div class="back">
		<div v-for="item in Songs" :key="item.publishTime" class="cardBox">
			<div class="header">
				<el-image
					class="singerImg"
					:src="item.singer.cover?.url"
					fit="cover"
					loading="lazy"
					@click="router.push(`/singer/${item.singer.id}`)"
				/>
				<div class="data">
					<span>{{ item.singer.name }}</span>
					<span>{{ item.publishDate.slice(0, -3) }} {{ `${item.type}上线` }}</span>
				</div>
			</div>
			<div class="content">
				<songs-more :subscribed-song="item" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SONG } from "service/api/index";
import { subscribedNewSong } from "type/type";
import songsMore from "@/components/content/songs_more/songs-more.vue";

const router = useRouter();

const Songs = ref<subscribedNewSong[]>();
onMounted(async () => {
	Songs.value = await SONG.getSubscribedSingerNewSongs();
});
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
	padding: 1%;
	border-left: 2px solid var(--darker-border);
	.cardBox {
		margin-bottom: 3%;
		.header {
			display: flex;
			align-items: center;
			.singerImg {
				height: 40px;
				width: 40px;
				border-radius: 50%;
				box-shadow: var(--el-box-shadow-lighter);
			}
			.data {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				& > span:nth-child(1) {
					font-size: 16px;
					color: var(--regular-text);
				}
				& > span:nth-child(2) {
					font-size: 14px;
					color: var(--secondary-text);
				}
			}
		}
		.content {
			margin: 10px 50px;
		}
	}
}
</style>
