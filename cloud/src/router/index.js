import Vue from 'vue'
import Router from 'vue-router'
import headerTop from '@/components/headerTop'
import main from './entryRouter/main'
import singer from './entryRouter/childRouter/singer'
import musiclist from './entryRouter/childRouter/musiclist'
import song from './entryRouter/childRouter/songDetails'
import rank from './entryRouter/childRouter/rank'
import mine from './entryRouter/mine'
import artist from './entryRouter/childRouter/artist'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'main',
            component: main,
            // component: resolve => require(['./entryRouter/main'], resolve),
            iconCls: 'el-icon-setting',
        },
        {
            path: '/singer/:singerId',
            name: 'singer',
            component: singer,
        },
        {
            path: '/musiclist/:listId',
            name: 'musiclist',
            component: musiclist,
        },
        {
            path: '/songDetails/:songId',
            name: 'songDetails',
            component: song,
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine,
        },
        {
            path: '/artist',
            name: 'artirst',
            component: artist,
        },
        {
            path: '/rank/:rankId',
            name: 'rank',
            component: rank,
        },
        // {
        //   path: '/',
        //   name: 'headerTop',
        //   component: headerTop
        // }
    ]
})