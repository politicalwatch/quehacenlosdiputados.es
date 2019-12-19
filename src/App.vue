<template>
  <div id="app">
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    <footer-block />
  </div>
</template>

<script>
  import { TipiNavbar } from 'tipi-frontend-uikit'
  import FooterBlock from '@/components/footer-block';
  import config from '@/config';

  export default {
    name: 'app',
    components: {
      TipiNavbar,
      FooterBlock,
    },
    data: function() {
      return {
        MENU: config.MENU,
        DISCLAIMER: config.DISCLAIMER,
        LOGO: config.LOGO,
      }
    },
  }
</script>

<style lang="scss">
</style>
