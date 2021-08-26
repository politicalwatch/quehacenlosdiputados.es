<template>
  <div v-if="loaded">
    <tipi-topic-card :topic="topic" :topicsStyles="styles"/>
    <div class="alerts-block o-section u-margin-bottom-4" :style="`background-color: ${styles[topic.name].color};`" v-show="use_alerts">
      <div class="o-container">
        <save-alert :searchparams="{topic: topic.name}" />
      </div>
    </div>
    <div id="topic" class="o-container o-section">
      <div class="o-grid">
        <div class="o-grid__col u-12 u-4@sm" v-if="deputies">
          <tipi-text meta="Diputadas/os más activas/os" :value="deputies" type="deputy" :source="allDeputies" />
        </div>
        <div class="o-grid__col u-12 u-4@sm" v-if="parliamentarygroups">
          <tipi-text meta="Grupos más activos" :value="parliamentarygroups" type="parliamentarygroup" :source="parliamentarygroups" />
        </div>
        <div class="o-grid__col u-12 u-4@sm" v-if="places">
          <tipi-text meta="Dónde se trata más" :value="places" />
        </div>
      </div>
      <div class="u-border-top u-padding-top-4" v-if="latestInitiatives">
        <h4 class="u-margin-bottom-4" v-if="latestInitiatives">Últimas iniciativas</h4>
        <tipi-results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles"/>
      </div>
    </div>
    <div class="o-section o-section--double" v-if="latestInitiatives" :style="`background-color: ${styles[topic.name].color}`">
      <div class="o-container">
        <p class="u-text-subtitle u-margin-0 u-color-secondary-dark">MÁS INICIATIVAS SOBRE</p>
        <h4 class="u-text-th2 u-color-secondary-dark">{{ topic.name.toUpperCase() }}</h4>
        <router-link
          class="c-button c-button--outline"
          :to="{ name: 'results', params: { data: 'topic=' + topic.name } }">
          Explorar
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <tipi-loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

import { TipiHeader, TipiResults, TipiTopicCard, TipiText, TipiLoader } from 'tipi-uikit'
import SaveAlert from '@/components/save-alert';
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'topic',
  components: {
    TipiHeader,
    TipiResults,
    TipiTopicCard,
    TipiText,
    TipiLoader,
    SaveAlert
  },
  data: function() {
    return {
      topic: {},
      deputies: null,
      places: null,
      parliamentarygroups: null,
      latestInitiatives: null,
      use_alerts: config.USE_ALERTS,
      styles: config.STYLES.topics,
      loaded: false,
    }
  },
  computed: {
    ...mapState(['allDeputies', 'allParliamentaryGroups']),
  },
  methods: {
    getTopic: function() {
      api.getTopic(this.$route.params.id)
        .then(response => {
          this.topic = response;
          this.getLatestInitiatives(this.topic.name);
          this.getParliamentarygroupsRanking(this.topic.name);
          this.getDeputiesRanking(this.topic.name);
          this.getPlacesRanking(this.topic.name);
        })
        .catch(error => {
          this.errors = error
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
    },
    getDeputiesRanking: function(topic) {
      api.getDeputiesRanking(topic, null, 3)
        .then(response => {
          this.deputies = response;
          this.deputies.forEach((deputy, index) => {
            let foundDeputy = this.allDeputies.find(allD => allD.name === deputy._id );
            this.deputies[index] = this.deputies[index]._id;
          });
        })
          .catch(error => {this.errors = error; console.log(error)});
    },
    getPlacesRanking: function(topic) {
      api.getPlacesRanking(topic, null, 3)
        .then(response => {
          this.places = response.map(place => `${place._id}`);
        })
        .catch(error => this.errors = error);
        this.loaded = true;
    },
    getParliamentarygroupsRanking: function(topic) {
      api.getParliamentarygroupsRanking(topic)
        .then(response => {
          this.parliamentarygroups = response;
          this.parliamentarygroups.forEach((group, index) => {
            let foundGroup = this.allParliamentaryGroups.find(allPG => allPG.name === group._id );
            this.parliamentarygroups[index].name = this.parliamentarygroups[index]._id;
            this.parliamentarygroups[index].id = foundGroup.id;
          });
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function(topic) {
      api.getInitiatives({ 'topic': topic, 'per_page': 12 })
         .then(response => {
            if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    },
  },
  created: function() {
    this.getTopic()
  }
}
</script>

<style lang="scss">
.c-topic-card__title { color: $secondary-dark; }
.c-topic-card__description { color: $secondary-dark; }
.c-button--outline {
  border: 2px solid $secondary-dark !important;
  color: $secondary-dark !important;
  &:hover {
    color: $yellow !important;
    background: $secondary-dark !important;
    //
  }
}
.alerts-block {
  margin-top: -6rem;
  padding-top: 0;
  padding-bottom: 4rem !important;
}
@media (max-width: 991px) {
  .alerts-block {
    margin-top: -4rem;
    padding-left: 2rem;
  }
}
@media (max-width: 768px) {
  .alerts-block {
    text-align: center;
    padding-left: 0rem;
  }
}
</style>
