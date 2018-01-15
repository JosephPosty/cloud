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
        }
    }
});