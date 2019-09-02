import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: ''
  },
  mutations: {
    newLogIn(state, loggedUser){
      state.loggedUser = loggedUser;
    }
  },
  getters: {
    loggedUser: state => state.loggedUser
  },
  actions: {

  }
})
