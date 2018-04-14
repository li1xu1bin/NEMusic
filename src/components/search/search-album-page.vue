<template>
	<transition name="fade">
		<div>
			<div class="music-list-info-cover" v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}">
			</div>
			<div class="music-list-info">
				<div class="list-info-header" :class="{scrollFixed:scrollToBelow}">
					<a @click="init()" class="back"></a>
					<span class="music-title">
						<span v-if="">歌单</span>
					</span>
					<span class="list-more" @click="">
						<i></i>
						<i></i>
						<i></i>
					</span>
					<span class="search"></span>
				</div>
				<div class="list-info-content">
					<div class="list-detail">
						<div class="name-detail">
							<div v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}" class="imgBox"></div>
						</div>
						<div class="tit">
							<h2>{{name}}</h2>
							<p class="list-author"><i class="user-pic" :style="{backgroundImage:'url(' + avatarUrl + ')'}">	</i>{{nickname}} <i class="go"></i></p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="list-content">
				 <musicList :trackCount='trackCount'></musicList> 
			</div>
		</div>
	</transition>
	
</template>

<script>
import musicList from ".././playlist/music-list.vue"
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import api from '../../api/index'


export default {
	data(){
		return {
			id:this.$route.params.id || this.$store.state.songListID,
			name :'',
			nickname :'',
			coverImgUrl :'',
			trackCount:0 //歌单内歌曲数目
		}
	},
	components:{
		musicList
	},
	computed:{
		...mapState({
			avatarUrl:state=>state.avatarUrl,
			scrollToBelow:state=>state.scrollToBelow
		})
	},
 	mounted:function () {
		this.getPlayList();
		this.$store.state.songListID = this.id;
	},
	methods:{
		
    init:function(){
    	this.$router.go(-1);
		},
		getPlayList(){
			api.getSearchAlbumResource(this.id).then((response)=>{
				this.$store.state.musicLists = response.data.songs;
				this.trackCount = response.data.album.size;
				this.name = response.data.album.name;
				this.nickname = response.data.album.artist.name;
				this.coverImgUrl = response.data.album.picUrl;
			})
		}
 	}
}
</script>