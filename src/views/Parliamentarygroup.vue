<template>
  <div>
    <div id="group" class="o-container o-section u-margin-bottom-10">
      <tipi-header v-if="parliamentarygroup" :title="parliamentarygroup.name"/>
      <h4 class="u-margin-bottom-4" v-if="latestInitiatives && latestInitiatives.length">Últimas iniciativas</h4>
      <tipi-results layout="tiny" :initiatives="latestInitiatives" class="u-margin-bottom-4" :topicsStyles="topicsStyles"/>

      <h4 class="u-margin-bottom-4">Diputados/as</h4>
      <div class="o-grid">
        <div class="o-grid__col u-12 u-4@sm">
          <tipi-text meta="" :value="this.dividedDeputies[0]" type="deputies" :source="allDeputies" hideGroup/>
        </div>
        <div class="o-grid__col u-12 u-4@sm">
          <tipi-text meta="" :value="this.dividedDeputies[1]" type="deputies" :source="allDeputies" hideGroup/>
        </div>
        <div class="o-grid__col u-12 u-4@sm">
          <tipi-text meta="" :value="this.dividedDeputies[2]" type="deputies" :source="allDeputies" hideGroup/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiResults, TipiText } from 'tipi-uikit'
import api from '@/api';
import config from '@/config'
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
      topicsStyles: config.STYLES.topics,
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
    },
    dividedDeputies: function() {
      let results = [];
      let divided = this.deputies;

      for (let i = 3; i > 0; i--) {
        results.push(divided.splice(0, Math.ceil(divided.length/i)));
      }

      return results;
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
      api.getInitiatives({'author': this.parliamentarygroup.name, 'per_page': 12 })
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    },
  },
  created: function() {
    this.getParliamentaryGroup()
  }
}
</script>
