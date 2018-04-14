<template>
	<div class="music-list">
		<ul>
			<li v-for="(musicList,index) in musicLists" class="track-item">
				<div class="track-num" @click="playFoot(musicList.id,index)">{{index+1}}</div>
				<div class="track-info" @click="playFoot(musicList.id,index)">
						<div class="track-title">{{musicList.name}}</div>
						<div class="track-detail">
							<span v-if="musicList.artists" v-for="artist in musicList.artists">
									{{artist.name}} 
								</span>
							<span v-if="musicList.album"> - {{musicList.album.name}}</span>
						</div>
				</div>
				<div class="icon more">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		props: [
			'trackCount' //歌单内歌曲数目
		],
		computed: {
			...mapState({
				musicLists: state => state.musicLists
			})
		},
		methods: {
			playFoot: function(id, index) {
				this.$store.state.currentMusic = id
				this.$store.state.currentindex = index
			}
		}
	}
</script>
