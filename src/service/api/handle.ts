/**
 * @file 函数名 == api接口(/替换为_)
 * */
import { transformTimeStamp, handlePeopleCount } from "utils/utils-common";
import { getArtistsName, getArtistsArray } from "utils/utils-content";
import * as TYPE from "@/interface/interface";

export function personalized_newsong(res: any): Array<TYPE.songDetailedType> {
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

export function recommend_songs(res: any): Array<TYPE.songDetailedType> {
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

export function personalized(res: any): Array<TYPE.listBriefType> {
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

export function recommend_resource(res: any): Array<TYPE.listBriefType> {
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

export function toplist(res: any): Array<TYPE.listBriefType> {
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

export function user_playlist(
	res: any,
	type: "all" | "created" | "subscribed" = "all",
	id?: number
): Array<TYPE.listBriefType> {
	if (type === "all") {
		return res.playlist.map((e: any) => {
			return {
				id: e.id,
				name: e.name,
				cover: e.coverImgUrl + "?param=160y160",
				songCount: e.trackCount,
				playCount: e.playCount,
			};
		});
	} else if (type === "created") {
		let r: Array<TYPE.listBriefType> = [];
		res.playlist.forEach((e: any) => {
			if (e.userId === id) {
				r.push({
					id: e.id,
					name: e.name,
					cover: e.coverImgUrl + "?param=160y160",
					songCount: e.trackCount,
					playCount: e.playCount,
				});
			}
		});
		return r;
	} else {
		let r: Array<TYPE.listBriefType> = [];
		res.playlist.forEach((e: any) => {
			if (e.userId != id) {
				r.push({
					id: e.id,
					name: e.name,
					cover: e.coverImgUrl + "?param=160y160",
					songCount: e.trackCount,
					playCount: e.playCount,
				});
			}
		});
		return r;
	}
}

export function lyric_new(res: any): TYPE.lyricType {
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

export function search_suggest(res: any): TYPE.suggestionsType {
	let r: TYPE.suggestionsType = {};
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

export function album_sublist(res: any): {
	albumCount: number;
	albums: Array<TYPE.albumBriefType>;
} {
	return {
		albumCount: res.count,
		albums: res.data.map((e: any) => {
			return {
				id: e.id,
				name: e.name,
				cover: e.picUrl + "?param=200y200",
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

export function playlist_detail(res: any): TYPE.listDetailedType {
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

export function playlist_track_all(res: any): Array<TYPE.songDetailedType> {
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

export function album(res: any): TYPE.albumDetailedType {
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

export function returnComment(e: any): TYPE.commentType {
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

export function comment_new(res: any): Array<TYPE.commentType> {
	return res.data.comments.map((e: any) => {
		return returnComment(e);
	});
}

export function comment_floor(res: any): Array<TYPE.commentType> {
	return res.data.comments.map((e: any) => {
		return returnComment(e);
	});
}

export function song_detail(res: any): Array<TYPE.songDetailedType> {
	return res.songs.map((e: any) => {
		const artistsStr = getArtistsName(e.ar, null);
		return {
			song: {
				id: e.id,
				name: e.name,
				cover: e.al.picUrl,
				artistsStr: artistsStr,
				alia: e.alia,
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

export function artist_detail(res: any): TYPE.artistInfoType {
	return {
		name: res.data.artist.name,
		alias: res.data.artist.alias,
		cover: res.data.artist.cover + "?param=200y200",
		signature: res.data.user?.signature || "",
		count: {
			song: res.data.artist.musicSize,
			album: res.data.artist.albumSize,
			mv: res.data.artist.mvSize,
			fans: 0,
		},
	};
}

export function artist_top_song(res: any): Array<TYPE.songDetailedType> {
	return song_detail(res);
}

export function simi_artist(res: any): Array<TYPE.artistBriefType> {
	return res.artists.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.picUrl + "?param=80y80",
		};
	});
}

export function user_follows(res: any): Array<TYPE.artistBriefType> {
	return res.follow.map((e: any) => {
		return {
			id: e.userId,
			name: e.nickname,
			cover: e.avatarUrl,
		};
	});
}

export function artist_sublist(res: any): Array<TYPE.artistBriefType> {
	return res.data.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.picUrl,
			alias: e.alias,
		};
	});
}

export function artist_new_song(res: any): Array<TYPE.SubscribedNewSongsType> {
	return res.data.newWorks.map((e: any) => {
		let type: string;
		switch (e.blockType) {
			case "song":
				type = "单曲";
				break;
			case "album":
				type = "专辑";
				break;
			default:
				type = e.blockType;
				break;
		}
		return {
			resourceId: e.blockTitle.resourceId,
			resourceName: e.blockTitle.resourceName,
			resourceIdCover: e.blockTitle.resourcePicUrl,
			publishTime: e.blockTitle.publishTime,
			publishDate: e.blockTitle.publishDate,
			type,
			artist: {
				id: e.blockTitle.artistId,
				name: e.blockTitle.artistName,
				cover: e.blockTitle.imgUrl,
			},
			songs: e.songLists.map((e: any) => {
				const artistsStr = getArtistsName(e.ar, null);
				return {
					song: {
						id: e.id,
						name: e.name,
						cover: e.al.picUrl,
						artistsStr: artistsStr,
						alia: e.alia,
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
			}),
		};
	});
}

export function toplist_artist(res: any): TYPE.artistBriefType[] {
	return res.list.artists.map((e: any) => {
		return {
			id: e.id,
			name: e.name,
			cover: e.picUrl + "?param=150y150",
			alias: e.alias,
		};
	});
}

export function top_artists(res: any): {
	more: boolean;
	artists: TYPE.artistBriefType[];
} {
	return {
		more: res.more,
		artists: res.artists.map((e: any) => {
			return {
				id: e.id,
				name: e.name,
				cover: e.picUrl + "?param=150y150",
				alias: e.alias,
			};
		}),
	};
}

export function artist_list(res: any): { more: boolean; artists: TYPE.artistBriefType[] } {
	return {
		more:res.more,
		artists:res.artists.map((e: any) => {
			return {
				id: e.id,
				name: e.name,
				cover: e.picUrl+ "?param=150y150",
				alias: e.alias,
			};
		})
	}
}
