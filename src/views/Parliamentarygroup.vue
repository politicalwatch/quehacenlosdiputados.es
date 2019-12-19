<template>
  <div>
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
    <tipi-header :title="parliamentarygroup.name"/>
    <div id="group">
      <div class="container page">
        <latest-initiatives :initiatives="latestInitiatives"></latest-initiatives>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>

import { TipiHeader, TipiNavbar } from 'tipi-frontend-uikit'
import FooterBlock from '@/components/footer-block';
import LatestInitiatives from '@/components/latest-initiatives';
import api from '@/api';
import config from '@/config';


const moment = require('moment');

export default {
  name: 'parliamentarygroup',
  components: {
    TipiNavbar,
    TipiHeader,
    FooterBlock,
    LatestInitiatives
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
      moment: moment,
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    }
  },
  methods: {
    getParliamentaryGroup: function() {
      api.getGroup(this.$route.params.id)
        .then(response => {
          this.parliamentarygroup = response;
          this.getLatestInitiatives();
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function() {
      api.getInitiatives({'author': this.parliamentarygroup.name})
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getParliamentaryGroup()
  }
}
</script>

<style scoped lang="scss">
</style>
