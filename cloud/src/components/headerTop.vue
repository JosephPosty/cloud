<template>
  <div class="header">
    <header>
      <div class="topMenu">
        <ul>
          <li>
            <router-link to='/'>音乐馆</router-link>
          </li>
          <li>
            <router-link to='/mine'>我的音乐</router-link>
          </li>
          <li>
            <a href="javascript:void(0)">客户端</a>
          </li>
          <li>
            <a href="javascript:void(0)">音乐号</a>
          </li>
          <li>
            <a href="javascript:void(0)">VIP</a>
          </li>
        </ul>
      </div>
      <div class="topSearch">
        <input type="text" placeholder="搜索关键字" v-model="keyWord" @click.stop='searchFocus()'>
        <button></button>
        <div id="search"  @click.stop v-show='showResult'>
          <div class="result">
             <div class="result_songs" v-show='SEARCHRESULT.songs'>
               <h1><i></i><span>单曲</span></h1>
               <ul>
                 <li v-for="(song,index) in SEARCHRESULT.songs" :key="index" :id='song.id'>
                   <a >
                     <span>{{ song.name }}</span>
                   </a>
                 </li>
               </ul>
             </div>
             <div class="result_singer" v-show='SEARCHRESULT.artists'>
                <h1><i></i><span>歌手</span></h1>
                <ul>
                 <li v-for="(artist,index) in SEARCHRESULT.artists" :key="index" :id='artist.id'>
                   <a >
                     <span>{{ artist.name }}</span>
                   </a>
                 </li>
                </ul>
             </div>
             <div class="result_ablum" v-show='SEARCHRESULT.albums'>
                <h1><i></i><span>专辑</span></h1>
                <ul>
                 <li v-for="(albums,index) in SEARCHRESULT.albums" :key="index" :id='albums.id'>
                   <a >
                     <span>{{ albums.name }}</span>
                   </a>
                 </li>
               </ul>
             </div>
             <div class="result_mv" v-show='SEARCHRESULT.mvs'>
                <h1><i></i><span>MV</span></h1>
                <ul>
                 <li v-for="(mvs,index) in SEARCHRESULT.mvs" :key="index" :id='mvs.id'>
                   <a >
                     <span>{{ mvs.name }}</span>
                   </a>
                 </li>
               </ul>
             </div>
             <!-- <div class="no_result" v-show='JSON.stringify(SEARCHRESULT) =="{}"'>
               <p>暂无搜索结果</p>
             </div> -->
          </div>
        </div>
      </div>
      <!-- 登录组件 1.未登录，2.本地缓存 -->
      <div id="login">
        <div class="loginStatu">
           <div class="signin" v-if="!loginState">
             <a href="javascript:void(0)" @click="$store.state.loginShow = true">登录</a>
           </div>
           <div class="signed" v-if="loginState"  @click.stop>
             <div class="login_imgInfo">
               <a href="javascript:void(0)" @click="Imghover()">
                 <img :src="loginUserinfo.backgroundUrl" alt="">
                 <i></i>
                 <div class="slideInfo" v-show='userImghover'>
                 <ul>
                   <li @click="logout()">退出</li>
                 </ul>
               </div>
               </a>
               
             </div>
           </div>
        </div>
        <div class="musiceVip">
          <button>开通绿钻豪华版</button>
          <button>开通付费包</button>
       </div>
      </div>
      
    </header>
    <div class="menu">
                <ul class="clearfix">
                    <li><router-link to='/'>首页</router-link></li>
                    <li><router-link to='/'>歌手</router-link></li>
                    <li><router-link to='/'>专辑</router-link></li>
                    <li><router-link to='/'>排行榜</router-link></li>
                    <li><router-link to='/'>分类歌单</router-link></li>
                    <li><router-link to='/'>电台</router-link></li>
                    <li><router-link to='/'>MV</router-link></li>
                    <li><router-link to='/'>数字专辑</router-link></li>
                </ul>
            </div>
    <el-dialog title="手机号登录" :visible.sync="$store.state.loginShow" width='400px' >
      <el-form :model="form" :rules='loginRule' ref='user_login' >
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop='phoneNum'>
          <el-input v-model="form.phoneNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toLogin()" @keyup.enter="toLogin()">确 定</el-button>
      </div>
