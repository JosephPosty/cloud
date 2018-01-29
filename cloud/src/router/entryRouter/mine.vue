<template>
  <div id="container">
    <header-top></header-top>
    <div class="mineCton">
      <header v-if="$store.state.isLogin">
        <h1>
          <div class="mainPage">
            <p>
              <img :src="$store.state.user.avatarUrl" alt="">
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
                <el-tab-pane label="I like" name="first" class="clearfix">
                  <el-tabs v-model="songMenu" type="card" class='songsTab'>
                    <el-tab-pane label='歌曲' name="song">
                      <span slot="label" style="font-family:fantasy;">歌曲 {{$store.state.user_playList.length>0?$store.state.user_playList[0].trackCount:''}}</span>
                      <div class="songList">
                        <div class="songsBtn">
                          <el-button type="primary">
                            <a href="javascript:void(0)">
                              <i class="el-icon-caret-right"></i>播放</a>
                          </el-button>
                          <el-button type="primary">
                            <a href="javascript:void(0)">
                              <i class="el-icon-share"></i>收藏</a>
                          </el-button>
                          <el-button type="primary">
                            <a href="javascript:void(0)">
                              <i class="el-icon-download"></i>下载</a>
                          </el-button>
                          <el-button type="primary">
                            <a href="javascript:void(0)">
                              <i class="el-icon-edit"></i>评论</a>
                          </el-button>
                        </div>
                        <ul>
                          <li>
                            <a href="javascript:void(0)" class="clrarfix">
                              <span>歌曲</span>
                              <label>歌手</label>
                              <em>专辑</em>
                              <i>时长</i>
                            </a>

                          </li>
                          <li v-for="(songs,index) in likeSongs" :key='index' :songId='songs.id'>
                            <a href="javascript:void(0)" class="clearfix">
                              <span>
                                <el-tooltip placement="top-start" >
                                  <small><a href="javascript:void(0)">{{songs.name}}</a></small>
                                  <div slot="content">{{songs.name}}</div>
                                </el-tooltip>
                                <!-- <small></small> -->
                                <div class="hideMenu" >
                                  <el-tooltip placement="top-start" content="播放">
                                      <a href="javascript:void(0)">
                                        <i class="_icon_play"></i>
                                      </a>
                                  </el-tooltip>
                                  <el-tooltip placement="top-start" content="添加">
                                      <a href="javascript:void(0)">
                                         <i class="_icon_add"></i>
                                      </a>
                                  </el-tooltip>
                                  <el-tooltip placement="top-start" content="下载">
                                      <a href="javascript:void(0)">
                                         <i class="_icon_down"></i>
                                      </a>
                                  </el-tooltip>
                                   <el-tooltip placement="top-start" content="分享">
                                      <a href="javascript:void(0)">
                                           <i class="_icon_share"></i>
                                      </a>
                                  </el-tooltip>
                                </div>
                              </span>
                              <!-- <label>{{ songs.ar | getSinger(songs.ar) }}</label> -->
                              <label >
                                  <span v-for='(singer,index) in getSinger(songs.ar)' :key='singer.id' >
                                    <el-tooltip placement="top-start" >
                                      <router-link :to="{ name: 'singer', params: { singerId: singer.id }}" :singerid='singer.id'>{{ singer.name }}</router-link>
                                      <!-- <a href="javascript:void(0)" :singerid='singer.id'>{{ singer.name }}</a> -->
                                       <div slot="content">{{ singer.name }}</div>
                                    </el-tooltip>
                                    <i v-show="index!=getSinger(songs.ar).length-1" >/</i>
                                    </span>
                              </label>
                              <em>
                                <el-tooltip placement="top-start" >
                                  <a href="javascript:void(0)"> {{ songs.al.name }}</a>
                                  <div slot="content"> {{ songs.al.name }}</div>
                                </el-tooltip>
                              </em>
                              <i class="song_time">{{ songs.dt | formatDuring(songs.dt) }}</i>
                              <div class="_other"></div>
                              <el-tooltip placement="top-start" content="删除">
                                <a href="javascript:void(0)" class="_icon_delete" @click="delete_song($event,index)"></a>
                              </el-tooltip>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label='歌单' name="songList">
                      <span slot="label" name="_songList" style='font-family:fantasy;'>歌单 {{$store.state.user_playList.length-1}}</span>
                      <div class="songsList">
                        <ul>
                          <li v-for="(list) in allSongs.slice(1)" :key="list.id">
                            <a href="javascript:void(0)">
                              <img :src="list.coverImgUrl" alt="">
                              <i></i>
                              <em></em>
                            </a>
                             <el-tooltip placement="left-start">
                              <p v-text="list.name"></p>
                              <div slot="content"> {{ list.name }}</div>
                            </el-tooltip>
                           
                          </li>
                        </ul>
                      </div>
                    </el-tab-pane>

                  </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="I create" name="second">
