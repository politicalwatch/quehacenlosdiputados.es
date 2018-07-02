<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    watch: {
      '$route' (to) {
        const goBack = to.name === 'search' || to.name === 'results'
        this.transitionName = goBack ? 'slide-back' : 'slide'
      }
    }
  }
</script>

<style lang="scss">
</style>
