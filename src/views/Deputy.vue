<template>
  <div>
    <tipi-header v-if="deputy" :title="deputy.name"/>
    <div id="deputy">
      <div class="container page">
        <tipi-deputy :deputy="deputy" :parliamentaryGroup="parliamentarygroup" />
        <hr v-if="latestInitiatives">
        <tipi-results layout="tiny" :initiatives="latestInitiatives"/>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiDeputy, TipiResults } from 'tipi-uikit'
import api from '@/api';

export default {
  name: 'deputy',
  components: {
    TipiHeader,
    TipiDeputy,
    TipiResults
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
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
      api.getInitiatives({ 'deputy': this.deputy.name, 'per_page': 10 })
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives;
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
