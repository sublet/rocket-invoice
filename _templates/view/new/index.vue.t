---
to: src/views/<%= name %>.vue
---

<template>
  <div id="newPage">
    <h1>New Page</h1>
    <p>
      This is a new Page
    </p>
  </div>
</template>

<script>
export default {
  name: '<%= name %>',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  #newPage {
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding: 20px;
    margin-top: 10px;
  }
</style>
