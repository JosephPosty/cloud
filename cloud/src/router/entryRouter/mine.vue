<template>
  <div id="container">
      <header-top></header-top>
      <div class="mineCton">
        <header v-if="$store.state.isLogin">
          <h1>
            <div class="mainPage">
              <p>
                <img :src="userImg" alt="" >
              </p>
              <h3> {{ user.nickname }}</h3>
              <ul>
                <li>
                  <strong>{{ $store.state.userWatch.follow.length }}</strong>
                  <span>关注</span>
                </li>
                <li>
                  <strong>{{ $store.state.userWatch.beFollow.length }}</strong>
                  <span>粉丝</span>
                </li>
              </ul>
              <div class="bgMenu">
                  <el-tabs v-model="mineMenu" type="card">
                    <el-tab-pane label="I like" name="first">
                       <el-tabs v-model="songMenu" type="card" class='songsTab'>
                           <el-tab-pane label='歌曲' name="song" >
                             <span slot="label"   style="font-family:fantasy;">歌曲 {{$store.state.user_playList.length>0?$store.state.user_playList[0].trackCount:''}}</span>
                             <div class="songList">
                               <div class="songsBtn">
                                 <el-button type="primary" ><a href="javascript:void(0)"><i class="el-icon-caret-right"></i>播放</a></el-button>
                                 <el-button type="primary"><a href="javascript:void(0)"><i class="el-icon-share"></i>收藏</a></el-button>
                                 <el-button type="primary"><a href="javascript:void(0)"><i class="el-icon-download"></i>下载</a></el-button>
                                 <el-button type="primary" ><a href="javascript:void(0)"><i class="el-icon-edit"></i>评论</a></el-button>
                               </div>
                               <ul>
                                 <!-- <li v-if='$store.state.user_playList.length' v-for="(songs,index) in $store.state.user_playList" :key='songs.id' >

                                 </li> -->
                                 <li v-for="(songs,index) in $store.state.user_playList[0]" >
                                   <a href="javascript:void(0)">
                                      {{  }}
                                   </a>
                                 </li>
                               </ul>
                             </div>
                           </el-tab-pane>
                           <el-tab-pane label='歌单'  name="songList">
                             <span slot="label" name="_songList" style='font-family:fantasy;'>歌单 {{$store.state.user_playList.length-1}}</span>
                           </el-tab-pane>
                           
                       </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="I create" name="second">

                    </el-tab-pane>
                    <el-tab-pane label="Watch" name="third">

                    </el-tab-pane>
                    <el-tab-pane label="Fans" name="fourth">

                    </el-tab-pane>
                    <el-tab-pane label="Video" name="fifth">

                    </el-tab-pane>
                  </el-tabs>
              </div>
            </div>

          </h1>
        </header>
        <header v-else>
          <h2>
            <div class="login_btn">
              <p ></p>
              <span ></span>
              <a href="javascript:void(0)" @click="$store.state.loginShow = true">立即登录</a>
            </div>
          </h2>
        </header>
      </div>
  </div>
</template>
<script>
import store from "../../store/store";
import headerTop from "../../components/headerTop";
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      user: {}, //登录信息
      userImg: "", //用户头像地址
      mineMenu:'first',//tab选项卡默认选项
      songMenu:'song',//喜欢的音乐选项卡
      likeSongsnum:'',
      _songInfo:[],
      allSongs:[],
    };
  },
  methods: {
    // ...mapMutations([
    //    'getUserwatch',
    //  ]),
     ...mapActions([
       'getUserwatch'
     ]),


    getUserinfo() {
      if (this.$store.state.isLogin) {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.$http
          .get(this.GLOBAL._url + "/user/detail?uid=" + userInfo.userId)
          .then(({ data: { code, profile } }) => {
            if (code == 200) {
              console.log(profile);
              this.user = profile;
              this.userImg = this.user.avatarUrl;
             
            }
          });
      }
    },
    getMusicInfo() {
       let that = this;
         that.$http.get(BASE + '/user/playlist?uid=' + that.$store.state.user.userId).then(({ data: { playlist } }) => {
                    // state.user_playList = playlist;
                    console.log(playlist);
                    that.allSongs = playlist;
                   
          }).then(function(){
            that.$http.get(BASE + '/playlist/detail?id=' +  that.allSongs[0].id).then(({ data: { playlist } }) => {
                console.log(playlist)
            })
          })
    }
  },
  components: {
    headerTop
  },
  created () {  

  },
  computed: {
    // _songInfo(val) {
    //   val = this.$store.state.user_playList;
    //   console.log(val)
    // }
  },
 
  mounted() {
    this.getUserinfo();
    this.getUserwatch();
    this.getMusicInfo();
  
    
  }
};
</script>
<style lang='less' scoped >
@import url("../../assets/less/mine.less");
</style>
<style>
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none;
}
  .el-tabs__item {
    color: #fff;
    font-size: 18px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item,.el-tabs--card>.el-tabs__header {
    border: none;
  }
  .el-tabs__item.is-active,.el-tabs__item:hover,.bgMenu .el-tabs .el-tabs__content .el-tabs__item:hover,.bgMenu .el-tabs .el-tabs__content .el-tabs__item.is-active {
    color: #31c27c;
  }
.bgMenu .el-tabs .el-tabs__content {
  overflow: visible;
}
.bgMenu .el-tabs .el-tabs__content .el-tabs__item {
  color: #333;
}
</style>


