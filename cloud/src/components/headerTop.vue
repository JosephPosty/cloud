<template>
  <div class="header">
    <header>
      <div class="topMenu">
        <ul>
          <li>
            <router-link to='/'>音乐馆</router-link>
          </li>
          <li>
            <router-link to='mine'>我的音乐</router-link>
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
        <input type="text" placeholder="搜索关键字">
        <button></button>
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
import {mapState} from 'vuex';
import { mapActions } from 'vuex'
export default {
  name: "headerTop",
  data() {

    return {
      form: {
        phoneNum: "",
        password: ""
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
      loginState: Boolean(JSON.parse(localStorage.getItem('userInfo'))) || false,//用户登录状态
      userImghover:false,//用户头像下拉选项
      loginUserinfo: {},//用户登录后的信息
    };
  },
  methods: {
    ...mapActions([
       'getUserwatch'
     ]),
    toLogin() {
      //用户登录
      this.$refs.user_login.validate(valid => {
        if (valid) {
          let that = this;
          that.$http.get(that.GLOBAL._url + '/login/cellphone?phone=' + that.form.phoneNum + '&password='+ that.form.password).then( data => {
                //that.$store.commit('userSignin') //登录之后处理放在store
                that.$store.state.loginShow = false;
                that.loginState = true;
                that.loginUserinfo = data.data.profile;
                that.$store.state.isLogin = true;
                window.localStorage.setItem('userInfo',JSON.stringify(that.loginUserinfo));
                that.$store.state.user = that.loginUserinfo;
               setTimeout( () => { that.getUserwatch()},0)
          }).catch( error => {
            console.log(error)
          })
        }
      });
    },
    Imghover (){
      this.userImghover = !this.userImghover;
    },
    ImgLeave (){
      this.userImghover = false;
    },
    logout() {
       this.loginState = false;
       this.$store.state.isLogin = false;
       localStorage.clear('userInfo');
    },
    getLogininfo() {
      if(JSON.parse(localStorage.getItem('userInfo'))) {
        this.loginUserinfo = JSON.parse(localStorage.getItem('userInfo'));
        this.loginState = true;
        this.$store.state.isLogin = true;
      }
    }
  },
  computed:mapState({
    dialogTableVisible: state => state.loginShow,
  }),
  created () {
    document.addEventListener('click', (e) => {
				this.userImghover = false;	
			});
  },
  mounted () {
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

