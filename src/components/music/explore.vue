<template>
  <div class="music-content">
    <div class="header">
      <h1>发现音乐</h1>
      <div class="icon search">
        <router-link :to="{name:'search'}"></router-link>
      </div>
    </div>
    <!-- 轮播图部分 -->
    <div class="carousel-figure">
      <div class="carousel-figure-pic">
        <transition-group tag="ul" class='pic-ul' name="list" :style="{width:winWidth*pic.length+'px',left:winWidth*n+'px'}">
          <li v-for="(img,index) in pic" :key="index" class="pic-list" :style="{width:winWidth+'px'}">
            <img :src="img" alt="" class="pic-item">
          </li>
        </transition-group>
        <div class="carousel-items">
          <span v-for="(item,index) in pic.length" @click="change(index)" :class="index == -n?'carousel-active':''"></span>
        </div>
      </div>
    </div>
    <!-- 推荐音乐列表部分 -->
    <div class="recommend-list">
      <p class="recommend-title">推荐歌单</p>
      <div class="recommend-playlist">
        <div class="recommend-item" v-for="musicList in persRecoLists">
          <router-link :to="{name:'exploreList',params: {id:musicList.id}}" class="item-img" v-bind:style="{backgroundImage:'url(' + musicList.picUrl + ')'}">
            <i class="music-num">{{musicList.playCount}}</i>
          </router-link>
          <p class="item-des">{{musicList.name}}</p>
        </div>
      </div>
    </div>
    <div class="recommend-list">
      <p class="recommend-title">独家放送</p>
      <div class="recommend-playlist">
        <div class="recommend-item recommend-item-private" v-for="(soleList,index) in soleLists" v-if="index>0">
          <router-link to="/" class="item-img" v-bind:style="{backgroundImage:'url(' + soleList.picUrl + ')'}">
          </router-link>
          <p class="item-des">{{soleList.name}} </p>
        </div>
        <div class="recommend-item recommend-item-full" v-for="(soleList,index) in soleLists" v-if="index==0">
          <router-link to="/" class="item-img" v-bind:style="{backgroundImage:'url(' + soleList.picUrl + ')'}">
          </router-link>
          <p class="item-des">{{soleList.name}} </p>
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
  } from "vuex";
  import api from "../../api/index";
  var soleLists = [];
  // var newestLists = [];
  // var recoMvLists = [];
  /*屏幕宽度*/
  var winWidth = screen.width;
  export default {
    data() {
      return {
        pic: [
          "../../../static/img/1.png",
          "../../../static/img/2.png",
          "../../../static/img/3.png",
          "../../../static/img/4.png"
        ], //轮播图图片
        winWidth: winWidth,
        n: 0,
        currentIndex: 0,
        soleLists: soleLists
      };
    },
    computed: {
      ...mapState({
        persRecoLists: state => state.persRecoLists
      })
    },
    mounted: function() {
      this.$store.state.musicNavIsActive = 1;
      //定时器，每隔4000向左移动winWidth+px
      var _this = this;
      setInterval(function() {
        _this.n--;
        if (-_this.n >= _this.pic.length) {
          _this.n = 0;
        }
      }, 4000);
      this.getData();
    },
    methods: {
      change: function(index) {
        this.n = -index;
      },
      getData: function() {
        api.getPersonalized().then(response => {
            let dataResult = response.data.result;
            this.$store.state.persRecoLists = dataResult;
            for (let i = 0; i < dataResult.length; i++) {
              let playCount = this.$store.state.persRecoLists[i].playCount;
              if (playCount > 9999) {
                this.$store.state.persRecoLists[i].playCount =
                  this.$store.state.persRecoLists[i].playCount
                  .toString()
                  .slice(0, 2) + "万";
              }
            }
          }),
          api.getPrivatecontent().then(response => {
            let dataResult = response.data.result;
            this.soleLists = dataResult;
          })
      }
    }
  };
</script>
