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
        list_id: [], //存放id

    },

    mutations: {
        getUserwatch(state) {
            axios.get(BASE + '/user/follows?uid=' + state.user.userId).then(({ data: { follow } }) => { state.userWatch.follow = follow });
            axios.get(BASE + '/user/followeds?uid=' + state.user.userId).then(({ data: { followeds } }) => { state.userWatch.beFollow = followeds });
            axios.get(BASE + '/user/playlist?uid=' + state.user.userId).then(({ data: { playlist } }) => {
                state.user_playList = playlist;
            });
            // axios.get(BASE + '/playlist/detail?id=' + state.user_playList.length).then(({ data: { playlist } }) => {
            //     console.log(playlist)
            // })

        },

    },
    actions: {
        getUserwatch({ commit }) { //获取用户详情
            commit('getUserwatch');
        },
        getMusic({ commit, state }, m_id) {
            axios.get(BASE + '/song/detail?ids=' + m_id).then((info) => {
                state.MUSICINFO = info.data.songs[0];
                if (state.list_id.indexOf(state.MUSICINFO.id) < 0) {
                    state.list_id.push(state.MUSICINFO.id);
                    state.CURPLAYLIST.push(state.MUSICINFO)
                }
                console.log(state.CURPLAYLIST);


            })

            .then(() => {
                axios.get(BASE + '/music/url?id=' + m_id).then((data) => {
                    if (data.data.code == 200) {
                        state.MUSICID = m_id;
                        state.MUSICURL = data.data.data[0].url;
                        state.playing = true;
                    }
                })
            })
        }
    }
});