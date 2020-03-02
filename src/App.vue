<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div>
        <tipi-navbar pre-image="/img/multicolor.jpg" :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
          <router-view/>
        <footer-block />
      </div>
    </transition>
  </div>
</template>

<script>
  import { TipiNavbar } from 'tipi-uikit'
  import FooterBlock from '@/components/footer-block';
  import config from '@/config';
  import { mapActions } from 'vuex';

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
    methods: {
      ...mapActions([
        'getDeputies',
        'getTopics',
        'getParliamentaryGroups',
        'getPlaces',
        'getStatus',
        'getTypes',
      ]),
    },
    created: function() {
      this.getDeputies();
      this.getTopics();
      this.getStatus();
      this.getPlaces();
      this.getTypes();
      this.getParliamentaryGroups();
    }
  }
</script>

<style lang="scss">
</style>
