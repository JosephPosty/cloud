<template>
    <div class="pl">
        <div class="plBox">
            <h1>
                <span>评论</span>
                <em>共{{$store.state.commentTotal}}条评论</em>
            </h1>
            <div class="mine">
                <img :src="$store.state.user.backgroundUrl" alt="">
                <textarea name="pl" id="minePl" cols="30" rows="10" v-model='mine_pl' style="resize:none;"></textarea>
                <div class="mineBtn">
                    <span>{{140-mine_pl.length}}</span>
                    <a>评论</a>
                </div>
            </div>
            <!-- 精选评论 -->
            <div class="other">
                <h2>精彩评论</h2>
                <ul class="clearfix">
                    <li v-for='(pl,index) in $store.state.commentList' :key="index">
                        <div class="otherImg">
                            <img :src="pl.user.avatarUrl" alt="">
                        </div>
                        <div class="plCont">
                            <p>
                                <a>{{pl.user.nickname}}</a>
                                <span>: {{pl.content}}</span>
                                <p v-if='pl.beReplied.length'>
                                    <div v-for="re in pl.beReplied" class='hf'>
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
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync='$store.state.cur_page'
                :total='$store.state.commentTotal'
                :page-size="20"
                 @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
    </div>
</template>
<script>
import store from "../store/store";
export default {
    data() {
        return {
            mine_pl: "", //我的评论
            cur_page: 1,
           
        }
    },
    methods: {
        handleSizeChange() {

        },
        handleCurrentChange(val) {
            this.$store.state.offset = val-1;
            this.$store.dispatch("getComment");
        }
    },
    mounted () {
    }
}
</script>
<style lang='less' scoped>
.pl {
    margin-bottom: 80px;
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
                    background: url('../assets/images/icon2.png') no-repeat;
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
<style>
.el-pagination {
    text-align: center;
}
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

