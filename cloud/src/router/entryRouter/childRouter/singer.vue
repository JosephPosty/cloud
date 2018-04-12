<template>
  <div id="singer">
    <header-top></header-top>
    <div class="singerCton clearfix">
      <div class="singerLeft">
        <div class="singerInfo">
          <h1>{{singerInfo.name}}
            <small v-if='singerInfo.alias'>{{singerInfo.alias[0]}}</small>
          </h1>
          <div class="singerImg">
            <img :src="singerInfo.picUrl" alt="">
          </div>
          <div class="details">
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane label="热门50单曲" name="first" v-loading='loading'>
                
                <ul>
                  <el-button @click="playAll()">播放热门歌曲</el-button>
                  <li v-for="(songs,index) in hotSongs" :key='index' :songId='songs.id'>
                    <a href="javascript:void(0)" class="clearfix">
                      <span>
                        <small>
                          <a href="javascript:void(0)">{{songs.name}}</a>
                        </small>
                        <!-- <small></small> -->
                        <div class="hideMenu">
                          <a href="javascript:void(0)" :songId='songs.id' @click='$store.dispatch("getMusic", songs.id)'>
                            <i class="_icon_play"></i>
                          </a>
                          <a href="javascript:void(0)" @click="add()">
                            <i class="_icon_add"></i>
                          </a>
                          <a href="javascript:void(0)">
                            <i class="_icon_down"></i>
                          </a>
                          <a href="javascript:void(0)">
                            <i class="_icon_share"></i>
                          </a>
                        </div>
                      </span>
                      <!-- <label>{{ songs.ar | getSinger(songs.ar) }}</label> -->
                      <!--<label>
                    <router-link :to="{ name: 'singer', params: { singerId: singer.id }}" :singerid='singer.id'>{{ singer.name }}</router-link>
                  </label>-->
                      <em>
                        <a href="javascript:void(0)"> {{ songs.al.name }}</a>

                      </em>
                      <i class="song_time">{{ GLOBAL.formatDuring(songs.dt) }}</i>
                      <div class="_other"></div>

                    </a>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="所有专辑" name="second" >
                <div class="album">
                  <ul>
                    <li v-for="info in album" :key="info.id">
                      <a href="">
                        <img :src="info.picUrl" alt="">
                        <p>{{info.name}}</p>
                        <span>{{ GLOBAL.getDate(info.publishTime) }}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="歌手介绍" name="fourth">
                <div class="dec">
                  <div class="brieDesc">
                    <h1><i></i>&nbsp;<span>{{singerInfo.name}}简介</span></h1>
                    <p v-if="desc.briefDesc">{{desc.briefDesc}}</p>
                    <p v-else>暂无介绍</p>
                  </div>
                  <div class="descDt" v-if="desc.introduction">
                    <div class="Descdetails" v-for="cton in desc.introduction">
                      <h3>{{cton.ti}}</h3>
                      <p>{{cton.txt}}</p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
      </div>
      <div class="singerRight">
        <div class="likeSinger clerafix">
        <h1>相似歌手</h1>
          <ul class="clerafix">
          <li v-for="info in likeSinger" :key="info.id">
              <!--<a href="">-->
               <router-link :to='{name:"singer",params:{singerId:info.id}}'>
                 <img :src="info.img1v1Url" alt="">
                  <p>{{info.name}}</p>
               </router-link>
                  
              <!--</a>-->
          </li>
        </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import store from "../../../store/store";
import headerTop from "../../../components/headerTop";
export default {
  data() {
    return {
      singerId: '',
      singerInfo: {},
      menuTitle: ['热门50单曲', '所有专辑', '相关MV', '歌手介绍'],
      menu_index: 0,
      singer_descrition: '',//描述
      activeName: 'first',
      hotSongs: [],//热门歌曲
      likeSinger: [],//相似歌手
      loading: true,
      album: [],//专辑
      desc: {},//歌手介绍
    }
  },

  methods: {
    getSingerinfo(id) {
      //let that = this;
      this.$http.get(BASE + '/artists?id=' + id).then((data) => {
        this.singerInfo = data.data.artist;
        this.hotSongs = data.data.hotSongs;
        // this.loading = false
        
      });
      this.$http.get(BASE + '/artist/desc?id=' + id).then((info) => {
        this.desc = info.data;
        console.log(this.desc)
      });
      this.$http.get(BASE + '/simi/artist?id=' + id).then(({ data: { artists } }) => {
        this.likeSinger = artists;
      });
      this.$http.get(BASE + '/artist/album?id='+ id +'&limit=30&offset=0').then(({data:{hotAlbums}})=> {
     
        this.album = hotAlbums;
        this.$nextTick (() => {this.loading = false;})
      })
    },
    playAll: function(){  //播放全部
      let that = this;
      that.$store.state.list_id = [];
      that.hotSongs.map((val,index) => {
       that.$store.state.list_id.push(val.id);
    })
     that.$store.state.CURPLAYLIST = that.hotSongs;
     that.$store.dispatch("getMusic", that.$store.state.list_id[0])
    },
  },
  components: {
    headerTop,
  },
     
  watch: {
    '$route'(to, from) {
      if (to.name == 'singer') {
        this.singerId = this.$route.params.singerId;
        this.getSingerinfo(this.singerId);
      }

    }
  },
  created() {
    this.singerId = this.$route.params.singerId;
  },
  mounted() {
    this.getSingerinfo(this.singerId);
  }
}
</script>
<style lang='less' scoped>
@import url("../../../assets/less/singer.less");
</style>
<style>
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #333;
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
  color: #31c27c;
}
.el-loading-mask {
  z-index: 8;
}
.el-tabs--border-card>.el-tabs__content,.el-loading-mask {
  min-height: 600px;
}
.el-button:focus, .el-button:hover {
  color: #31c27c;
  border: 1px solid #31c27c;
  
}
</style>
