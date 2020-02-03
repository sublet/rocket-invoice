
<template>
  <div class="">
    <h1>Login Form</h1>
    <div>
      <label>Email / Username</label>
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>

import Harvest from 'harvest-v2'

export default {
  name: 'LoginForm',
  props: {
    msg: String
  },
  methods: {
    login () {
      const harvest = new Harvest({
        CLIENT_ID: process.env.VUE_APP_HARVEST_CLIENT_ID,
        REDIRECT_URI: process.env.VUE_APP_HARVEST_REDIRECT_URI
      })
      const url = harvest.getUserURL.replace('response_type=token', 'response_type=code')
      window.location = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
