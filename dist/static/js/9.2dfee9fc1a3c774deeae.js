webpackJsonp([9],{122:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i(12);i(2);s.default={data:function(){return{lists:[],index:0,tracks:[]}},mounted:function(){this.getTopListBriefResource(),this.$store.state.musicNavIsActive=2},methods:{init:function(){this.$store.state.songListID=this.$route.params.id},getTopListBriefResource:function(){var t=this;e.a.getTopListBriefResource().then(function(s){t.lists=s.data.list,t.tracks=s.data.list.tracks}).catch(function(t){console.log("加载歌单信息出错:"+t)})}}}},157:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"music-content"},[t._m(0),t._v(" "),i("div",{staticClass:"chart-list"},t._l(t.lists,function(s,e){return e<4?i("div",{key:e,staticClass:"list-content"},[i("router-link",{attrs:{to:{name:"chartList",params:{id:s.id}}},nativeOn:{click:function(s){t.init()}}},[i("img",{attrs:{src:s.coverImgUrl,alt:"imgDesc"}}),t._v(" "),i("div",{staticClass:"list-tracks"},t._l(s.tracks,function(s,e){return i("p",{staticClass:"tracks-title"},[t._v(t._s(e+1)+"."+t._s(s.first)+" - "+t._s(s.second))])}))])],1):t._e()})),t._v(" "),i("div",{staticClass:"chart-list"},[i("div",{staticClass:"list-title"},[t._v("全球榜")]),t._v(" "),i("div",{staticClass:"list-global"},t._l(t.lists,function(s,e){return e>=4?i("router-link",{key:e,attrs:{to:{name:"chartList",params:{id:s.id}}},nativeOn:{click:function(s){t.init()}}},[i("img",{attrs:{src:s.coverImgUrl,alt:"imgDesc"}}),t._v(" "),i("p",[t._v(t._s(s.name))])]):t._e()}))])])},staticRenderFns:[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"header"},[i("h1",[t._v("排行榜")])])}]}},88:function(t,s,i){var e=i(10)(i(122),i(157),null,null);t.exports=e.exports}});
//# sourceMappingURL=9.2dfee9fc1a3c774deeae.js.map