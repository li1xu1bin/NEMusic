<template>
	<div class="footer">
		<router-link :to="{name:'explore',query:{key:1.1}}" class="explore" :class="{'isActive':musicNavIsActive==1}" exact>
			<i></i>
			<span>推荐音乐</span>
		</router-link>
		<router-link :to="{name:'playMusic',params:{id:currentMusic},query:{currentindex:currentindex}}">
			<div class="playingImg" v-show="!blurPicUrl==''" :style="{backgroundImage:'url(' + blurPicUrl + ')'}">
			</div>
			<div class="playingImg None" v-show="blurPicUrl==''">
			</div>
		</router-link>
		<router-link :to="{name:'chart',query:{key:1.2}}" class="chart" :class="{'isActive':musicNavIsActive==2}" exact>
			<i></i>
			<span>排行榜</span>
		</router-link>
		<audio id="audio" :src="musicUrl" type="audio/ogg" @timeupdate="timeupDate()" @ended='playEnd()'>
			</audio>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	import api from '../../api/index'
	export default {
		data() {
			return {
				musicUrl: '',
				// songName: '',
				// songArtistsName: '',
				blurPicUrl: '',
				playTimeFoot: '0:00'
			}
		},
		computed: {
			...mapState({
				hidFoot: state => state.hidFoot,
				musicNavIsActive: state => state.musicNavIsActive,
				currentMusic: state => state.currentMusic,
				currentindex: state => state.currentindex,
				songListID: state => state.songListID,
				playing: state => state.playing,
				changeSong: state => state.changeSong
			})
		},
		watch: {
			//currentMusic为当前播放歌曲id,改变重新加载
			currentMusic: function(newValue, oldValue) {
				this.$store.state.hidFoot = true
				this.getSongDetailFoot(newValue)
			},
			//Playing:是否播放
			playing: function(newValue, oldValue) {
				var audio = document.getElementById('audio')
				if (newValue == false) {
					audio.pause();
				} else if (newValue === true) {
					audio.play();
				}
			},
			// 上下切换歌曲
			changeSong: function(newValue, oldValue) {
				var that = this
				if (newValue == -1) {
					this.playLast(that.songListID, that.currentindex)
				} else if (newValue == 1) {
					this.playNext(that.songListID, that.currentindex)
				}
				this.$store.state.changeSong = 0
			}
		},
		methods: {
			//播放
			playMusic: function(e) {
				var audio = document.getElementById('audio')
				this.$store.state.playing = !this.$store.state.playing;
			},
			//播放时间改变时触发，获取当前播放时间
			timeupDate: function() {
				this.$store.state.playTime = audio.currentTime
			},
			//播放结束，直接播放下一首
			playEnd: function() {
				this.playNext(this.songListID, this.currentindex)
			},
			//获取歌曲信息
			getSongDetailFoot: function(id) {
				api.getSongDetail(id)
					.then((response) => {
						this.songDetail = response.data.songs
						this.blurPicUrl = this.songDetail[0].album.blurPicUrl
						// this.songName = this.songDetail[0].name
						// this.songArtistsName = this.songDetail[0].artists[0].name,
						this.$store.state.second = this.songDetail[0].duration.toString().substring(0, 3)
					}),
					api.getSongUrl(id, 999000)
					.then((response) => {
						this.musicUrl = response.data.data[0].url
					})
					.then(() => {
						this.$store.state.playing = false
					})
					.then(() => {
						this.$store.state.playing = true
					})
			},
			//下一首
			playNext: function(songListID, currentindex) {
				api.getPlayListDeatil(songListID)
					.then((response) => {
						var songLen = response.data.result.tracks.length
						if (this.currentindex < songLen) {
							this.$store.state.currentMusic = response.data.result.tracks[++currentindex].id
							this.$store.state.currentindex = ++this.$store.state.currentindex
							this.getSongDetailFoot(this.$store.state.currentMusic);
						}
					})
			},
			// 上一首
			playLast: function(songListID, currentindex) {
				api.getPlayListDeatil(songListID)
					.then((response) => {
						var songLen = response.data.result.tracks.length
						if (this.currentindex > 0) {
							this.$store.state.currentMusic = response.data.result.tracks[--currentindex].id
							this.$store.state.currentindex = --this.$store.state.currentindex
							this.getSongDetailFoot(this.$store.state.currentMusic);
						}
					})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 49px;
		background: #fff;
		a {
			flex: 1;
		}
		.playingImg {
			display: block;
			width: 68px;
			height: 68px;
			margin: 0 auto;
			border-radius: 50%;
			border: 2px solid #fff;
			background-size: 100% 100%;
			margin-top: -34px;
			&.None{
				background: url(../../../src/assets/wave.svg);
			}
		}
		.explore,
		.chart {
			display: flex;
			align-items: center;
			flex-direction: column;
			i {
				display: block;
				width: 20px;
				height: 20px;
				margin: 8px 0;
			}
			&.isActive {
				color: #ff4545;
			}
		}
		.explore {
			i {
				background: url(../../../src/assets/explore.svg);
			}
			&.isActive {
				i {
					background: url(../../../src/assets/exploreActive.svg);
				}
			}
		}
		.chart {
			i {
				background: url(../../../src/assets/chart.svg);
			}
			&.isActive {
				i {
					background: url(../../../src/assets/chartActive.svg);
				}
			}
		}
	}
</style>