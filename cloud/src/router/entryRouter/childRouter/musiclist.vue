<template>
  <div class="musicList">
    <header-top></header-top>
    <div class="listInfo clearfix">
      <div class="musicList_left">
        <h1>我的歌单({{user_list.length}})<a><i>+</i> 新建</a></h1>
        <ul ref='ul_list' id='ul_list'>
          <li v-for="(list) in user_list" :key="list.id"  @click="getListinfo(list.id)">
            <router-link :to="{ name: 'musiclist', params: { listId: list.id }}">
<img :src="list.coverImgUrl" alt="">
              <div class="list_message">
                <p>{{list.name}}</p>
                <span>{{list.trackCount}}首</span>
                
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="musicList_right">
        <header class="clearfix">
        <div class="listImg">
          <img :src="listInfo.coverImgUrl" alt="">
        </div>
        <div class="listDetails">
          <h1><i></i><span>{{listInfo.name}}</span></h1>
          <h2><img :src="listInfo.creator?listInfo.creator.avatarUrl:''" ><a v-text="listInfo.creator?listInfo.creator.nickname:''"></a><em v-text="GLOBAL.getDate(listInfo.createTime) + '创建'"></em> </h2>
          <div class="listBtn">
            <el-button type="primary">
                            <a href="javascript:void(0)" @click="playAll()">
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
        <div class="tag">
          <p v-if="listInfo.tags&&listInfo.tags.length">标签 ： <span v-for="tag in listInfo.tags" :key='tag' v-text="tag"></span></p>
          <p v-else>标签 ： <span>暂无标签</span></p>
          <p>介绍 ：{{ listInfo.description?listInfo.description:'暂无介绍' }}</p>
        </div>
        </div>
        
      </header>
      <div class="listSongs">
      <h1><p>歌曲列表 <span>{{listInfo.trackCount}}首歌</span></p><i>播放 : <em>{{listInfo.playCount}}</em>次</i></h1>
      <div class="details">
                        <ul>
                          <li>
                            <a href="javascript:void(0)" class="clrarfix">
                              <span>歌曲</span>
                              <label>歌手</label>
                              <em>专辑</em>
                              <i>时长</i>
                            </a>

                          </li>
                          <li v-for="(songs,index) in listInfo.tracks" :key='index' :songId='songs.id'>
                            <a href="javascript:void(0)" class="clearfix">
                              <span>
                                  <small><router-link :to="{ name: 'songDetails', params: { songId: songs.id }}" >
                                                {{ songs.name }}
                                            </router-link></small>
                                <!-- <small></small> -->
                                <div class="hideMenu" >
                                      <a href="javascript:void(0)" :songId='songs.id' @click='$store.dispatch("getMusic", songs.id)'>
                                        <i class="_icon_play"></i>
                                      </a>
                                      <a href="javascript:void(0)" @click="add()" >
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
                              <label>
                                  <span v-for='(singer,index) in getSinger(songs.artists)' :key='Math.random()'>
                                    
                                      <router-link :to="{ name: 'singer', params: { singerId: singer.id }}" :singerid='singer.id'>{{ singer.name }}</router-link>
                                      <!-- <a href="javascript:void(0)" :singerid='singer.id'>{{ singer.name }}</a> -->
                                      
                                   
                                    <i v-show="index!=getSinger(songs.artists).length-1" >/</i>
                                    </span>
                              </label>
                              <em>
                                  <a href="javascript:void(0)"> {{ songs.album.name }}</a>
                                 
                                
                              </em>
                              <i class="song_time">{{ GLOBAL.formatDuring(songs.duration) }}</i>
                              <div class="_other"></div>
                                <a href="javascript:void(0)" class="_icon_delete" @click="delete_song($event,index)"></a>
                              
                            </a>
                          </li>
                        </ul>        
      </div>
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
      listId: "", //歌单id
      listInfo: {}, //歌单信息,
      user_list: [],//用户歌单
    };
  },
  methods: {
    getListinfo(id) {
      let that = this;
      
      that.$http.get(BASE + "/playlist/detail?id=" + id).then(data => {
        that.listInfo = data.data.result;
        console.log(that.listInfo.tracks);
      });
      that.$http.get(BASE + '/user/playlist?uid=' + that.$store.state.user.userId).then(({ data: { playlist } }) => {
               that.user_list = playlist;
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
    },
    playAll: function (){
      let that = this;
      that.$store.state.list_id = [];
      that.listInfo.tracks.map((val,index) => {
       that.$store.state.list_id.push(val.id);
    })
     that.$store.state.CURPLAYLIST = that.listInfo.tracks;
     that.$store.dispatch("getMusic", that.$store.state.list_id[0])
    },
    add: function(){
      this.$http.get(BASE + '/like?id=534128317').then(function(data){
        console.log(data)
      })
    }
  },
  components: {
    headerTop
  },
  watch: {
    '$route' (to, from) {
      if(to.name == 'musiclist') {
       this.listId = this.$route.params.listId;
        this.getListinfo(this.listId);
      }
       
    }
  },
  created() {
    this.listId = this.$route.params.listId;
   
  },
  mounted() {
    this.getListinfo(this.listId);
     this.$nextTick(()=> {
        document.getElementById('ul_list').style.height = window.innerHeight+'px';
     })
           
  }
};
</script>
<style lang='less' scoped >
@import url("../../../assets/less/musicList.less");
</style>

