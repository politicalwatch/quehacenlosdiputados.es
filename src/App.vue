<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div>
        <navbar pre-image="/img/yellow.png" :links="MENU" :logo="LOGO" />
          <router-view/>
        <page-footer />
      </div>
    </transition>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import PageFooter from '@/components/PageFooter';
  import config from '@/config';
  import { mapActions } from 'vuex';

  export default {
    name: 'app',
    components: {
      Navbar,
      PageFooter,
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
.c-disclaimer {
  background-color: #f8f8f8 !important;
  a {
    color: #000 !important;
  }
  svg {
    path {
      fill: #000;
    }
  }
}
.c-menu__link:hover {
  color: $yellow !important;
  text-decoration: none;
}
.swal2-confirm {
  background-color: $primary !important;
}
</style>
