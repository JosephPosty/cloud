// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/store'
import resetCss from './assets/less/reset.css'
import _Global from './public/global'
Vue.prototype.$http = axios
Vue.prototype.GLOBAL = _Global
Vue.use(ElementUI)
Vue.use(Vuex);
Vue.config.productionTip = false

// window.BASE = 'http://xf3ftg.natappfree.cc';
window.BASE = 'http://127.0.0.1:3000';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})