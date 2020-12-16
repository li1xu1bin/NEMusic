<template>
  <div id="app">
     <transition :name="transitionName">
      <router-view class="content-view"></router-view> 
     </transition>
     <v-footer v-show="hidFoot"></v-footer>

  </div>
</template>

<script>
import footer from './components/public/footer.vue'
import { mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapState({
      hidFoot: state => state.hidFoot,
      transitionName: state=>state.transitionName,
      transitionName2: state=>state.transitionName2,
      // hidSideBar: state => state.hidSidebar
    })
  },
  components: {
    'v-footer' : footer
  },
  watch:{
    '$route'(to,from){
      //app主页面key: 1, 2, 3
      //music子页面key: 1.1, 1.2
      if(from.query.key<to.query.key){
        this.$store.state.transitionName= "slideToRight"
        this.$store.state.transitionName2= "slideToRight"
      }else{
        this.$store.state.transitionName = "slideToLeft"
        this.$store.state.transitionName2= "slideToLeft"
      }
    }
  }
}
</script>

<style lang="less">
// 全局样式
@import "style/style.less";
</style>
