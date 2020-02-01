---
to: src/components/<%= name %>.vue
---

<template>
  <div class="">
    This is a new component {{ msg }}
  </div>
</template>

<script>
export default {
  name: '<%= name %>',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
