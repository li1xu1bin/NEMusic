import vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

vue.use(Vuex)

const state = {
	hidFoot: true,//foot是否显示，fasle:隐藏，true:显示
	transitionName: '',//一级菜单nav切换动画
	transitionName2: '',//二级music菜单 nav切换动画
	musicNavIsActive: 1,//音乐列表和排行表nav切换（初始值1：音乐列表nav是active状态）
	// recoListId:'',
	persRecoLists:[],//个性推荐歌单
	musicLists:[], //歌单
	searchKeyWord:'',//search的关键词
	typeId:0,//search的类型（单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) *(type)*）
	songListID:'',//歌单id
	//index:0,
	artist:[],//search artists数据
	albums:[],//search albums数据
	playlists:[],//search playlists数据
	notFound:[false,false,false],//search数据是否找到（初始false值：api请求找到数据）
	showResultPage: false,//search searchResult结果页是否显示（初始值false：隐藏）
	currentMusic:'',//当前播放歌曲的id
	currentindex:0,//当前播放歌曲在歌单中的排序位置位置
	playing:false,//是否要播放
	playTime:'0:00',//播放时间
	second:0,//歌曲播放用时
	changeSong:0,//是否改变当前播放歌曲，下一首-1，上一首1
	playCount:0//播放次数
}
const getters = {
	playCount:state=>state.playCount
}
const mutations = {
	// change:(state,type) => {state.hidNav = type},
	getRecoListId:(state,id) =>{state.recoListId = id},

}
const actions = {
	// changeAsync ({commit},type){
	// 	setTimeout(() => {
	// 		commit('change',type)
	// 	},1000)
	// }
}
export default new Vuex.Store({
  state : state,
  getters: getters,
  mutations:mutations,
  actions:actions
})
