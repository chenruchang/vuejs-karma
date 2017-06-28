import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import route from './modules/route'

Vue.use(Vuex);

const state = {
  route
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export default store
