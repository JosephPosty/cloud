<template>
  <div id="player">
    <div class="playBar">
      <div class="playBar_bg"></div>
      <div class="playBar_btn">
        <div class="btns">
          <a href="javascript:void(0)" class='lastSong' @click='_lastSong()'></a>
          <!-- 暂停 -->
          <a href="javascript:void(0)" @click='setStatus("pause")' class='pause' v-if='$store.state.playing'></a>
          <!-- 播放 -->
          <a href="javascript:void(0)" @click='setStatus("playing")' v-if='!$store.state.playing' class='playing'></a>
          <a href="javascript:void(0)" class='nextSong' @click="_nextSong()"></a>
        </div>
        <div class="musicImg">
          <!--<a href="javascript:void(0)">-->
          <router-link :to="{name:'songDetails',params:{ songId: $store.state.MUSICINFO.id}}">
            <img :src="$store.state.MUSICINFO.al?$store.state.MUSICINFO.al.picUrl:''" alt="">
            <span></span>
          </router-link>

          <!--</a>-->
        </div>
        <div class="playInfo">
          <div class="musicInfo">
            <router-link :to="{ name: 'songDetails', params: { songId: $store.state.MUSICINFO.id}}">
              {{ $store.state.MUSICINFO.name }}
            </router-link>
            <!--<a href="javascript:void(0)">{{$store.state.MUSICINFO.name}}</a>-->
            <em>
              <span v-for='(singer,index) in $store.state.MUSICINFO.ar' :key='index'>
                <!--<a href="javascript:void(0)"></a>-->

                <router-link :to="{ name: 'singer', params: { singerId: singer.id }}" :singerid='singer.id' v-text='singer.name'></router-link>
                <i v-show='index != $store.state.MUSICINFO.ar.length-1'>/</i>
              </span>
            </em>
          </div>
          <div class="sliderBar">
            <div class="wholeBar">
              <div class="readyBar">

              </div>

              <!-- <span></span> -->
              <div class="block">
                <el-slider @change="sliderBar_change()" v-model="value1" :show-tooltip="false" :max="maxLength"></el-slider>
              </div>

            </div>
            <div class="musicTime">
              <span class="curTime">{{ GLOBAL.realFormatSecond(audio.currentTime) }}</span>
              <em>/</em>
              <span>{{GLOBAL.realFormatSecond(audio.maxTime)}}</span>
            </div>
          </div>
          <div class="addShare">
            <a href="javascript:void(0)" @click="showList()"></a>
            <a href="javascript:void(0)"></a>
          </div>
          <div class="controls">
            <a href="javascript:void(0)" class="voice"></a>
            <a href="javascript:void(0)" class="playType"></a>
            <span>
              <a href="javascript:void(0)"></a>
              <i>{{$store.state.CURPLAYLIST.length}}</i>
            </span>
          </div>
        </div>

      </div>

    </div>
    <!-- 播放器列表 -->
    <div class="showList">
      <el-dialog title="添加到歌单" :visible.sync="dialogVisible" width="30%" :modal='false' :close-on-click-modal='false'>
        <div class="allList">
          <h1>
            <i></i>
            <span>新歌单</span>
          </h1>
          <ul class="clearfix">
            <li v-for="songsList in $store.state.user_playList" :key="songsList.id" v-if="songsList.creator.userId == $store.state.user.userId" @click='_addSongtolist(songsList.id)'>
              <div class="listItem">
                <div class="left">
                  <img :src="songsList.coverImgUrl" alt="">
                </div>
                <div class="right">
                  <p>{{songsList.name}}</p>
                  <span>{{songsList.trackCount}}首</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>

    <audio :src='$store.state.MUSICURL' @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata" controls autoplay="autoplay" style="display:none" ref='player' id='audio'></audio>
  </div>
