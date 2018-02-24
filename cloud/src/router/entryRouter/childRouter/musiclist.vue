<template>
  <div class="musicList">
    <header-top></header-top>
    <div class="listInfo clearfix">
      <header>
        <div class="listImg">
          <img :src="listInfo.coverImgUrl" alt="">
        </div>
        <div class="listDetails">
          <h1><i></i><span>{{listInfo.name}}</span></h1>
          <h2><img :src="listInfo.creator?listInfo.creator.avatarUrl:''" ><a v-text="listInfo.creator?listInfo.creator.nickname:''"></a><em v-text="GLOBAL.getDate(listInfo.createTime) + '创建'"></em> </h2>
        <div class="tag">
          <p>标签 ： <span v-for="tag in listInfo.tags" :key='tag' v-text="tag"></span></p>
        </div>
        </div>
        
      </header>
    </div>
  </div>
</template>
<script>
import store from "../../../store/store";
import headerTop from "../../../components/headerTop";
export default {
  data () {
    return {
      listId: '', //歌单id
      listInfo: {},//歌单信息
    }
  },
  methods: {
    getListinfo (id) {
      let that = this;
      that.$http.get(BASE + '/playlist/detail?id='+ id).then((data) => {
        console.log(data)
        that.listInfo = data.data.playlist;
        console.log(that.listInfo)
      })
    }
  },
  components: {
      headerTop
  },
  created () {
    this.listId = this.$route.params.listId;
  },
  mounted () {
    this.getListinfo(this.listId);
  }
}
</script>
<style lang='less' scoped >
@import url("../../../assets/less/musicList.less");
</style>

