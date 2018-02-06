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
                  <a href="javascript:void(0)"  @click='setStatus("playing")' v-if='!$store.state.playing' class='playing'></a>
                  <a href="javascript:void(0)" class='nextSong' @click="_nextSong()"></a>
              </div>
              <div class="musicImg">
                <a href="javascript:void(0)">
                    <img :src="$store.state.MUSICINFO.al?$store.state.MUSICINFO.al.picUrl:''" alt="">
                    <span></span>
                </a>
              </div>
              <div class="playInfo">
                  <div class="musicInfo">
                      <a href="javascript:void(0)">{{$store.state.MUSICINFO.name}}</a>
                      <span v-for='(singer,index) in $store.state.MUSICINFO.ar' :key='index'>
                          <a href="javascript:void(0)" v-text='singer.name'></a>
                          <i v-show='index != $store.state.MUSICINFO.ar.length-1'>/</i>
                      </span>
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
                          <span class="curTime">{{ GLOBAL.realFormatSecond(audio.currentTime)  }}</span>
                          <em>/</em>
                          <span>{{GLOBAL.realFormatSecond(audio.maxTime)}}</span>
                      </div>
                  </div>
                  <div class="addShare">
                    <a href="javascript:void(0)"></a>
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

      
     <audio :src='$store.state.MUSICURL' @timeupdate="onTimeupdate"   @loadedmetadata="onLoadedmetadata" controls autoplay="autoplay" style="display:none" ref='player' id='audio'></audio>
  </div>
</template>
<script>
import store from "../store/store";
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
      maxLength: 0
    };
  },
  methods: {
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.value1 = parseInt(this.audio.currentTime);
      if (this.audio.currentTime > 1) {
        if (this.$refs.player.paused) {
          this.$store.state.playing = false;
        }
        if (this.audio.maxTime == this.value1) {
          if (this.$store.state.list_id.length > 1) {
            this.$store.state.CURMUSICINDEX = this.$store.state.list_id.indexOf(this.$store.state.MUSICID);
            if (this.$store.state.CURMUSICINDEX ==this.$store.state.list_id.length-1) {
              console.log('last')
              this.$store.state.CURMUSICINDEX = 0;
              let lastId = this.$store.state.list_id[0];
              this.$store.dispatch("getMusic", lastId);
            } else {
              console.log('next')
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
      let lastId = this.$store.state.list_id[
        this.$store.state.CURMUSICINDEX - 1
      ];
      if (this.$store.state.CURPLAYLIST.length) {
        if (
          this.$store.state.CURMUSICINDEX == 0 ||
          this.$store.state.CURMUSICINDEX ==
            this.$store.state.CURPLAYLIST.length
        ) {
          return;
        } else {
          this.$store.dispatch("getMusic", lastId);
        }
      }
    },
    _nextSong() {
      //下一首
      this.$store.state.CURMUSICINDEX = this.$store.state.list_id.indexOf(
        this.$store.state.MUSICID
      );
      let lastId = this.$store.state.list_id[
        this.$store.state.CURMUSICINDEX + 1
      ];
      if (this.$store.state.CURPLAYLIST.length) {
        if (
          this.$store.state.CURMUSICINDEX ==
          this.$store.state.CURPLAYLIST.length - 1
        ) {
          return;
        } else {
          this.$store.dispatch("getMusic", lastId);
        }
      }
    }
  },

  mounted() {}
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
</style>


