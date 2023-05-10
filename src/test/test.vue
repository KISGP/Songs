<template>
	<el-button @click="f">+</el-button>
</template>
<script setup lang="ts">
import { Howl, Howler } from "howler";
var sound = new Howl({
	src: [
		"http://m701.music.126.net/20230510160533/67acf5e9e6162f585045fb9d141fc53e/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/27393052010/8e88/25e3/8993/e4ecd0680b86c1190efc0a288ecb5a42.mp3",
	],
});

const f = () => {
	sound.play();
};
sound.once("load", function () {
	sound.play();
});

// Fires when the sound finishes playing.
sound.on("end", function () {
	console.log("Finished!");
});
</script>
<style scoped lang="less"></style>
