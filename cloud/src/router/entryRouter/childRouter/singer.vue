<template>
  <div id="singer">
      <header-top></header-top> 
      <div class="singerInfo">
        <h1>{{singerInfo.name}}<small v-if='singerInfo.alias'>{{singerInfo.alias[0]}}</small></h1>
        <div class="singerImg">
        <img :src="singerInfo.picUrl" alt="">
          <p>
            {{singer_descrition}}
          </p>
        </div>
        <div class="details">
          <!-- <div class="menuTitle">
            <ul class="clearfix">
              <li v-for="(menu,index) in menuTitle" :key='index' :class="{active:index==menu_index}">
                <a>
                  <span v-text='menu'></span>
                </a>
              </li>
            </ul>
          </div> -->
          <!-- 歌曲列表  -->
          
        </div>
      </div>
  </div>
</template>
<script>
import store from "../../../store/store";
import headerTop from "../../../components/headerTop";
export default {
  data () {
    return {
      singerId: '',
      singerInfo: {},
      menuTitle: ['热门50单曲','所有专辑','相关MV','歌手介绍'],
      menu_index: 0,
      singer_descrition:'',//描述
    }
  },
  methods: {
    getSingerinfo (id) {
      //let that = this;
      this.$http.get(BASE + '/artists?id='+ id).then((data) => {
        this.singerInfo = data.data.artist;
        console.log(this.singerInfo);
      });
      this.$http.get(BASE + '/artist/desc?id=' + id).then((info) => {
        console.log(info)
        this.singer_descrition = info.data.briefDesc;
      })
    }
  },
  components: {
    headerTop,
  },
  created () {
    this.singerId = this.$route.params.singerId;
  },
  mounted () {
    this.getSingerinfo(this.singerId);
  }
}
</script>
<style lang='less' scoped>
 @import url("../../../assets/less/singer.less");
</style>

