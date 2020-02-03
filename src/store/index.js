import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localForage from 'localforage'

Vue.use(Vuex)

const vuexStorage = new VuexPersist({
  key: process.env.HARVEST_CLIENT_ID,
  storage: localForage
})

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    authenticated: false,
    token: null,
    scope: null,
    expires: null,
    refresh: null,
    currentTs: null
  },
  getters: {
    token: state => state.token,
    tokenInfo: state => {
      return {
        token: state.token,
        scope: state.scope,
        expires: state.expires
      }
    }
  },
  mutations: {
    updateLoginInfo (state, data) {
      const { accessToken, scope, expiresIn, refreshToken } = data

      if (accessToken && scope && expiresIn && refreshToken) {
        state.token = accessToken
        state.scope = scope
        state.expires = expiresIn
        state.refresh = refreshToken
        state.currentTs = new Date().getTime()
        state.authenticated = true
      } else {
        state.authenticated = false
      }
    },
    logOut (state) {
      state.token = null
      state.scope = null
      state.expires = null
      state.refresh = null
      state.currentTs = null
      state.authenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
