<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar';

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
</style>
