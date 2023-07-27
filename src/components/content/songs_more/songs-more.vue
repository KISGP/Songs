<template>
	<div>
		<songCard
			v-once
			:img="subscribedSong.resourceCover?.url || subscribedSong.songs[0].cover?.url"
			:title="subscribedSong.resourceName"
			@click="play"
		/>
		<Transition name="songs" v-once>
			<div class="songs" ref="table" v-show="isShow">
				<song-table :songs="songs" :show-album="false" />
			</div>
		</Transition>
		<div v-if="subscribedSong.songs.length >= 2" class="more">
			<span @click="showMore">
				{{ showMoreText }}
				<el-icon>
					<ArrowDown v-if="!isShow" />
					<ArrowUp v-else />
				</el-icon>
			</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { subscribedNewSong, song } from "type/type";
import songCard from "../song-card/small.vue";
import songTable from "../songs-table/songs-table.vue";
import { useSongStore } from "store/index";

const router = useRouter();

const props = defineProps<{
	subscribedSong: subscribedNewSong;
}>();

// 展开的歌曲表格
const songs = computed((): song[] => {
	const res = props.subscribedSong.songs;
	if (props.subscribedSong.type === "单曲") {
		return res.slice(1);
	} else {
		return res;
	}
});
const table = ref<HTMLDivElement>();
const tableHeight = ref<string>();
onMounted(() => {
	if (table.value) {
		table.value.style.visibility = "hidden";
		table.value.style.display = "block";
		tableHeight.value = table.value.offsetHeight + 28 + "px";
		table.value.style.display = "none";
		table.value.style.visibility = "visible";
	}
});

// 是否展开歌曲
const isShow = ref<boolean>(false);
function showMore() {
	isShow.value = !isShow.value;
	if (table.value) {
		isShow.value
			? (table.value.style.visibility = "visible")
			: (table.value.style.visibility = "hidden");
	}
}
const showMoreText = computed(() => {
	const type = props.subscribedSong.type;
	const count = props.subscribedSong.songs.length;
	if (type === "单曲") {
		return `${isShow.value ? "收起" : "展开"}${count - 1}首${count === 2 ? "伴奏" : "歌曲"}`;
	} else if (type === "专辑") {
		return `${isShow.value ? "收起" : "展开"}${count}首专辑歌曲`;
	} else {
		return undefined;
	}
});

// 播放/跳转
function play() {
	const { type, resourceId, songs } = props.subscribedSong;
	if (type === "专辑") {
		router.push(`/album/${resourceId}`);
	} else if (type === "单曲") {
		useSongStore().play(songs[0]);
	}
}
</script>
<style scoped lang="less">
.songs {
	margin: 1% 0;
	padding-top: 1%;
	border-top: 2px solid var(--lighter-border);
}
.more {
	display: in line-block;
	margin: 1%;
	font-size: 14px;
	&:hover {
		cursor: pointer;
		color: var(--theme-color);
	}
}
.songs-enter-active {
	animation: show 300ms ease-out;
}
.songs-leave-active {
	animation: show 300ms ease-in reverse;
}
@keyframes show {
	from {
		height: 0;
	}
	to {
		height: v-bind(tableHeight);
	}
}
</style>
