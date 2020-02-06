<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      authenticated: false
    }
  },
  async mounted () {
    const { download, code, scope } = this.$route.query

    if (download) {
      const { token, scope, from, to, rate } = this.$route.query
      const loginParams = {
        accessToken: token,
        scope: scope,
        expiresIn: 99999,
        refreshToken: token
      }
      const query = { download: 'true', token, scope, from, to, rate }
      this.$store.commit('updateLoginInfo', loginParams)
      this.$router.push({ path: `dashboard`, query })
    } else {
      let loginParams = null
      if (code && scope) {
        const response = await fetch(`${process.env.VUE_APP_HARVEST_LAMBDA}?code=${code}&scope=${scope}&type=connect`)
        if (response && response.status === 200) {
          const data = await response.json()
          if (data.access_token) {
            loginParams = {
              accessToken: data.access_token,
              scope: data.scope,
              expiresIn: data.expires_in,
              refreshToken: data.refresh_token
            }
            localStorage.setItem('userToken', JSON.stringify(loginParams))
          }
        }
      } else {
        // Grab local storage token and dump into application...
        const userTokenItem = localStorage.getItem('userToken')
        if (userTokenItem) {
          loginParams = JSON.parse(userTokenItem)
        }
      }

      if (loginParams) {
        this.$store.commit('updateLoginInfo', loginParams)
        this.$router.replace({ name: 'dashboard' })
      }
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status
    },
    logout () {
      this.authenticated = false
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body.template-home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .appLogo {
    display: none;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
