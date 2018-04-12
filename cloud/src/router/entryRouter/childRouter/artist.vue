<template>
  <div id="artist">
       <header-top></header-top>
       <div class="artist">
           <div class="artistBg">

           </div>
           <div class="artistList">
               <ul class="clearfix">
                   <li v-for='(singer,index) in artistList' :key="singer.id">
                        <router-link :to='{name:"singer",params:{singerId:singer.id}}'>
                          <div class="singerBox">
                                <img :src="singer.img1v1Url" alt="">
                                <p v-text="singer.name"></p>
                          </div>
                        </router-link>
                   </li>
               </ul>
           </div>
           <el-pagination
                background
                layout="prev, pager, next"
                :total="100"
                :page-size="30"
                 @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
       </div>
  </div>
   
</template>
<script>
import headerTop from "../../../components/headerTop";
export default {
  data () {
      return {
          artistList: [],//歌手列表
          offset:0,//分页页数
      }
  },
  methods: {
    getArtist() {
        this.$http.get(BASE + '/top/artists?limit=30&offset='+this.offset*30).then( ({data:{artists}}) => {
            
                this.artistList = artists;
                window.scrollTo(1,500);
        })
    },
    handleSizeChange(val) {
        console.log(val)
    },
    handleCurrentChange(val) {
        this.offset = val-1;
        this.getArtist();
      }
  },
  components: {
      headerTop,
  },
  mounted () {
      this.getArtist();
  }
}
</script>
<style lang='less' scoped>
    #artist {
        margin-bottom:  100px;
        .artist { 
            text-align: center;
        }
    }
    .artistBg {
        background: url('../../../assets/images/bg_singer.jpg') 50% 0 repeat-x;
        overflow: hidden;
        width: 100%;
        height: 376px;
    }
    .artistList {
        margin: 20px 0;
        ul {
            width: 1200px;
            margin: 0 auto;
            li {
                float: left;
                width: 20%;
                margin-bottom: 20px;
                overflow: hidden;
                .singerBox{ 
                    margin-right: 20px;
                    background: #fbfbfb;
                    min-height: 195px;
                    padding: 25px 0;
                    overflow: hidden;
                    text-align: center;
                    img {
                        width: 140px;
                        height: 140px;
                        border-radius: 50%;
                    }
                    p {
                        font-size: 16px;
                        font-weight: 400;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        zoom: 1;
                        margin: 20px 30px 4px;
                    }
                    p:hover {color: #31c27c;cursor: pointer;}
                }
            }
        }
    }
   
</style>
<style>
    .el-pagination.is-background .el-pager li {
         background: #fff;
    }
     .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #31c27c;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #fff; 
        background: #31c27c;
    }
    .el-pagination.is-background .el-pager li.active:hover {
        color: #fff;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        padding: 0 21px;
        font-size: 16px;
        height: 50px;
        line-height: 50px; 
        color: #a2a2a2;
        background: #fff;
    }
</style>



