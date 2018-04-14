<template>
	<div class="search-playlist search-list-same">
		<p class="notFoundTips" v-if="notFound[2]">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(playlist,index) in playlists">
				<router-link @click.native="init()" :to="{name:'chartList',params:{id:playlist.id}}" class="list-item">
					<img :src="playlist.coverImgUrl" class="artist-img" alt="">
					<div class="album-info">
						<p class="album-name">{{playlist.name}}</p>
						<p class="album-singer">
							<span>{{playlist.trackCount}}首</span>
							<span>by {{playlist.creator.nickname}},</span>
							<span>播放{{playlist.playCount}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import api from '../../api'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'searchPlaylist',
		data() {
			return {
				id: this.$route.params.id,
				notFoundTips: '很抱歉，没有搜索到该歌单。'
			}
		},
		computed: {
			...mapState({
				playlists: state => state.playlists,
				searchKeyWord: state => state.searchKeyWord,
				notFound: state => state.notFound
			})
		},
		methods: {
			init() {
				this.$store.state.songListID = this.$route.params.id;
			}
		}
	}
</script>