<span>shangahi</span>

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
            <p></p>
            <span></span>
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
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {}, //登录信息
      userImg: "", //用户头像地址
      mineMenu: "first", //tab选项卡默认选项
      songMenu: "song", //喜欢的音乐选项卡
      likeSongsnum: "",
      _songInfo: [],
      allSongs: [],//所有歌单
      likeSongs: [] //我喜欢的音乐列表
    };
  },
  methods: {
    // ...mapMutations([
    //    'getUserwatch',
    //  ]),
    ...mapActions(["getUserwatch"]),

    getUserinfo() {
      if (this.$store.state.isLogin) {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.$http
          .get(BASE + "/user/detail?uid=" + userInfo.userId)
          .then(({ data: { code, profile } }) => {
            if (code == 200) {
              this.user = profile;
            }
          });
      }
    },
    getMusicInfo() {
      let that = this;
      that.$http
        .get(BASE + "/user/playlist?uid=" + that.$store.state.user.userId)
        .then(({ data: { playlist } }) => {
          // state.user_playList = playlist;
          that.allSongs = playlist;
          console.log(that.allSongs.slice(1))
          return that.allSongs[0].id;
        })
        .then(function(id) {
          that.$http
            .get(BASE + "/playlist/detail?id=" + id)
            .then(({ data: { playlist } }) => {
              that.likeSongs = playlist.tracks;
            });
        });
    },
    delete_song(event, index) {
      this.$confirm("确定要取消收藏该歌曲?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 500);
          } else {
            done();
          }
        }
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getSinger: function(singer) {
      var result = [];
      singer.map((val, index, singer) => {
        result.push({
          id:val.id,
          name:val.name
        });
      });
      return result;
    }
  },
  components: {
    headerTop
  },
  created() {},
  filters: {
    formatDuring: function(mss) {
      var result = "";
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds.toFixed(0);
      } else {
        seconds = seconds.toFixed(0);
      }
      result = minutes + ":" + seconds;
      return result;
    }
  },
  computed: {
    // _songInfo(val) {
    //   val = this.$store.state.user_playList;
    //   console.log(val)
    // }
  },

  mounted() {
    if (this.$store.state.user) {
      this.getUserinfo();
      this.getUserwatch();
      this.getMusicInfo();
    }
  }
};
</script>
<style lang='less' scoped >
@import url("../../assets/less/mine.less");
</style>
<style>
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}

.el-tabs__item {
  color: #fff;
  font-size: 18px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__item,
.el-tabs--card > .el-tabs__header {
  border: none;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  text-align: left !important;
}
.el-tabs__item.is-active,
.el-tabs__item:hover,
.bgMenu .el-tabs .el-tabs__content .el-tabs__item:hover,
.bgMenu .el-tabs .el-tabs__content .el-tabs__item.is-active {
  color: #31c27c !important;
}

.bgMenu .el-tabs .el-tabs__content {
  overflow: visible;
}

.bgMenu .el-tabs .el-tabs__content .el-tabs__item {
  color: #333;
}
</style>


