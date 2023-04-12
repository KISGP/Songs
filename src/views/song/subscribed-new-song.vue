<template>
	<div class="back">
		<el-timeline>
			<el-timeline-item
				v-for="item in data"
				:timestamp="item.publishDate + ` ` + item.type + '上线'"
				placement="top"
			>
				<div class="card-back">
					<div class="head">
						<el-image class="cover" :src="item.artist.cover" fit="cover" loading="lazy" />
						<div class="message" @click="router.push(`/singer/${item.artist.id}`)">
							<span>{{ item.artist.name }}</span>
						</div>
					</div>
					<el-space wrap alignment="flex-start">
						<div v-if="item.type === '单曲'" class="card" v-for="e in item.songs" @click="play(e)">
							<el-image class="img" :src="e.song.cover" fit="cover" lazy />
							<div class="data">
								<span>{{ e.song.name }}</span>
								<span>
									<i v-for="alia in e.song.alia">{{ alia }}</i>
								</span>
							</div>
						</div>
						<div v-else class="card" @click="router.push(`/album/${item.resourceId}`)">
							<el-image class="img" :src="item.resourceIdCover" fit="cover" lazy />
							<div class="data">
								<span>{{ item.resourceName }}</span>
							</div>
						</div>
					</el-space>
				</div>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { songDetailedType, SubscribedNewSongsType } from "@/interface/interface";
import { getSubscribedArtistsNewSongs } from "service/api/api";
import { useSongStore } from "store/index";
const router = useRouter();
const store = useSongStore();

const data = ref<SubscribedNewSongsType[]>();
onMounted(async () => {
	data.value = await getSubscribedArtistsNewSongs();
});

const play = (song: songDetailedType) => {
	store.update_song(song);
};
</script>
<style scoped lang="less">
.back {
	margin: 2% 5%;
}
.card-back {
	.head {
		display: flex;
		align-items: center;
		margin: 10px;
		.cover {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;
		}
		.message {
			cursor: pointer;
			display: flex;
			flex-direction: column;
			& > span {
				margin: 5px 15px;
				font-size: 18px;
				color: var(--regular-text);
				&:hover {
					color: var(--theme-color);
				}
			}
		}
	}
	.card {
		cursor: pointer;
		display: flex;
		align-items: center;
		width: 300px;
		background-color: var(--dark-fill);
		border-radius: 7px;
		color: var(--primary-text);
		&:hover {
			color: var(--theme-color);
		}
		.data {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			text-align: center;
			& > span {
				font-size: 20px;
				& > i {
					font-size: 14px;
					color: var(--secondary-text);
				}
			}
		}
		.img {
			width: 80px;
			height: 80px;
			min-width: 80px;
			border-radius: 7px;
		}
	}
}
</style>
