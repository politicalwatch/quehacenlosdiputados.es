<template>
  <div>
    <tipi-header v-if="parliamentarygroup" :title="parliamentarygroup.name"/>
    <div id="group">
      <div class="container page">
        <h4 v-if="latestInitiatives.length">Últimas iniciativas</h4>
        <tipi-results layout="tiny" :initiatives="latestInitiatives"/>

        <h4>Diputados/as</h4>
        <tipi-text meta="" :value="this.deputies" type="deputies" :source="allDeputies" />
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiResults, TipiText } from 'tipi-uikit'
import api from '@/api';
import { mapGetters, mapState } from  'vuex';

export default {
  name: 'parliamentarygroup',
  components: {
    TipiHeader,
    TipiResults,
    TipiText,
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
    }
  },
  computed: {
    ...mapState(['allDeputies']),
    ...mapGetters(['getDeputiesByParliamentaryGroup']),
    deputies: function () {
      if (this.parliamentarygroup) {
        return this.getDeputiesByParliamentaryGroup(this.parliamentarygroup.shortname).map(deputy => deputy.name);
      }
      return [];
    }
  },
  methods: {
    getParliamentaryGroup: function() {
      api.getGroup(this.$route.params.id)
        .then(response => {
          this.parliamentarygroup = response;
          this.getLatestInitiatives();
        })
        .catch(error => {
          this.errors = error
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
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
<style lang="scss">
  #group .value {
    display: inline-block !important;
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }

    @media (min-width: 1200px) {
      width: 33%;
    }
  }
</style>
