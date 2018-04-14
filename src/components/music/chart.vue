<template>
	<div class="music-content">
		<div class="header">
			<h1>排行榜</h1>
		</div>
		<div class="chart-list">
			<div class="list-content" v-for="(list,index) in lists" :key="index" v-if="index<4">
				<router-link :to="{name:'chartList',params:{id:list.id}}" @click.native="init()">
					<img :src="list.coverImgUrl" alt="imgDesc">
					<div class="list-tracks">
						<p class="tracks-title" v-for="(item,i) in list.tracks">{{i+1}}.{{item.first}} - {{item.second}}</p>
					</div>
				</router-link>
			</div>
		</div>
		<div class="chart-list">
			<div class="list-title">全球榜</div>
			<div class="list-global">
				<router-link :to="{name:'chartList',params:{id:list.id}}" @click.native="init()" v-for="(list,index) in lists" :key="index" v-if="index>=4">
					<img :src="list.coverImgUrl" alt="imgDesc">
					<p>{{list.name}}</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../api'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				lists: [],
				index: 0,
				tracks: [],
			}
		},
		mounted: function() {
			this.getTopListBriefResource();
			this.$store.state.musicNavIsActive = 2;
		},
		methods: {
			init: function() {
				this.$store.state.songListID = this.$route.params.id;
			},
			getTopListBriefResource: function() {
				api.getTopListBriefResource().then((response) => {
					this.lists = response.data.list;
					this.tracks = response.data.list.tracks;
				}).catch((error) => {
					console.log('加载歌单信息出错:' + error);
				});
			}
		}
	}
</script>
