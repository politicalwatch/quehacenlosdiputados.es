<template>
  <div>
    <div id="deputy" class="o-container o-section">
      <tipi-header v-if="deputy" :title="deputy.name"/>
      <tipi-deputy :deputy="deputy" :parliamentaryGroup="parliamentarygroup" />
      <div class="u-border-top u-padding-top-4" v-if="latestInitiatives">
        <h4 class="u-margin-bottom-4" v-if="latestInitiatives">Últimas iniciativas</h4>
        <tipi-results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles"/>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiDeputy, TipiResults } from 'tipi-uikit'
import api from '@/api';
import { mapState } from 'vuex';

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
  computed: {
    ...mapState(['allParliamentaryGroups'])
  },
  methods: {
    getDeputy: function() {
      api.getDeputy(this.$route.params.id)
        .then(response => {
          this.deputy = response;
          this.parliamentarygroup = this.allParliamentaryGroups.find(allPG => allPG.shortname === this.deputy.parliamentarygroup);
          this.getLatestInitiatives();
        })
        .catch(error => {
          this.errors = error
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
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