</template>
<script>
import store from "../store/store";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      MUSICURL: "",
      music_img: "",
      musicName: "",
      //_currentTime:'',//音乐当前播放时间
      //_durationTime:'',//音乐总时长
      timeDuration: "",
      tiemNow: "",
      value1: 0,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: "0:00",
        // 音频最大播放时长
        maxTime: "0:00"
      },
      maxLength: 0,
      dialogVisible: false,

    };
  },
  methods: {
    // ...mapActions([
    //   "getUserwatch",
    //   "getMusic",
    //   ]),
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.value1 = parseInt(this.audio.currentTime);
      if (this.audio.currentTime > 1) {
        if (this.$refs.player.paused) {
          this.$store.state.playing = false;
        }
        if (this.audio.maxTime == this.value1) {
          if (this.$store.state.list_id.length > 1) {
            this.$store.state.CURMUSICINDEX = this.$store.state.list_id.indexOf(
              this.$store.state.MUSICID
            );
            if (
              this.$store.state.CURMUSICINDEX ==
              this.$store.state.list_id.length - 1
            ) {
              this.$store.state.CURMUSICINDEX = 0;
              let lastId = this.$store.state.list_id[0];
              this.$store.dispatch("getMusic", lastId);
            } else {
              let lastId = this.$store.state.list_id[
                this.$store.state.CURMUSICINDEX + 1
              ];
              this.$store.dispatch("getMusic", lastId);
            }
          }
        }
      }
    },
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
      this.maxLength = res.target.duration;
    },
    sliderBar_change() {
      this.audio.currentTime = this.value1;
      this.$refs.player.currentTime = this.value1;
      var timeRanges = this.$refs.player.buffered;
      // 获取以缓存的时间
      var timeBuffered = timeRanges.end(timeRanges.length - 1);
      // 获取缓存进度，值为0到1
      var bufferPercent = timeBuffered / this.$refs.player.duration;
    },
    setStatus(status) {
      //设置播放/暂停
      if (status == "pause") {
        this.$store.state.playing = false;
        this.$refs.player.pause();
      } else {
        this.$store.state.playing = true;
        this.$refs.player.play();
      }
    },
    _lastSong() {
      //上一首
      this.$store.state.CURMUSICINDEX = this.$store.state.list_id.indexOf(
        this.$store.state.MUSICID
      );

      if (this.$store.state.CURPLAYLIST.length) {
        if (
          //当前播放第一收点击上一首
          this.$store.state.CURMUSICINDEX == 0 ||
          this.$store.state.CURMUSICINDEX ==
          this.$store.state.CURPLAYLIST.length
        ) {
          let lastId = this.$store.state.list_id[
            this.$store.state.list_id.length - 1
          ];
          this.$store.state.CURMUSICINDEX =
            this.$store.state.CURPLAYLIST.length - 1;
          this.$store.dispatch("getMusic", lastId);
        } else {
          let lastId = this.$store.state.list_id[
            this.$store.state.CURMUSICINDEX - 1
          ];
          this.$store.dispatch("getMusic", lastId);
        }
      }
    },
    _nextSong() {
      //下一首
      this.$store.state.CURMUSICINDEX = this.$store.state.list_id.indexOf(
        this.$store.state.MUSICID
      );

      if (this.$store.state.CURPLAYLIST.length) {
        if (
          //当前播放最后一首点击下一首
          this.$store.state.CURMUSICINDEX ==
          this.$store.state.CURPLAYLIST.length - 1
        ) {
          let lastId = this.$store.state.list_id[
            0
          ];
          this.$store.state.CURMUSICINDEX = 0;
          this.$store.dispatch("getMusic", lastId);
        } else {
          let lastId = this.$store.state.list_id[
            this.$store.state.CURMUSICINDEX + 1
          ];
          this.$store.dispatch("getMusic", lastId);
        }
      }
    },
    showList() {
      if (this.$store.state.isLogin) {
        if(!this.$store.state.CURPLAYLIST.length) {
          this.$message({
          message:'当前没有播放的歌曲',
          duration: 2000
        });
        }else {
            this.dialogVisible = true;
            this.$store.dispatch("getUserwatch");
        }
        
      } else {
        this.$message({
          message:'请先登录',
          duration: 2000
        });
      }
    },
    _addSongtolist(listId) {

      let songId = this.$store.state.MUSICINFO.id;
      let curListsongs = [];
      // this.$http.get(BASE + '/playlist/detail?id='+ listId).then( (data) => {
        // curListsongs = data.data.result.tracks;
        // for(let i = 0;i<curListsongs.length;i++) {
        //   if(curListsongs[i].id == songId){
        //       this.$message.error('歌曲已存在!');
        //      this.dialogVisible = false;
        //   }else {
        //       this.$http.get(BASE + '/playlist/tracks?op=add&pid='+listId+'&tracks='+songId).then((result)=>{
        //       console.log(result);
              
        //     })
        //   }
        //   return false;
        // }
         this.$http.get('http://localhost:3000/playlist/tracks?op=add&pid=314639144&tracks=347230').then((result)=>{
              console.log(result);
              
            })
      // })
    }
  },

  mounted() {

  }
};
</script>
<style lang='less' scoped>
@import url("../assets/less/player.less");
</style>    
<style>
.el-slider__runway {
  height: 9px;
  margin: 0;
  background: none;
}

.el-slider__bar {
  height: 9px;
  background: rgb(147, 18, 18);
}

.el-slider__button {
  border: none;
}

.el-slider__button-wrapper {
  top: -14px;
}

.showList .el-dialog__body {
  padding: 0;
}
</style>


