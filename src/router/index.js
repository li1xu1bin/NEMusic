import Vue from 'vue'
import Router from 'vue-router'

//主页
const music = resolve => require(['@/components/music/music.vue'], resolve);
//推荐
const explore = resolve => require(["@/components/music/explore.vue"], resolve); 
//排行榜
const chart = resolve => require(["@/components/music/chart.vue"], resolve); 

//歌单详细
const exploreList = resolve => require(["@/components/playlist/explore-list.vue"], resolve); 
//排行榜详细
const chartList = resolve => require(["@/components/playlist/chart-list.vue"], resolve); 

//播放中
const playMusic = resolve => require(["@/components/public/play-music.vue"], resolve); 


//搜索
const search = resolve => require(["@/components/search/search.vue"], resolve); 
const searchContentView = resolve => require(["@/components/search/search-content-view.vue"], resolve); 
const searchArtist = resolve => require(["@/components/search/search-artist.vue"], resolve); 
const searchAlbumPage = resolve => require(["@/components/search/search-album-page.vue"], resolve); 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/music',
      name: 'music',
      component: music,

      children:[
        {
          path: '/music/explore',
          name: 'explore',
          component: explore
        },
        {
          path: '/music/chart',
          name: 'chart',
          component: chart
        },
        {
         path: '/music', 
         redirect: '/music/explore' 
        }
      ]
    },
    {
      path: "/exploreList",
      name: 'exploreList',
      component : exploreList
    },
    {
      path: '/playlist/chartList/:id',
      name: 'chartList',
      component: chartList
    },
    {
      path: '/playMusic',
      name: 'playMusic',
      component: playMusic
    },
    {
      path: '/searchAlbumPage',
      name: 'searchAlbumPage',
      component: searchAlbumPage
    },
    {
      path: '/search',
      name: 'search',
      component: search,

      children:[
        {
          path: '/search/searchContentView/:id',
          name: 'searchContentView',
          component: searchContentView
        },
        {
          path:'/search/searchArtist',
          name: 'searchArtist',
          component: searchArtist
        },
        {
          path: '/search',
          redirect: '/search/searchContentView/1'
        }
      ]
    },
    {
       path: '*', 
       redirect: '/music/explore' 
     }

  ]
})
