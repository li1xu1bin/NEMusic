<template>
	<div class="search-artist search-list-same">
		<p class="notFoundTips" v-if="notFound[0]">{{notFoundTips}}</p>
		<ul v-else>
			<li>
				<a class="list-item" @click="noMorePage($event)">
					<img :src="artist.img1v1Url" class="artist-img" alt="">
					<p class="artist-name">{{artist.name}}</p>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
import api from '../../api'
import { mapState } from 'vuex'
export default {
	name:'searchArtist',
	data(){
		return{
			id: this.$route.params.id,
			notFoundTips:'很抱歉，没有搜索到该歌手。'
		}
	},
	watch:{
		searchKeyWord(){
			this.notFoundTips = '很抱歉，没有搜索到该歌手。';
		}
	},
	computed:{
		...mapState({
			artist: state => state.artist,
			searchKeyWord: state => state.searchKeyWord,
			notFound: state=>state.notFound
		})
	},
	methods:{
		noMorePage(){
			event.preventDefault();
			this.notFoundTips = "很抱歉，没有该歌手信息api";
			this.$store.state.notFound = [true,false,false]; 
		}
	}
}
</script>
