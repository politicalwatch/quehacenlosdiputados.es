<template>
  <div v-if="deputy" id="deputy" class="u-margin-bottom-10">
    <tipi-deputy v-if="deputy" :deputy="deputy" :parliamentaryGroup="parliamentarygroup">
      <a v-if="deputy.hasOwnProperty('url')" :href="deputy.url" target="_blank"><tipi-icon icon="building" /> Ver en el Congreso</a>
      <a v-if="deputy.hasOwnProperty('email')" :href="`mailto:${deputy.email}`" target="_blank"><tipi-icon icon="mail" /> {{deputy.email}}</a>
      <a v-if="deputy.hasOwnProperty('twitter')" :href="deputy.twitter" target="_blank"><tipi-icon icon="twitter" /> @{{ deputy.twitter.split('/').reverse()[0] }}</a>
    </tipi-deputy>
    <div class="o-container u-margin-top-4" v-show="use_alerts">
      <save-alert :searchparams="{deputy: deputy.name}" />
    </div>
    <div v-if="latestInitiatives && latestInitiatives.length" class="o-container o-section">
      <h4 class="u-margin-bottom-4">Últimas iniciativas</h4>
      <tipi-results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles.topics"/>
    </div>
    <p class="u-text-center u-margin-bottom-10" v-else>No se han encontrado iniciativas para este diputado/a</p>
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <tipi-loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

import { TipiHeader, TipiDeputy, TipiResults, TipiIcon, TipiLoader } from 'tipi-uikit'
import SaveAlert from '@/components/save-alert';
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
    TipiLoader,
    SaveAlert,
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      use_alerts: config.USE_ALERTS,
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
          this.deputy.image = api.proxy(this.deputy.image);
          this.parliamentarygroup = this.allParliamentaryGroups.find(allPG => allPG.shortname === this.deputy.parliamentarygroup);
          this.getLatestInitiatives();
        })
        .catch(error => {
          this.errors = error
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
    },
    getLatestInitiatives: function() {
      api.getInitiatives({ 'deputy': this.deputy.name, 'per_page': 12 })
        .then(response => {
          if (response.initiatives) this.latestInitiatives = response.initiatives;
        })
        .catch(error => this.errors = error);
    },
  },
  created: function() {
    this.getDeputy()
  }
}
</script>

<style lang="scss" scoped>
.c-deputy__links a.c-button {
  display: inline-block;
}
.alerts-block {
  padding-bottom: 0rem;
  a {
    color: #fff;
  }
}
@media (max-width: 768px) {
  .alerts-block {
    text-align: center;
    margin-top: 0rem;
  }
}
</style>
