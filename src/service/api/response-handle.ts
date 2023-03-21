/**
 * @file 函数名 == api接口(/替换为_)
 * */
import { transformTimeStamp, handlePeopleCount } from "utils/utils-common";
import { getArtistsName, getArtistsArray } from "utils/utils-content";
import type {
	songDetailedType,
	listBriefType,
	suggestionsType,
	lyricType,
	albumBriefType,
	albumDetailedType,
	listDetailedType,
	artistsType,
	commentType,
} from "@/interface/interface";

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

export function personalized(res: any): Array<listBriefType> {
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

export function recommend_resource(res: any): Array<listBriefType> {
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

export function toplist(res: any): Array<listBriefType> {
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

export function user_playlist(res: any): Array<listBriefType> {
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

export function lyric_new(res: any): lyricType {
	let lyricArray = res.lrc.lyric.slice(res.lrc.lyric.indexOf("[00:")).split("\n");
	lyricArray.pop();
	return lyricArray.map((e: string) => {
		let temp = e.split("]");
		let t = temp[0].replace(/[\[\]]+/g, "").split(":");
		return {
			time: Math.floor((parseInt(t[0]) * 60 + parseFloat(t[1])) * 1000) / 1000,
			content: temp[1].trim(),
		};
	});
}

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

export function album_sublist(res: any): { albumCount: number; albums: Array<albumBriefType> } {
	return {
		albumCount: res.count,
		albums: res.data.map((e: any) => {
			return {
				id: e.id,
				name: e.name,
				cover: e.picUrl,
				songCount: e.size,
				artists: {
					artistsStr: getArtistsName(e.artists, null),
					artists: e.artists.map((artist: any) => {
						return {
							id: artist.id,
							name: artist.name,
						};
					}),
				},
			};
		}),
	};
}

export function playlist_detail(res: any): listDetailedType {
	return {
		list: {
			id: res.playlist.id,
			name: res.playlist.name,
			cover: res.playlist.coverImgUrl,
			updateTime: transformTimeStamp(res.playlist.updateTime),
			description: res.playlist.description,
			tags: res.playlist.tags,
			subscribed: res.playlist.subscribed,
		},
		count: {
			songCount: res.playlist.trackCount,
			playCount: handlePeopleCount(res.playlist.playCount),
			shareCount: handlePeopleCount(res.playlist.shareCount),
			commentCount: handlePeopleCount(res.playlist.commentCount),
			subscribedCount: handlePeopleCount(res.playlist.subscribedCount),
		},
		user: {
			id: res.playlist.creator.userId,
			name: res.playlist.creator.nickname,
			cover: res.playlist.creator.avatarUrl,
		},
	};
}

export function playlist_track_all(res: any): Array<songDetailedType> {
	return res.songs.map((e: any) => {
		const artistsStr = getArtistsName(e.ar);
		return {
			song: {
				id: e.id,
				name: e.name,
				cover: e.al.picUrl,
				artistsStr: artistsStr,
				url: "",
			},
			artists: {
				artistsStr: artistsStr,
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

export function album(res: any): albumDetailedType {
	return {
		songs: res.songs.map((e: any) => {
			let artistsStr = getArtistsName(e.ar, null);
			return {
				song: {
					id: e.id,
					name: e.name,
					alia: e.alia,
					cover: e.al.picUrl,
					artistsStr,
				},
				artists: {
					artistsStr,
					artists: e.ar,
				},
				album: {
					id: e.al.id,
					name: e.al.name,
					cover: e.al.picUrl,
				},
			};
		}),
		album: {
			id: res.album.id,
			name: res.album.name,
			cover: res.album.picUrl,
			publishTime: transformTimeStamp(res.album.publishTime),
			description: res.album.description,
			type: res.album.subType,
			subscribed: false,
			subTime: "",
			songCount: 10,
			shareCount: "",
			commentCount: "",
			subscribedCount: "",
		},
		artists: {
			artistsStr: getArtistsName(res.album.artists),
			artists: getArtistsArray(res.album.artists),
		},
	};
}

export function album_detail_dynamic(res: any): {
	subTime: string;
	shareCount: number | string;
	commentCount: number | string;
	subscribedCount: number | string;
	subscribed: boolean;
} {
	return {
		subTime: transformTimeStamp(res.subTime),
		shareCount: handlePeopleCount(res.shareCount),
		commentCount: handlePeopleCount(res.commentCount),
		subscribedCount: handlePeopleCount(res.subCount),
		subscribed: res.isSub,
	};
}

function returnComment(e: any): commentType {
	return {
		id: e.commentId,
		content: e.content,
		timeStamp: e.time,
		time: e.timeStr,
		liked: e.liked,
		likeCount: e.likedCount,
		replayCount: e.replyCount,
		user: {
			id: e.user.userId,
			name: e.user.nickname,
			cover: e.user.avatarUrl,
			ip: {
				ip: e.ipLocation.ip,
				location: e.ipLocation.location,
			},
		},
	};
}

export function comment_new(res: any): Array<commentType> {
	return res.data.comments.map((e: any) => {
		return returnComment(e);
	});
}

export function comment_floor(res: any): Array<commentType> {
	return res.data.comments.map((e: any) => {
		return returnComment(e);
	});
}
