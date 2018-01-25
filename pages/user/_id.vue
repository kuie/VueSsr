<template>
  <div>
    <h1>user/:id</h1>
    <div>{{id}}</div>
  </div>
</template>

<script>
  'use strict'
  export default {
    name: 'user-id',
    validate({ params }) {
      if (!params) return false
      return /^\d+$/.test(params.id)
    },
    asyncData({ params }) {
      return params
    }
  }
</script>

<style scoped>

</style>
