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
                              <i class="el-icon-edit"></i>评论({{total}})</a>
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
            <div class="pl">
               <div class="plBox">
                    <h1><span>评论</span><em>共{{total}}条评论</em></h1>
                    <div class="mine">
                        <img :src="$store.state.user.backgroundUrl" alt="">
                        <textarea name="pl" id="minePl" cols="30" rows="10" v-model='mine_pl' style="resize:none;"></textarea>
                        <div class="mineBtn">
                            <span>{{140-mine_pl.length}}</span>
                            <a>评论</a>
                        </div>
                    </div>
                    <!-- <div class="emotion">
                        <a v-for='(src,index) in emotions' :key='index' :title='src.title'>
                            <img :src="src.url" alt="" >
                        </a>
                    </div> -->
                    <!-- 精选评论 -->
                    <div class="other">
                        <h2>精彩评论</h2>
                        <ul class="clearfix">
                            <li v-for='(pl,index) in comment' :key="index">
                                <div class="otherImg">
                                    <img :src="pl.user.avatarUrl" alt="">
                                </div>
                                <div class="plCont">
                                    <p>
                                        <a>{{pl.user.nickname}}</a>
                                        <span>: {{pl.content}}</span>
                                        <p v-if='pl.beReplied.length'>
                                                <div v-for="re in pl.beReplied" :key='re' class='hf'>
                                                    <span>{{re.user.nickname}}</span> : {{re.content}}
                                                </div>
                                        </p>
                                    </p>
                                    <div class="plBottom">
                                        <small>{{GLOBAL.getDate(pl.time)}}</small>
                                        <div class="rp">
                                            <i @click='give()'></i>
                                            <span>回复</span>
                                        </div>
                                    </div>
                                </div>
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
//Vue.component('vue-sina-emotion', VueSinaEmotion);
export default {
  data() {
    return {
      songId: "", //当前歌曲id
      songInfo: {}, //当前歌曲信息
      comment: [], //评论信息
      cur_page: 1, //当前评论页数（分页）
      total: "", //评论数量
      lyric_eng: [], //歌词(英语)
      lyric_cn: [], //歌词(中文)
      showMoreText: "展开",
      showMore: false,
      mine_pl: "", //我的评论
      emotions: [
        {
          title: "大笑",
          url: "http://s1.music.126.net/style/web2/emt/emoji_86.png"
        },
        {
          title: "可爱",
          url: "http://s1.music.126.net/style/web2/emt/emoji_85.png"
        }
      ]
    };
  },
  methods: {
    GETSONGINFO: function(songid) {
      this.$http
        .get(BASE + "/song/detail?ids=" + songid)
        .then(({ data: { songs, privileges } }) => {
          this.songInfo = songs[0];
          return songid;
        })
        .then(() => {
          this.$http.get(BASE + "/lyric?id=" + songid).then(data => {
            if (data.data.nolyric) return;
            var arr = data.data.lrc.lyric.split("\n");
            arr.map(value => {
              //this.lyric_eng.push(value.split(']')[1]);
              //    if(value.split(']')[1]){
              this.lyric_eng.push({
                eng: value.split("]")[1] ? value.split("]")[1] : ""
              });
              //    }
            });
            if (data.data.tlyric) {
              var arr_cn = data.data.tlyric.lyric.split("\n");
              arr_cn.map((value, index) => {
                //this.lyric_cn.push(value.split(']')[1]);
                if (this.lyric_eng[index] && this.lyric_eng[index].eng)
                  this.lyric_eng[index].cn = value.split("]")[1];
              });
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
            } else {
              this.showMore = false;
            }
          });
        })
        .then(() => {
          this.$http
            .get(
              BASE + "/comment/music?id=" + songid + "&offset=" + this.cur_page
            )
            .then(({ data: { comments, total } }) => {
              this.total = total;
              this.comment = comments;
              console.log(comments);
            });
        });
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

    }
  },
  components: {
    headerTop
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
.plBox {
  margin: 20px auto;
  padding: 0 20px;
  position: relative;
  h1 {
    border-bottom: 2px solid #c20c0c;
    line-height: 28px;
    span {
      font-size: 20px;
    }
    em {
      color: #666;
      display: inline-block;
      margin-left: 15px;
      font-size: 12px;
    }
  }
  .mine {
    margin-left: 60px;
    margin-top: 20px;
    margin-bottom: 40px;
    img {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 20px;
    }
    #minePl {
      height: 50px;
      width: 100%;
      padding: 5px 6px 6px;
      box-sizing: border-box;
    }
    .mineBtn {
      text-align: right;
      margin-top: 10px;
      a {
        display: inline-block;
        padding: 3px 15px;
        background: #31c27c;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
      span {
        color: #999;
        padding-right: 10px;
      }
    }
  }
  .other {
      h2 {
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          font-size: 14px;
      }
    li {
      display: flex;
      width: 100%;
      border-bottom: 1px dotted #ccc;
      padding: 15px 0;
     min-height: 50px;
      position: relative;
      .hf {
          background: #f4f4f4;
          padding: 8px 19px;
          border: 1px solid #dedede;
          word-break: break-word;
          line-height: 20px;
          font-size: 12px;
          span {
              color: #0c73c2!important;
          }
      }
      .otherImg {
          position: absolute;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .plCont {
          padding-left: 70px;
          width: 100%;
        a {
          cursor: pointer;
          color: #0c73c2;
          font-size: 12px;
        }
        span {
            font-size: 12px;
            color: #333;
            line-height: 20px;
        }
        .plBottom {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            small {
                color: #999;
                font-size: 12px;
            }
            .rp {
                line-height: 20px;
                i {
                    display: inline-block;
                    width: 15px;
                    height: 14px;
                    background: url('../../../assets/images/icon2.png') no-repeat;
                    background-position: -150px -20px; 
                    cursor: pointer;
                    vertical-align: middle;
                    margin-right: 5px;
                    
                }
                span {
                    border-left: 1px solid #999;
                    padding-left: 10px;
                    vertical-align: bottom;
                }
            }
        }
      }
    }
  }
}
</style>

