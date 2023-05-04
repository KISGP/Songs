<template>
	<el-button @click="f">aaa</el-button>
	<div class="back">
		<el-scrollbar ref="e">
			<div class="a">
				<p v-for="item in lyricArray">{{ item.content }}</p>
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { lyricType } from "@/interface/interface";
import { ElScrollbar } from "element-plus";
const lyricArray: lyricType = [
	{ time: 0, content: "作词 : Tizzy T" },
	{ time: 1, content: "作曲 : Tizzy T" },
	{ time: 2, content: "编曲 : Tim姜皓天" },
	{ time: 3, content: "制作人 : Tim姜皓天/Tizzy T" },
	{ time: 18.69, content: "出品： SFNT_ RecordX网易·云上" },
	{ time: 21.15, content: "baby don’ t go back tonight" },
	{ time: 25.47, content: "快说你同样需要我 tonight" },
	{ time: 30.39, content: "当月光落在了我的窗台" },
	{ time: 35.04, content: "请别再留我一个人独自发呆" },
	{ time: 39.06, content: "hey baby don’ t go" },
	{ time: 40.77, content: "把你握在手里我不想松手" },
	{ time: 43.2, content: "道理我都懂但是不想通透" },
	{ time: 45.42, content: "我身边围着一堆女孩像在宫斗" },
	{ time: 47.91, content: "but only u其他 I don’ t care" },
	{ time: 50.37, content: "I waiting for u等了一整夜" },
	{ time: 52.71, content: "你问问我的心跳的多么坚决" },
	{ time: 55.08, content: "我脑海都想着你嘴里吐着烟圈" },
	{ time: 57.69, content: "if u wanna go请你把我一起带走 ye～" },
	{ time: 60.45, content: "你怎么害羞得不敢抬头 ye～" },
	{ time: 62.73, content: "u can talk dirty to me不敢开口 ye～" },
	{ time: 65.16, content: "baby因为我 feeling like psycho ye～" },
	{ time: 67.44, content: "看烛光泛在你脸上你身体变得好烫" },
	{ time: 70.289, content: "忍不住的一直发抖" },
	{ time: 72.09, content: "喜欢你身上的气味从耳朵到脊椎" },
	{ time: 74.88, content: "在你身上留一个 logo" },
	{ time: 78.63, content: "baby don’ t go back tonight" },
	{ time: 83.07, content: "快说你同样需要我 tonight" },
	{ time: 87.96, content: "当月光落在了我的窗台" },
	{ time: 92.67, content: "请别再留我一个人独自发呆" },
	{ time: 96.42, content: "Baby今晚我们一起飞跃疯人院" },
	{ time: 98.61, content: "要爱得彻底其他的我无所谓" },
	{ time: 101.25, content: "I can die for u die for u ye～" },
	{ time: 103.86, content: "die for u die for u tonight～" },
	{ time: 106.259, content: "Yo三点半的凌晨只有你跟我的房间" },
	{ time: 108.539, content: "来坐到我的旁边帮我点燃香烟" },
	{ time: 110.94, content: "我是个飞行员但已经被你扰乱航线" },
	{ time: 113.34, content: "我双手搭在你的脖子上当你的项圈" },
	{ time: 116.64, content: "别讨论谁爱的更多谁付出的更多曾经绝不服输的我" },
	{ time: 120.72, content: "诶～我的心上人见不到你我的心经常疼" },
	{ time: 126.36, content: "I can die for u" },
	{ time: 127.38, content: "我喝的有点醉但真的 I can die for u" },
	{ time: 129.81, content: "我承认我对你的爱有点爱过头" },
	{ time: 132.21, content: "你可以伤害我 baby你不用太内疚" },
	{ time: 136.23, content: "baby don’ t go back tonight" },
	{ time: 140.67, content: "快说你同样需要我 tonight" },
	{ time: 145.56, content: "当月光落在了我的窗台" },
	{ time: 150.27, content: "请别再留我一个人独自发呆" },
	{ time: 155.43, content: "baby don’ t go back tonight" },
	{ time: 159.87, content: "快说同样需要我 tonight" },
	{ time: 164.79, content: "当月光落在了我的窗台" },
	{ time: 169.5, content: "请别再留我一个人独自发呆" },
	{ time: 170.579, content: "吉他：Neo牛圣戈" },
	{ time: 171.66, content: "贝斯：Simon彭宏立" },
	{ time: 172.74, content: "录音工程：Tim姜皓天" },
	{ time: 173.82, content: "音频编辑：阿烈" },
	{ time: 174.91, content: "混音及母带处理：Heidi Wang" },
	{ time: 175.99, content: "封面设计：Suki" },
	{ time: 177.07, content: "出品方：SFNT_Record" },
	{ time: 178.15, content: "特别鸣谢：Tizzy T工作室" },
];

const e = ref<InstanceType<typeof ElScrollbar>>();
const f = () => {
	console.log(e.value!.wrapRef?.scrollHeight);
};
</script>
<style scoped lang="less">
.back {
	width: 500px;
	height: 600px;
	margin: 20px auto;
	background-color: rgb(44, 44, 44);
	.a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
