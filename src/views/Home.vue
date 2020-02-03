<template>
  <div class="home">
    <LoginForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'home',
  components: {
    LoginForm
  }
}
</script>
