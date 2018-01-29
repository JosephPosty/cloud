import Vue from 'vue'
import Router from 'vue-router'
import headerTop from '@/components/headerTop'
import main from './entryRouter/main'
import singer from './entryRouter/childRouter/singer'
import mine from './entryRouter/mine'
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
            path: '/mine',
            name: 'mine',
            component: mine,
        },

        // {
        //   path: '/',
        //   name: 'headerTop',
        //   component: headerTop
        // }
    ]
})