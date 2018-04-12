<template>
  <div id="song">
       <header-top></header-top>
       <div class="songInfo">
           <header>
               <div class="songImg">
                   <img :src="songInfo.al?songInfo.al.picUrl:''" alt="">
               </div>
               <div class="songDes">
                   <h1>{{songInfo.name}}</h1>
                   <p>歌手: <span v-if='songInfo.ar' v-for='(ar,index) in getSinger(songInfo.ar)' :key='ar.id'><a>{{ar.name}}</a><i v-show="index!=getSinger(songInfo.ar).length-1" >/</i></span></p>
                   <p>所属专辑: <span v-if='songInfo.al'><a>{{songInfo.al.name}}</a></span></p>
                   <div class="listBtn">
                        <el-button type="primary">
                            <a href="javascript:void(0)" @click='$store.dispatch("getMusic", songInfo.id)'>
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
                              <i class="el-icon-edit"></i>评论({{$store.state.commentTotal}})</a>
                          </el-button>
                </div>
                <div class="lyric" ref='lyric' id='lyric'>
                    <h2 v-for='(lyric,index) in lyric_eng' :key="index" >
                        <span>{{lyric.eng}}</span>
                        <p>{{lyric.cn}}</p>
                    </h2>
                </div>
                <div class="showMore" v-show='showMore' @click='toggleShow()'><a>{{ showMoreText }}</a></div>
               </div>
           </header>
            <!-- 评论区 -->
            <comment></comment>
       </div>
  </div>
</template>
<script>
import store from "../../../store/store";
import headerTop from "../../../components/headerTop";
import comment from "../../../components/comment";
//Vue.component('vue-sina-emotion', VueSinaEmotion);
export default {
  data() {
    return {
      songId: "", //当前歌曲id
      songInfo: {}, //当前歌曲信息
      // comment: [], //评论信息
      cur_page: 1, //当前评论页数（分页）
      // total: "", //评论数量
      lyric_eng: [], //歌词(英语)
      lyric_cn: [], //歌词(中文)
      showMoreText: "展开",
      showMore: false,
    };
  },
  methods: {
    GETSONGINFO: function(songid) {
      this.$store.state.commentId = this.songId;
      this.$store.state.commentType = 0;
      this.$store.state.cur_page = 1;
      this.$store.dispatch("getComment");
      this.$http
        .get(BASE + "/song/detail?ids=" + songid)
        .then(({ data: { songs, privileges } }) => {
          this.songInfo = songs[0];
          return songid;
        })
        .then(() => {
          this.$http.get(BASE + "/lyric?id=" + songid).then(data => {
            if (data.data.nolyric || data.data.qfy) return;
              var arr = data.data.lrc.lyric.split("\n");
              this.lyric_eng = [];
              document.getElementById("lyric").style.overflow = "auto";
              document.getElementById("lyric").style.height = 'auto';
              arr.map(value => {
                //this.lyric_eng.push(value.split(']')[1]);
                //    if(value.split(']')[1]){
                this.lyric_eng.push({
                  eng: value.split("]")[1] ? value.split("]")[1] : ""
                });
                //    }
              });
              if (data.data.tlyric.lyric) {
              var arr_cn = data.data.tlyric.lyric.split("\n");
              arr_cn.map((value, index) => {
                //this.lyric_cn.push(value.split(']')[1]);
                if (this.lyric_eng[index] && this.lyric_eng[index].eng)
                  this.lyric_eng[index].cn = value.split("]")[1];
              });
            }
             this.$nextTick(() => {
                if (this.$refs.lyric.offsetHeight > 300) {
                  document.getElementById("lyric").style.overflow = "hidden";
                  document.getElementById("lyric").style.height = 230 + "px";
                  this.showMoreText = "展开";
                  this.showMore = true;
                } else {
                 
                  this.showMore = false;
                }
              }); 
            
            
            
          });
        })
        // .then(() => {
        //   this.$http
        //     .get(
        //       BASE + "/comment/music?id=" + songid + "&offset=" + this.cur_page
        //     )
        //     .then(({ data: { comments, total } }) => {
        //       this.total = total;
        //       this.comment = comments;
        //       console.log(comments);
        //     });
        // });
    },
    getSinger: function(singer) {
      if (singer) {
        var result = [];
        singer.map((val, index, singer) => {
          result.push({
            id: val.id,
            name: val.name
          });
        });
        return result;
      }
    },
    toggleShow: function() {
      if (this.showMoreText == "展开") {
        this.showMoreText = "收起";
        document.getElementById("lyric").style.height = "auto";
      } else {
        this.showMoreText = "展开";
        document.getElementById("lyric").style.height = 230 + "px";
      }
    },
    give: function() {

    },
    
  },
   watch: {
    '$route' (to, from) {
      if(to.name == 'songDetails') {
        this.songId = this.$route.params.songId;
        this.GETSONGINFO(this.songId);
      }
       
    }
  },
  components: {
    headerTop,
    comment
  },
  created() {
    this.songId = this.$route.params.songId;
  },
  mounted() {
    this.GETSONGINFO(this.songId);
    
  }
};
</script>
<style lang="less" scoped>
.songInfo {
  width: 800px;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
header {
  display: flex;
  margin: 20px 30px 0 0;
  padding: 20px;
  .songImg {
    margin-right: 30px;
    width: 250px;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .songDes {
    padding: 20px 0;
    h1 {
      font-size: 31px;
    }
    p {
      margin-top: 10px;
      font-size: 12px;
      color: #999999;
      span {
        display: inline-block;
        i {
          display: inline-block;
          margin: 0 5px;
        }
        a {
          color: #0c73c2;
          cursor: pointer;
        }
      }
    }
    .listBtn {
      .el-button--primary {
        background: #31c27c;
        border: 1px solid #31c27c;
        padding: 0 5px;
        margin-top: 20px;
        a {
          display: block;
          min-width: 80px;
          line-height: 30px;
          color: #fff;
          font-size: 14px;
          i {
            margin-right: 8px;
            font-size: 22px;
            vertical-align: middle;
          }
        }
      }
      .el-button--primary:hover {
        background-color: #2caf6f;
        border: 1px solid #2caf6f;
      }
    }
    .lyric {
      margin-top: 20px;
      h2 {
        margin-bottom: 5px;
        line-height: 18px;
        text-align: center;
        span {
          font-size: 14px;
        }
        p {
          margin: 0;
          text-align: center;
        }
      }
    }
    .showMore {
      a {
        display: block;
        text-align: center;
        color: #0c73c2;
        cursor: pointer;
      }
    }
  }
}

</style>

