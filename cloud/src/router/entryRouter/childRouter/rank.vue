<template>
    <div id="rank">
        <header-top></header-top>
        <div class="listInfo clearfix">
            <div class="musicList_left">
                <h1>云音乐特色榜</h1>
                <ul ref='ul_list' id='ul_list'>
                    <li v-for="(list) in rankList_1" :key="list.idx">
                        <router-link :to="{ name: 'rank', params: { rankId:list.idx }}">
                            <img :src="list.src" alt="">
                            <div class="list_message">
                                <p>{{list.name}}</p>
                                <span>{{list.update}}</span>

                            </div>
                        </router-link>
                    </li>
                    <h1>全球媒体榜</h1>
                    <li v-for="(list) in rankList_2" :key="list.idx">
                        <router-link :to="{ name: 'rank', params: { rankId:list.idx }}">
                            <img :src="list.src" alt="">
                            <div class="list_message">
                                <p>{{list.name}}</p>
                                <span>{{list.update}}</span>

                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="musicList_right">
                <header class="clearfix">
                    <div class="listDetails">
                    <div class="header clearfix">
                        <div class="rankImg">
                            <img :src="rankInfo.coverImgUrl" alt="">
                        </div>
                        <div class="rankTxt">
                            <p>{{rankInfo.name}}</p>
                            <h2><i></i><span>最近更新:{{GLOBAL.getDate(rankInfo.updateTime)}}</span><em></em></h2>
                        </div>
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
                    </div>
                        
                    </div>

                </header>
                <div class="listSongs">
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
                            <li v-for="(songs,index) in rankDetails" :key='index' :songId='songs.id'>
                                <a href="javascript:void(0)" class="clearfix">
                                    <span>
                                        <small>
                                           <router-link :to="{ name: 'songDetails', params: { songId: songs.id }}" >
                                                {{ songs.name }}
                                            </router-link>
                                            
                                        </small>
                                        <!-- <small></small> -->
                                        <div class="hideMenu">
                                            <a href="javascript:void(0)" :songId='songs.id' @click='$store.dispatch("getMusic", songs.id)'>
                                                <i class="_icon_play"></i>
                                            </a>
                                            <a href="javascript:void(0)" @click="add()">
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
                                        <span v-for='(singer,index) in getSinger(songs.ar)' :key='Math.random()'>

                                            <router-link :to="{ name: 'singer', params: { singerId: singer.id }}" :singerid='singer.id'>{{ singer.name }}</router-link>
                                            <!-- <a href="javascript:void(0)" :singerid='singer.id'>{{ singer.name }}</a> -->

                                            <i v-show="index!=getSinger(songs.ar).length-1">/</i>
                                        </span>
                                    </label>
                                    <em>
                                        <a href="javascript:void(0)"> {{ songs.al.name }}</a>

                                    </em>
                                    <i class="song_time">{{ GLOBAL.formatDuring(songs.dt) }}</i>
                                    <div class="_other"></div>
                                    <a href="javascript:void(0)" class="_icon_delete" @click="delete_song($event,index)"></a>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <comment></comment>
            </div>
             
        </div>
       
    </div>
</template>
<script>
import store from "../../../store/store";
import headerTop from "../../../components/headerTop";
import comment from "../../../components/comment";
export default {
    data() {
        return {
            rankList_1: [
                { name: '云音乐新歌榜', update: '每天更新', idx: '0',src:'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40' },
                { name: '云音乐热歌榜', update: '每周四更新', idx: '1',src:'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=40y40' },
                { name: '网易原创歌曲榜', update: '每周四更新', idx: '2',src:'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=40y40' },
                { name: '云音乐飙升榜', update: '每天更新', idx: '3',src:'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=40y40' },
                { name: '云音乐电音榜', update: '每周五更新', idx: '4',src:'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=40y40' },
                { name: '云音乐ACG音乐榜', update: '每周四更新', idx: '22',src:'http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=40y40' },
                { name: '云音乐嘻哈榜', update: '每周五更新', idx: '23',src:'http://p1.music.126.net/RChr5NydlXafIV1GVEHJdg==/19073228207465342.jpg?param=40y40' },

            ],
            rankList_2: [
                { name: 'UK排行榜周榜', update: '每周一更新', idx: '5',src:'http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=40y40' },
                { name: '美国Billboard周榜', update: '每周三更新', idx: '6',src:'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=40y40' },
                { name: 'iTunes榜', update: '每周一更新', idx: '8',src:'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=40y40' },
                { name: 'Hit FM Top榜', update: '每周一更新', idx: '9',src:'http://p1.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=40y40' },
                { name: '日本Oricon周榜', update: '每周三更新', idx: '10',src:'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=40y40' },
                { name: '中国TOP排行榜(港台榜)', update: '每周一更新', idx: '14',src:'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=40y40' },
                { name: '中国TOP排行榜(内地)', update: '每周一更新', idx: '15',src:'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=40y40' },
                { name: '中国嘻哈榜', update: '每周五更新', idx: '18',src:'http://p1.music.126.net/_nwkQTFtOdAjFvOI8Wg7Tg==/18922595114302109.jpg?param=40y40' },
                { name: '法国 NRJ EuroHot 30周榜', update: '每周五更新', idx: '19',src:'http://p1.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=40y40' },
                { name: '台湾Hito排行榜', update: '每周一更新', idx: '20',src:'http://p1.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=40y40' },
                { name: 'Beatport全球电子舞曲榜', update: '每周四更新', idx: '21',src:'http://p1.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=40y40' }

            ],
            cur_idx: 0,
            rankDetails:[],
            rankInfo:{},

        }
    },
    components: {
        headerTop,
        comment
    },
    methods: {
        getRank(idx) {
            this.$http.get(BASE + '/top/list?idx='+idx).then(({data:{playlist}})=>{
                console.log(playlist.tracks)
                this.rankDetails = playlist.tracks;
                this.rankInfo = playlist;
                this.$store.state.commentId = playlist.id;
                this.$store.state.commentType = 1;
                this.$store.state.cur_page = 1;
                this.$store.dispatch("getComment");
            })
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
      that.rankDetails.map((val,index) => {
       that.$store.state.list_id.push(val.id);
    })
     that.$store.state.CURPLAYLIST = that.rankDetails;
     that.$store.dispatch("getMusic", that.$store.state.list_id[0])
    },
},
watch: {
    '$route' (to, from) {
      if(to.name == 'rank') {
       this.cur_idx = this.$route.params.rankId;
       this.$store.state.offset = 0;
       
       this.getRank(this.cur_idx);
      }
       
    }
  },
  created() {
    this.cur_idx = this.$route.params.rankId;
   
  },
    mounted () {
        this.getRank(this.cur_idx);
        this.$nextTick(()=> {
        document.getElementById('ul_list').style.height = window.innerHeight + 100 +'px';
     })
    }
}
</script>

<style lang='less' scoped >
@import url("../../../assets/less/rank.less");
</style>

