<template>
  <div>

    <div v-if="parliamentarygroup" id="group" class="o-container o-section u-margin-bottom-10">
      <ParliamentaryGroupCard :parliamentary_group="parliamentarygroup" layout="large"/>

      <div class="o-container" v-if="parliamentarygroup">
        <h2 class="u-uppercase u-margin-bottom-4">Radiografía</h2>
        <div class="o-grid">
          <div class="o-grid__col u-12 u-4@md">
            <gender gender="female" :percentage="calculatePercentage(parliamentarygroup.composition.gender.female)" />
            <gender gender="male" :percentage="calculatePercentage(parliamentarygroup.composition.gender.male)" />
          </div>
          <div class="o-grid__col u-12 u-8@md">
            <h3 class="u-uppercase">Distribución por edades</h3>
            <div><span class="u-text-th3">{{ calculatePercentage(parliamentarygroup.composition.ages.under35) }}%</span> con menos de 35 años</div>
            <div><span class="u-text-th3">{{ calculatePercentage(parliamentarygroup.composition.ages.between35and49) }}%</span> entre 35 y 49 años</div>
            <div><span class="u-text-th3">{{ calculatePercentage(parliamentarygroup.composition.ages.between50and65) }}%</span> entre 50 y 65 años</div>
            <div><span class="u-text-th3">{{ calculatePercentage(parliamentarygroup.composition.ages.over65) }}%</span> con más de 65 años</div>
          </div>
        </div>
      </div>

      <h2 class="u-uppercase u-margin-top-8 u-margin-bottom-4" v-if="latestInitiatives && latestInitiatives.length">Últimas iniciativas</h2>
      <results layout="extended" :initiatives="latestInitiatives" class="u-margin-bottom-4" :topicsStyles="topicsStyles"/>

      <save-alert :searchparams="{author: parliamentarygroup.name}" :text="parliamentarygroup.name"/>

      <h2 class="u-uppercase u-margin-bottom-4">Diputados/as</h2>
      <CardGrid :items="deputies" type="deputy" layout="medium" :extra="undefined" />
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
import Gender from '@/components/Gender';
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
    Gender,
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
      api.getInitiatives({'author': this.parliamentarygroup.name, 'per_page': 6 })
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    },
    calculatePercentage: function(value) {
      return Math.round((value / this.parliamentarygroup.composition.deputies) * 100)
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
