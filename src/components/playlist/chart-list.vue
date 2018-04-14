<template>
	<div>
		<div class="chartList" @click="init()">
			<div class="back icon"></div>
			{{name}}
		</div>
		<musicList :trackCount='trackCount'></musicList>
	</div>
</template>

<script>
	import api from '../../api'
	import axios from 'axios'
	import musicList from "../playlist/music-list.vue"
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id: this.$route.params.id,
				coverImgUrl: '',
				date: '',
				rankingListName: '', //歌单名字
				trackCount: 0 //歌单内歌曲数目
			}
		},
		components: {
			musicList
		},
		computed: {
			name() {
				var name = this.rankingListName;
				if (name.slice(0, 3) == "云音乐") {
					return name.slice(3);
				} else if (name.slice(0, 2) == "网易") {
					return name.slice(2);
				} else {
					return name;
				}
			}
		},
		mounted: function() {
			this.getTopListResource();
		},
		methods: {
			init: function() {
				this.$router.go(-1);
			},
			getTopListResource: function() {
				api.getTopListResource(this.id).then((response) => {
					this.$store.state.musicLists = response.data.result.tracks;
					this.trackCount = response.data.result.tracks.length;
					this.rankingListName = response.data.result.name;
				}).catch((error) => {
					console.log('加载歌单信息出错:' + error);
				});
			}
		}
	}
</script>
