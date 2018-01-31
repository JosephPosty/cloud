<template>
  <div id="player">
      <div class="playBar">
          <div class="playBar_bg"></div>
          <div class="playBar_btn">
              <div class="btns">
                  <a href="javascript:void(0)"></a>
                  <a href="javascript:void(0)"></a>
                  <a href="javascript:void(0)"></a>
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
                          <div class="curBar">
                              <!-- <span></span> -->
                              <div class="block">
                                <el-slider v-model="value1"></el-slider>
                             </div>
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
                     </span>
                 </div>
              </div>
              
          </div>
          
      </div>
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
       value1:0,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: "0:00",
        // 音频最大播放时长
        maxTime: "0:00",
       
      }
    };
  },
  methods: {
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
    },
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    }
  },

  mounted() {},
  beforeDestroyed() {}
};
</script>
<style lang='less' scoped>
@import url("../assets/less/player.less");
</style>    

