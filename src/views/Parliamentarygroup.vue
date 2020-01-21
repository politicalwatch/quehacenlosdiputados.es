<template>
  <div>
    <tipi-header v-if="parliamentarygroup" :title="parliamentarygroup.name"/>
    <div id="group">
      <div class="container page">
        <h4>Últimas iniciativas</h4>
        <tipi-results layout="tiny" :initiatives="latestInitiatives"/>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiResults } from 'tipi-uikit'
import api from '@/api';

export default {
  name: 'parliamentarygroup',
  components: {
    TipiHeader,
    TipiResults
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
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
      api.getInitiatives({'author': this.parliamentarygroup.name, 'per_page': 10 })
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
