//This flexible module needs to be import first of all
import 'lib-flexible'

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'babel-polyfill'

import {sync} from 'vuex-router-sync'
import store from './store'

Vue.use(Mint);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

switch (process.env.NODE_ENV) {
  case 'dev':
    window.configData = {
      url: '',
    };
    break;
  case 'test':
    window.configData = {
      url: '',
    };
    break;
  case 'mir':
    window.configData = {
      url: '',
    };
    break;
  case 'pro':
    window.configData = {
      url: '',
    };
    break;
}

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