</el-dialog>

  </div>
</template>

<script>
import store from "../store/store";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "headerTop",
  data() {
    return {
      form: {
        phoneNum: "18850343832",
        password: "qq1403009724"
      },
      loginRule: {
        phoneNum: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          },
          { required: true, message: "不能为空" }
          //{validator:checkPhone,trigger:'blur'},
        ],
        password: [{ required: true, message: "不能为空" }]
      },
      // dialogTableVisible: false,
      // dialogFormVisible: false,
      formLabelWidth: "80px",
      loginState:
      Boolean(JSON.parse(localStorage.getItem("userInfo"))) || false, //用户登录状态
      userImghover: false, //用户头像下拉选项
      loginUserinfo: {}, //用户登录后的信息
      keyWord: '',//搜索关键词
      SEARCHRESULT: {},
      showResult: true,//搜索结果显示隐藏
    };
  },
  methods: {
    ...mapActions(["getUserwatch"]),
    toLogin() {
      //用户登录
      this.$refs.user_login.validate(valid => {
        if (valid) {
          let that = this;
          that.$http
            .get(
              BASE +
                "/login/cellphone?phone=" +
                that.form.phoneNum +
                "&password=" +
                that.form.password
            )
            .then(data => {
              //that.$store.commit('userSignin') //登录之后处理放在store
              if (data.data.code == 501) {
                that.$message.error('账号密码不存在');
              } else if(data.data.code == 502) {
                that.$message.error('密码错误');
              }else {
                that.$store.state.loginShow = false;
                that.loginState = true;
                that.loginUserinfo = data.data.profile;
                that.$store.state.isLogin = true;
                window.localStorage.setItem(
                  "userInfo",
                  JSON.stringify(that.loginUserinfo)
                );
                that.$store.state.user = that.loginUserinfo;
               
                setTimeout(() => {
                  that.getUserwatch();
                   console.log(that.$store.state.user_playList)
                }, 1000);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    Imghover() {
      this.userImghover = !this.userImghover;
    },
    ImgLeave() {
      this.userImghover = false;
    },
    logout() {
      this.loginState = false;
      this.$store.state.isLogin = false;
      localStorage.clear("userInfo");
    },
    getLogininfo() {
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        this.loginUserinfo = JSON.parse(localStorage.getItem("userInfo"));
        this.loginState = true;
        this.$store.state.isLogin = true;
      }
    },
    searchFocus() {
      this.showResult = true;
    }
  },
  computed: mapState({
    dialogTableVisible: state => state.loginShow
  }),
  watch: {
    keyWord: function(val,newVal) {
      if(val) {
          this.showResult = true;
          this.$http.get(BASE + '/search/suggest?keywords='+val).then( ({data :{ result }}) => {
          this.SEARCHRESULT = result;
          console.log(this.SEARCHRESULT)
      })
     }else {
       this.SEARCHRESULT = {};
     }
    }
  },
  created() {
    document.addEventListener("click", e => {
      this.userImghover = false;
      this.showResult = false;
    });
  },
  mounted() {
    this.getLogininfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less' scoped>
@import url("../assets/less/headerTop.less");
</style>
<style lang='less'>
.el-dialog {
  width: 530px;
  border-radius: 4px;
}
.el-dialog__header {
  background: #2d2d2d;
  border-radius: 4px 4px 0 0;
  line-height: 38px;
  padding: 0 10px;

  .el-dialog__title {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  }
  button {
    top: 11px;
  }
}
.el-dialog__body {
  .el-input__inner,
  .el-form-item__label {
    height: 30px;
    line-height: 30px;
  }
  .el-input__inner {
    width: 250px;
  }
}
.el-form-item__content {
  line-height: 30px;
}
.el-dialog__footer {
  padding-top: 0;
  button {
    padding: 5px 10px;
  }
}
</style>

