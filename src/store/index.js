import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

import login from './modules/login.js'
import device from './modules/device.js'
import dashboard from './modules/dashboard.js'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
  	login,
  	device,
  	dashboard,
  }
})
