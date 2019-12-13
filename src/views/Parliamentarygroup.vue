<template>
  <div>
    <navbar></navbar>
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
import Navbar from '@/components/navbar';
import { TipiHeader } from 'tipi-frontend-uikit/src/components'
import FooterBlock from '@/components/footer-block';
import LatestInitiatives from '@/components/latest-initiatives';
import api from '@/api'

const moment = require('moment');

export default {
  name: 'parliamentarygroup',
  components: {
    Navbar,
    TipiHeader,
    FooterBlock,
    LatestInitiatives
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
      moment: moment
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
