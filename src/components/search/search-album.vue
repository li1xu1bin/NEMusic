<template>
	<div class="search-album search-list-same">
		<p class="notFoundTips" v-if="notFound[1]">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(album,index) in albums">
				<router-link :to="{name:'searchAlbumPage',params:{id:album.id}}" class="list-item">
					<img :src="album.picUrl" class="artist-img" alt="">
					<div class="album-info">
						<p class="album-name">{{album.name}}</p>
						<p class="album-singer">
							<span v-for="artist in album.artists">{{artist.name}}</span>
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
		name: 'searchAlbum',
		data() {
			return {
				id: this.$route.params.id,
				notFoundTips: '很抱歉，没有搜索到该专辑。'
			}
		},
		computed: {
			...mapState({
				albums: state => state.albums,
				searchKeyWord: state => state.searchKeyWord,
				notFound: state => state.notFound
			})
		}
	}
</script>