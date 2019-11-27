import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // userstate: JSON.parse(localStorage.getItem('userInfo')) || {},//用户信息
        //  loginState:(Boolean(JSON.parse(localStorage.getItem('userInfo')))) || false//登录状态
        isLogin: false, //登录状态,
        loginShow: false, //登录框状态
        userWatch: {
            follow: [],
            beFollow: [],
        }, //用户关注和被关注信息
        user_playList: [], //用户的歌单收藏等
        user: JSON.parse(window.localStorage.getItem('userInfo')), //用户登录后获取的信息
        MUSICID: '', //音乐id
        MUSICURL: '', //播放地址
        MUSICINFO: {}, //获取的歌曲详情
        playing: false, //播放状态
        CURPLAYLIST: [], //当前播放列表
        CURMUSICINDEX: -1, //当前歌曲索引值
        list_id: [], //存放id
        loading: true,
        user_likeSongs:[],//用户喜欢音乐列表
        commentId:'',
        commentList:[],
        commentTotal:0,
        commentType:0,//0:歌曲评论 1歌单评论
        offset:0,//分页页数
        cur_page: 1,

    },

    mutations: {
        getUserwatch(state) {
            axios.get(BASE + '/user/follows?uid=' + state.user.userId).then(({ data: { follow } }) => { state.userWatch.follow = follow;console.log(state.userWatch.follow) });
            axios.get(BASE + '/user/followeds?uid=' + state.user.userId).then(({ data: { followeds } }) => { state.userWatch.beFollow = followeds });
            axios.get(BASE + '/user/playlist?uid=' + state.user.userId).then(({ data: { playlist } }) => {
                state.user_playList = playlist;

            })
            .then(()=>{
                if(!state.login_loading){
                    axios.get(BASE + '/playlist/detail?id=' + state.user_playList[0].id).then((song)=>{
                    state.user_likeSongs = song.data.playlist.tracks;
                    state.loading = false;
                    console.log(state.user_likeSongs);
                    console.log(Vue.$route)
             })
                }
            })
            // axios.get(BASE + '/playlist/detail?id=' + state.user_playList.length).then(({ data: { playlist } }) => {
            //     console.log(playlist)
            // })

        },
        getComment(state) {
               
                let url = '';
                if(state.commentType == 0) url = BASE + "/comment/music?id=" + state.commentId + '&limit=20&offset='+state.offset;
                if(state.commentType == 1) url = BASE + "/comment/playlist?id=" + state.commentId + '&limit=20&offset='+state.offset;
                axios
                .get(
                url
                )
                .then(({ data: { comments, total } }) => {
                state.commentTotal = total;
                state.commentList = comments;
                });
            
             
        }
        

    },
    actions: {
        getUserwatch({ commit }) { //获取用户详情
            commit('getUserwatch');
        },
        getComment({commit},type) {
            commit('getComment')
        },
        getMusic({ commit, state }, m_id) {
            axios.get(BASE + '/song/detail?ids=' + m_id).then((info) => {
                state.MUSICINFO = info.data.songs[0];
                console.log(state.MUSICINFO)
                if (state.list_id.indexOf(state.MUSICINFO.id) < 0) {
                    state.list_id.push(state.MUSICINFO.id);
                    state.CURPLAYLIST.push(state.MUSICINFO)
                }
                console.log(state.CURPLAYLIST);


            })

            .then(() => {
                axios.get(BASE + '/song/url?id=' + m_id).then((data) => {
                    if (data.data.code == 200) {
                        state.MUSICID = m_id;
                        state.MUSICURL = data.data.data[0].url;
                        state.playing = true;
                    }
                })
            })
            
        },
        addSong({ commit, state }, [m_id, like]) {
            axios.get(BASE + '/like?id=' + m_id + '&like=' + like).then(data => {
                console.log(data)
            })
        },
    }
});