<template>
  <div id="deputy">
    <tipi-deputy :deputy="deputy" :parliamentaryGroup="parliamentarygroup">
      <a :href="deputy.twitter"><tipi-icon icon="twitter" /> Twitter</a>
      <a :href="`mailto:${deputy.email}`"><tipi-icon icon="mail" /> {{deputy.email}}</a>
    </tipi-deputy>
    <div v-if="latestInitiatives" class="o-container o-section">
      <h4 class="u-margin-bottom-4">Últimas iniciativas</h4>
      <tipi-results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles.topics"/>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiDeputy, TipiResults, TipiIcon } from 'tipi-uikit'
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'deputy',
  components: {
    TipiHeader,
    TipiDeputy,
    TipiResults,
    TipiIcon,
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      styles: config.STYLES,
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
