<template>
	<transition name="fade">
		<div>
			<div class="header">
				<div class="back icon">
					<router-link to="/"></router-link>
				</div>
			</div>
			<div class="playlist-info">
				<div class="playlist-cover" v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}">
				</div>
				<div class="playlist-content">
					<div class="playlist-detail">
						<div v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}" class="detail-img">
							<i class="music-num">{{playCount}}</i>
						</div>
						<div class="detail-title">
							<h2>{{name}}</h2>
							<p v-if="avatarUrl" class="list-author"><i class="user-pic" :style="{backgroundImage:'url(' + avatarUrl + ')'}"></i>{{nickname}} </p>
						</div>
					</div>
				</div>
			</div>
			<musicList :trackCount='trackCount'></musicList>
		</div>
	</transition>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	import api from '../../api/index'
	import musicList from ".././playlist/music-list.vue"
	export default {
		data() {
			return {
				id: this.$route.params.id || this.$store.state.songListID,
				nickname: '', //歌单创建者名称
				name: '', //歌单名称
				coverImgUrl: '', //背景图片
				avatarUrl: '', //歌单创建者头像
				playCount: 0, //播放量
				trackCount: 0 //歌单内歌曲数目
			}
		},
		components: {
			musicList
		},
		mounted: function() {
			this.getPlayList();
			this.$store.state.songListID = this.id;
		},
		methods: {
			getPlayList() {
				api.getPlayListDeatil(this.id).then((response) => {
					//复用的组件的数据
					this.$store.state.musicLists = response.data.result.tracks;
					this.trackCount = response.data.result.tracks.length;
					//其他非组件的数据
					this.nickname = response.data.result.creator.nickname;
					this.name = response.data.result.name;
					this.coverImgUrl = response.data.result.coverImgUrl;
					this.avatarUrl = response.data.result.creator.avatarUrl;
					var count = response.data.result.playCount;
					if (count > 9999) {
						this.playCount = count.toString().slice(0, -4) + '万';
					} else {
						this.playCount = count;
					}
				})
			}
		}
	}
</script>
