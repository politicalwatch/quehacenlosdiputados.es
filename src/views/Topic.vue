<template>
  <div v-if="loaded" class="c-topic">
    <div class="o-container c-topic__header" :class="'u-topic-bg__' + topic.id">
      <div class="c-topic__header__overlay">
        <div class="c-topic__header__column">
          <h1 class="c-topic__header__name u-uppercase ">{{ topic.name }}</h1>
          <h3 class="c-topic__header__stat">{{ getTopicStat(topic) }}</h3>
          <h4 class="c-topic__header__stat u-uppercase">iniciativas vinculadas</h4>
        </div>
        <div class="c-topic__header__column u-hide u-block@sm">
          <p class="c-topic__header__description">{{ topic.description[0] }}</p>
          <h6 class="u-uppercase c-topic__header__author"><a :href="this.credits[topic.id].url" target="_blank"><icon icon="camera" />Unsplash: {{ this.credits[topic.id].name }}</a></h6>
        </div>
      </div>
    </div>
    <div id="topic" class="o-container o-section">
      <div class="u-padding-top-2" v-if="deputies.length > 0">
        <h2 class="u-uppercase u-margin-bottom-4 c-topic__title">En esta temática destacan...</h2>
        <CardGrid :items="deputies" type="deputy" layout="large" :footprintByTopic="topic.name" />
      </div>
      <div class="u-padding-top-4" v-if="latestInitiatives">
        <div class="c-topic__initiatives__header">
          <h2 class="u-uppercase c-topic__title">Últimas iniciativas</h2>
          <router-link
            class="u-border-link u-uppercase u-hide u-inline@sm"
            :to="{ name: 'results', params: { data: 'topic=' + topic.name } }">
            Explorar todas
          </router-link>
        </div>
        <results :initiatives="latestInitiatives" :topicsStyles="styles"/>
        <router-link
          class="u-border-link u-uppercase u-hide@sm"
          :to="{ name: 'results', params: { data: 'topic=' + topic.name } }">
          Explorar todas
        </router-link>
      </div>
    </div>
    <save-alert v-show="use_alerts" :searchparams="{topic: topic.name}" :text="topic.name" />
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

  import Icon from '@/components/Icon';
  import Results from '@/components/Results';
  import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';
  import CardGrid from '@/components/CardGrid';
  import Loader from '@/components/Loader';
  import SaveAlert from '@/components/SaveAlert';
  import api from '@/api';
  import config from '@/config';
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'topic',
    components: {
      Icon,
      Results,
      ParliamentaryGroupCard,
      CardGrid,
      Loader,
      SaveAlert
    },
    data: function() {
      return {
        topic: {},
        deputies: [],
        latestInitiatives: null,
        use_alerts: config.USE_ALERTS,
        styles: config.STYLES.topics,
        loaded: false,
        stats: null,
        credits: {
          democracia: {
            name: 'Arnaud Jaegers',
            url: 'https://unsplash.com/photos/IBWJsMObnnU',
          },
          lgtbi: {
            name: 'Stavrielana Gontzou',
            url: 'https://unsplash.com/photos/u1AYyQzwJ90',
          },
          'energia-y-clima': {
            name: 'Kelly Sikkema',
            url: 'https://unsplash.com/photos/_whs7FPfkwQ',
          },
          'comercio-internacional': {
            name: 'Maxim Hopman',
            url: 'https://unsplash.com/photos/fiXLQXAhCfk',
          },
          adicciones: {
            name: 'Nastya Dullhiier',
            url: 'https://unsplash.com/photos/V8U4zraWnbg',
          },
          'conflictos-y-paz': {
            name: 'Антон Дмитриев',
            url: 'https://unsplash.com/photos/WcG7DOyrSoM',
          },
          'cooperacion-al-desarrollo': {
            name: 'Mathias P.R. Reding',
            url: 'https://unsplash.com/photos/yfXhqAW5X0c',
          },
          'derechos-digitales': {
            name: 'NASA',
            url: 'https://unsplash.com/photos/Q1p7bh3SHj8',
          },
          dependencia: {
            name: 'Jack Finnigan',
            url: 'https://unsplash.com/photos/M9EctVUPrp4',
          },
          educacion: {
            name: 'NeONBRAND',
            url: 'https://unsplash.com/photos/zFSo6bnZJTw',
          },
          empleo: {
            name: 'Annie Spratt',
            url: 'https://unsplash.com/photos/sggw4-qDD54',
          },
          'espana-vaciada': {
            name: 'Manuel Torres Garcia',
            url: 'https://unsplash.com/photos/WhoPQhc8fc4',
          },
          fiscalidad: {
            name: 'Ibrahim Boran',
            url: 'https://unsplash.com/photos/PXnJeZxMuRY',
          },
          'igualdad-de-genero': {
            name: 'Katherine Hanlon',
            url: 'https://unsplash.com/photos/bHhEJAXyFOg',
          },
          infancia: {
            name: 'Erika Giraud',
            url: 'https://unsplash.com/photos/4EFeD-VTgu4',
          },
          migraciones: {
            name: 'Brad Neathery',
            url: 'https://unsplash.com/photos/XrSzacdYbtQ',
          },
          discapacidad: {
            name: 'Josh Appel',
            url: 'https://unsplash.com/photos/0nkFvdcM-X4',
          },
          mayores: {
            name: 'WJ',
            url: 'https://unsplash.com/photos/zmMtb3PtsrE',
          },
          'personas-sin-hogar': {
            name: 'Clay LeConey',
            url: 'https://unsplash.com/photos/Za9K8pNVepw',
          },
          'poblacion-gitana': {
            name: 'Quino Al',
            url: 'https://unsplash.com/photos/eE-L2twz0Rg',
          },
          'poblacion-reclusa': {
            name: 'Emiliano Bar',
            url: 'https://unsplash.com/photos/PaKHbtTDqt0',
          },
          'proteccion-social': {
            name: 'Ryoji Iwata',
            url: 'ihttps://unsplash.com/photos/IBaVuZsJJTo',
          },
          sanidad: {
            name: 'Nguyễn Hiệp',
            url: 'https://unsplash.com/photos/sTTeaN4wwrU',
          },
          vivienda: {
            name: 'Tom Rumble',
            url: 'https://unsplash.com/photos/7lvzopTxjOU',
          },
        }
      }
    },
    computed: {
      ...mapState(['allDeputies']),
      ...mapGetters({
        getDeputyByName: 'getDeputyByName',
      }),
    },
    methods: {
      getTopic: function() {
        api.getTopic(this.$route.params.id)
          .then(response => {
            this.topic = response;
            this.getLatestInitiatives(this.topic.name);
            this.getDeputiesRanking(this.topic.name);
          })
          .catch(error => {
            this.errors = error
            this.$router.push({name: 'Page404', params: { '0': '404'}});
          });
      },
      getDeputiesRanking: function(topic) {
        api.getDeputiesRanking(topic, 6)
          .then(response => {
            const deputies_ranking = response;
            deputies_ranking.forEach((d) => {
              let deputy = this.getDeputyByName(d.name);
              deputy.footprint = d.score;
              this.deputies.push(deputy);
            });
            this.loaded = true;
          })
            .catch(error => {this.errors = error; console.log(error)});
      },
      getLatestInitiatives: function(topic) {
        api.getInitiatives({ 'topic': topic, 'per_page': 6 })
           .then(response => {
              if (response.initiatives) this.latestInitiatives = response.initiatives;
            })
           .catch(error => this.errors = error);
      },
      getStats: function() {
        api.getOverallStats()
          .then(response => {
            this.stats = response.topics.politicas;
          })
          .catch(error => {
            this.errors = error
            this.$router.push({name: 'Page404', params: { '0': '404'}});
          });
      },
      getTopicStat: function(topic) {
        for (const stat of this.stats) {
          if (stat['_id'] == topic['name']) {
            return stat['initiatives']
          }
        }
      },
    },
    created: function() {
      this.getTopic()
      this.getStats()
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
