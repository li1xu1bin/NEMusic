<template>
	<div class="play-music">
		<!-- <div class="play-music-cover" :style="{backgroundImage:'url(' + blurPicUrl + ')'}"></div> -->
		<div class="play-music-wrap">
			<div class="play-music-header">
				<div class="icon back">
					<a @click="back()"></a>
				</div>
				<div class="music-info">
					<p>{{songName}}</p>
					<p>{{songArtistsName}}</p>
				</div>
				<div class="icon more">
					<a @click="back()"></a>
				</div>
			</div>
			<div class="play-music-content">
				<div class="disk" v-show="!isShowLyric" @click="showLyric()">
					<img class="diskImg" :src="blurPicUrl" alt="pic">
				</div>
				<div class="disk2" v-show="!isShowLyric">
					<img :src="blurPicUrl" alt="pic">
				</div>
				<div class="lyric" v-show="isShowLyric" @click="showLyric()">
					<!-- <div id="volume" class="volume" @touchmove="rangeTM($event,'volume')" @touchstart="barTS($event,'volume')" style="margin-left:16%">
					        <div id="volume-progress" class="volume-progress"></div>
					        <span id="volume-bar" class="volume-bar" @touchstart="barTS($event,'volume')"></span>
						</div> -->
					<div class="lyricWrap">
						<ul id="lyricBox" :style="{marginTop:marginTop+'px'}">
							<li class="lyricIndex" v-for="(lyrics,index) in lyric" :class="{on:lyricA}" style="height:auto">{{lyrics}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="play-music-operation">
				<div class="speed-operation">
					<span class="play-time">{{playTimeCurrent}}</span>
					<div id="range" class="range" @touchmove="rangeTM($event,'range')" @touchstart="barTS($event,'range')">
						<div id="range-progress" class="range-progress"></div>
						<span id="range-bar" class="range-bar" @touchstart="barTS($event,'range')"></span>
					</div>
					<span class="end-time">{{allTime}}</span>
				</div>
				<div class="play-operation">
					<div class="icon previous" @click="plLast()">
					</div>
					<div class="icon play" :class="{stopPlay:playing}" @click="playMusic()">
					</div>
					<div class="icon next" @click="plNext()">
					</div>
				</div>
			</div>
		</div>
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
				lyricA: false, //是否显示歌词
				likeActive: false,
				isShowLyric: false,
				songDetail: [],
				allTime: '', //播放时间
				playTimeCurrent: '0:00',
				goToTime: 0,
				lyric: ['此歌曲无歌词~'],
				lyricTime: [], //每个歌词词出现的时间
				blurPicUrl: '',
				songName: '',
				songArtistsName: '',
				currentLyric: 2,
				volume: 0.0,
				marginTop: 150,
				diskR: '', //旋转定时器
				degs: 0 //旋转角度
			}
		},
		computed: {
			...mapState({
				songListID: state => state.songListID,
				playing: state => state.playing,
				playTime: state => state.playTime,
				currentindex: state => state.currentindex
			})
		},
		watch: {
			//从foot页面切换过来，加载歌曲信息
			currentindex(curVal, oldVal) {
				this.$store.state.hidFoot = false
				this.getSongDetail()
			},
			playing(curVal, oldVal) {
				this.diskRotate()
			},
			//根据播放时间设置信息
			playTime(curVal, oldVal) {
				var that = this
				var lyricIndex = document.getElementsByClassName('lyricIndex')
				var bar = document.getElementById('range-bar')
				var progress = document.getElementById('range-progress')
				var range = document.getElementById('range')
				var second = this.$store.state.second
				var empty = 0
				var left
				if (Math.floor(oldVal) !== Math.floor(curVal)) {
					this.playTimeCurrent = this.setTimeFormat(this.$store.state.playTime, this.playTimeCurrent)
					//设置进度条
					left = (curVal / second) * range.offsetWidth
					bar.style.webkitTransform = 'translate(' + left + 'px,-5px)';
					progress.style.width = left + 'px';
					//设置歌词滚动
					for (var i = 0; i < this.lyricTime.length; i++) {
						var typeLyric = typeof that.lyric[i]
						if (that.lyric[i] !== '' && typeLyric !== 'undefined' && this.playTimeCurrent == this.lyricTime[i].substring(1, 5)) {
							that.marginTop = 150 - 30 * i
							//歌词高亮
							for (let j = 0; j < lyricIndex.length; j++) {
								that.removeClass(lyricIndex[j], 'on')
							}
							that.addClass(lyricIndex[i], 'on')
						}
					}
				}
			},
			//通过进度条重置播放时间
			goToTime(curVal, oldVal) {
				this.$store.state.playTime = curVal
			}
		},
		mounted: function() {
			//页面初始化
			this.getSongDetail()
			this.$store.state.songListID = this.$store.state.songListID
			this.$store.state.hidFoot = false
			this.init()
			this.diskRotate()
		},
		methods: {
			//获取歌单详情
			getSongDetail: function() {
				//加载当前播放歌曲信息
				api.getSongDetail(this.$store.state.currentMusic)
					.then((response) => {
						this.songDetail = response.data.songs
						this.blurPicUrl = this.songDetail[0].album.blurPicUrl
						this.songName = this.songDetail[0].name
						this.songArtistsName = this.songDetail[0].artists[0].name
					}),
					api.getSongLyric(this.$store.state.currentMusic)
					.then((response) => {
						var that = this
						//判断有没有歌词
						if (response.data.lrc.lyric) {
							that.lyric[0] = ""
							var lyricAll = response.data.lrc.lyric.split('[')
							for (let i = 1; i < lyricAll.length; i++) {
								that.lyric[i] = lyricAll[i].slice(10);
								that.lyricTime[i] = lyricAll[i].slice(0, 5);
							}
						}
					})
			},
			//初始化歌曲播放时间还有歌词位置
			init: function() {
				this.allTime = this.setTimeFormat(this.$store.state.second, this.allTime)
				this.marginTop = 150
			},
			//是否显示歌词
			showLyric: function() {
				this.isShowLyric = !this.isShowLyric
			},
			//设置时间格式
			setTimeFormat: function(time, receiveTime) {
				if (parseInt(time % 60) < 10) {
					receiveTime = parseInt(time / 60) + ':0' + parseInt(time % 60)
				} else {
					receiveTime = parseInt(time / 60) + ':' + parseInt(time % 60)
				}
				return receiveTime
			},
			//播放音乐，设置时间
			playMusic: function(e) {
				this.$store.state.playing = !this.$store.state.playing
			},
			//磁盘滚动
			diskRotate: function() {
				var diskImg = document.getElementsByClassName('diskImg')[0]
				var that = this
				if (this.$store.state.playing == true) {
					this.diskR = setInterval(function() {
						diskImg.style.webkitTransform = 'rotate(' + that.degs + 'deg)'
							++that.degs
					}, 100)
				} else {
					//停止播放，清除定时器
					window.clearInterval(this.diskR)
				}
			},
			//返回
			back: function() {
				this.$router.go(-1);
				this.$store.state.hidFoot = true
			},
			//上一首歌单
			plLast: function() {
				this.$store.state.changeSong = -1
			},
			//下一首歌曲
			plNext: function() {
				this.$store.state.changeSong = 1
			},
			//收藏
			like: function() {
				this.likeActive = !this.likeActive
			},
			//进度条触发，type分为是设置声音还是播放时间
			barTS: function(e, type) {
				this.setLeft(e, type)
				e.preventDefault();
			},
			//移动
			rangeTM: function(e, type) {
				this.setLeft(e, type)
			},
			setLeft: function(event, type) {
				var target = event.target
				var rangex = target.offsetLeft
				var half = target.lastChild.offsetWidth / 2
				var left = event.touches[0].pageX - rangex - half;
				this.render(event, left, type);
			},
			render: function(event, value, type) {
				var that = this
				var target = event.target
				var bar = target.lastChild
				var progress = target.firstChild
				var maxw = target.offsetWidth - bar.offsetWidth
				var audio = document.querySelector('#audio')
				var left = value;
				if (left <= -5) {
					left = -5;
				}
				if (left >= maxw + 5) {
					left = maxw + 5;
				}
				bar.style.webkitTransform = 'translate(' + left + 'px,-5px)';
				progress.style.width = left + 'px';
				//设置音量
				// if (type == "volume") {
				// 	this.volume = Math.ceil(left / maxw * 100) / 100;
				// 	audio.volume = this.volume
				// }
				//设置跳转播放进度
				if (type == "range") {
					if (typeof(event) == 'object' && (event.type == 'touchstart' || event.type == 'touchmove')) {
						this.goToTime = Math.ceil(left / maxw * 100) / 100;
						audio.currentTime = this.songDetail[0].duration.toString().substring(0, 3) * this.goToTime
						that.playTime = that.setTimeFormat(audio.currentTime, that.playTime)
						for (let i = 0; i < that.lyricTime.length; i++) {
							if (that.playTime === that.lyricTime[i].substring(1, 5)) {
								that.currentLyric = i
							}
						}
					}
				}
			},
			//js原生添加class和删除class
			hasClass: function(obj, cls) {
				return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
			},
			addClass: function(obj, cls) {
				if (!this.hasClass(obj, cls)) obj.className += " " + cls
			},
			removeClass: function(obj, cls) {
				if (this.hasClass(obj, cls)) {
					var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
					obj.className = obj.className.replace(reg, ' ')
				}
			}
		}
	}
</script>
