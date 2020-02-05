
<template>
  <div class="loginForm">
    <p>Welcome to Invoicing</p>
    <p>A passive aggressive response to the redundancy that has fallen onto contractors, and an excuse to play with, and learn new technology.</p>
    <div>
      <button type="button" class="butt" v-on:click="login()">Login</button>
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
.loginForm {
  width: 500px;

  div {
    margin-top: 4rem;
  }
}
.butt {
  padding: 10px 15px;
  border-radius: 4px;
  font-size: .85rem;
  border: 0;
  background: #333;
  color: #FFF;
  text-transform: uppercase;
}
</style>
