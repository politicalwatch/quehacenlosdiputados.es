<template>
  <div>

    <div v-if="parliamentarygroup" id="group" class="o-container o-section u-margin-bottom-10">
      <ParliamentaryGroupCard :parliamentary_group="parliamentarygroup" layout="large"/>
      <h2 class="u-margin-bottom-4" v-if="latestInitiatives && latestInitiatives.length">Últimas iniciativas</h2>
      <results layout="tiny" :initiatives="latestInitiatives" class="u-margin-bottom-4" :topicsStyles="topicsStyles"/>

      <h2 class="u-margin-bottom-4">Diputados/as</h2>
      <CardGrid :items="deputies" type="deputy" layout="medium" />
      <save-alert :searchparams="{author: parliamentarygroup.name}" :text="parliamentarygroup.name"/>
    </div>

    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
    </div>

  </div>
</template>

<script>

import CardGrid from '@/components/CardGrid';
import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';
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
    CardGrid,
    Results,
    CustomText,
    Loader,
    SaveAlert,
    ParliamentaryGroupCard,
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
      api.getInitiatives({'author': this.parliamentarygroup.name, 'per_page': 3 })
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
