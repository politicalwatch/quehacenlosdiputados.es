<template>
  <div>
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
    <tipi-header v-if="deputy" :title="deputy.name"/>
    <div id="deputy">
      <div class="container page">
        <tipi-deputy :deputy="deputy" :parliamentaryGroup="parliamentarygroup" />
        <hr v-if="latestInitiatives">
        <latest-initiatives :initiatives="latestInitiatives"></latest-initiatives>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>

import { TipiHeader, TipiNavbar, TipiDeputy } from 'tipi-frontend-uikit/src/components'
import FooterBlock from '@/components/footer-block';
import LatestInitiatives from '@/components/latest-initiatives';
import api from '@/api';
import config from '@/config';


const moment = require('moment');

export default {
  name: 'deputy',
  components: {
    TipiNavbar,
    TipiHeader,
    TipiDeputy,
    FooterBlock,
    LatestInitiatives
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      moment: moment,
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    }
  },
  methods: {
    getDeputy: function() {
      api.getDeputy(this.$route.params.id)
        .then(response => {
          this.deputy = response;
          this.getParliamentaryGroup();
          this.getLatestInitiatives();

        })
        .catch(error => this.errors = error);
    },
    getParliamentaryGroup: function() {
      api.getGroups()
        .then(response => {
          let parliamentarygroups = response;
          this.parliamentarygroup = parliamentarygroups.find(allPG => allPG.shortname === this.deputy.parliamentarygroup );
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function() {
      api.getInitiatives({'deputy': this.deputy.name})
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives.slice(0, 10);
          })
         .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getDeputy()
  }
}
</script>

<style scoped lang="scss">
</style>
