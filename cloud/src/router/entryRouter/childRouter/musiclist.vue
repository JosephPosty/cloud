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
      <h1>歌曲列表 <span>{{listInfo.trackCount}}首歌</span></h1>
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
        console.log(data);
        that.listInfo = data.data.playlist;
        console.log(that.listInfo);
      });
      that.$http.get(BASE + '/user/playlist?uid=' + that.$store.state.user.userId).then(({ data: { playlist } }) => {
               that.user_list = playlist;
              console.log(that.user_list)
            });
     
    }
  },
  components: {
    headerTop
  },
  created() {
    this.listId = this.$route.params.listId;
   
  },
  mounted() {
    this.getListinfo(this.listId);
      document.getElementById('ul_list').style.height = window.innerHeight-300+'px';
           
  }
};
</script>
<style lang='less' scoped >
@import url("../../../assets/less/musicList.less");
</style>

