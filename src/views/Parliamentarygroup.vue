<template>
  <div>

    <div v-if="parliamentarygroup" id="group" class="o-container o-section u-margin-bottom-10">
      <page-header v-if="parliamentarygroup" :title="parliamentarygroup.name"/>
      <div class="alerts-block u-margin-top-1" v-show="use_alerts">
        <save-alert :searchparams="{author: parliamentarygroup.name}" />
      </div>
      <h4 class="u-margin-bottom-4" v-if="latestInitiatives && latestInitiatives.length">Últimas iniciativas</h4>
      <results layout="tiny" :initiatives="latestInitiatives" class="u-margin-bottom-4" :topicsStyles="topicsStyles"/>

      <h4 class="u-margin-bottom-4">Diputados/as</h4>
      <div class="o-grid">
        <div class="o-grid__col u-12 u-4@sm">
          <custom-text meta="" :value="this.dividedDeputies[0]" type="deputy" :source="allDeputies" hideGroup/>
        </div>
        <div class="o-grid__col u-12 u-4@sm">
          <custom-text meta="" :value="this.dividedDeputies[1]" type="deputy" :source="allDeputies" hideGroup/>
        </div>
        <div class="o-grid__col u-12 u-4@sm">
          <custom-text meta="" :value="this.dividedDeputies[2]" type="deputy" :source="allDeputies" hideGroup/>
        </div>
      </div>
    </div>

    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
    </div>

  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import Results from '@/components/Results'
import CustomText from '@/components/CustomText';
import Loader from '@/components/Loader';
import SaveAlert from '@/components/SaveAlert';
import api from '@/api';
import config from '@/config'
import { mapGetters, mapState } from  'vuex';

export default {
  name: 'parliamentarygroup',
  components: {
    PageHeader,
    Results,
    CustomText,
    Loader,
    SaveAlert,
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
      use_alerts: config.USE_ALERTS,
      topicsStyles: config.STYLES.topics,
    }
  },
  computed: {
    ...mapState(['allDeputies']),
    ...mapGetters(['getDeputiesByParliamentaryGroup']),
    deputies: function () {
      if (this.parliamentarygroup) {
          return this.getDeputiesByParliamentaryGroup(this.parliamentarygroup.shortname).filter(deputy => deputy.active).map(deputy => deputy);
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

<style lang="scss" scoped>
.alerts-block {
  text-align: left;
  margin-top: -4rem;
  padding-top: 0;
  padding-bottom: 4rem;
  .o-container {
    padding-left: -16px;
  }
}
@media (max-width: 768px) {
  .alerts-block {
    text-align: left;
    margin-top: -2rem;
  }
}
</style>
