/**
 * @file 函数名 == api接口(/替换为_)
 * */
import { getArtistsName, getArtistsArray } from "utils/utils-content";
import type { songDetailedType, listType, suggestionsType } from "@/interface/interface";

export function personalized_newsong(res: any): Array<songDetailedType> {
	return res.result.map((e: any) => {
		let artistsStr = getArtistsName(e.song.artists, null);
		return {
			song: {
				id: e.id,
				name: e.name,
				cover: e.picUrl,
				artistsStr,
			},
			artists: {
				artistsStr,
				artists: getArtistsArray(e.song.artists),
			},
			album: {
				id: e.song.album.id,
				name: e.song.album.name,
				cover: e.song.album.blurPicUrl,
			},
		};
	});
}

export function recommend_songs(res: any): Array<songDetailedType> {
	return res.data.dailySongs.map((e: any) => {
		let artistsStr = getArtistsName(e.ar, null);
		return {
			song: {
				id: e.id,
				name: e.name,
				cover: e.al.picUrl,
				artistsStr,
			},
			artists: {
				artistsStr,
				artists: getArtistsArray(e.ar),
			},
			album: {
				id: e.al.id,
				name: e.al.name,
				cover: e.al.picUrl,
			},
		};
	});
}

export function personalized(res: any): Array<listType> {
	return res.result.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.picUrl + "?param=160y160",
			songCount: e.trackCount,
			playCount: e.playCount,
		};
	});
}

export function recommend_resource(res: any): Array<listType> {
	return res.recommend.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.picUrl + "?param=160y160",
			songCount: e.trackCount,
			playCount: e.playcount,
		};
	});
}

export function toplist(res: any): Array<listType> {
	return res.list.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.coverImgUrl + "?param=160y160",
			songCount: e.trackCount,
			playCount: e.playCount,
		};
	});
}

export function user_playlist(res: any): Array<listType> {
	return res.playlist.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.coverImgUrl + "?param=160y160",
			songCount: e.trackCount,
			playCount: e.playCount,
		};
	});
}

export function lyric_new(res: any) {}

export function search_suggest(res: any): suggestionsType {
	let r: suggestionsType = {};
	r.albums = res.result.albums?.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			artistStr: e.artist.name,
		};
	});
	r.artists = res.result.artists?.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
		};
	});
	r.list = res.result.playlists?.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
		};
	});
	r.songs = res.result.songs?.map((e: any) => {
		let artistsStr = getArtistsName(e.artists, null);
		return {
			id: e.id,
			name: e.name,
			artistStr: artistsStr,
		};
	});
	return r;
}
