const recommendSong = ()=>import("@/views/song/recommend.vue")

module.exports = [
	{
		path:"/song",
		children:[
			{
				// 歌曲推荐
				path:"recommend",
				component:recommendSong
			}
		]
	}
];