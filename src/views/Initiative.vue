<template>
  <div class="c-initiative">
    <div v-if="loaded" id="initiative" class="o-container o-section u-margin-bottom-10">
      <div v-if="!initiative.id">
        <div class="o-grid u-padding-top-10 u-padding-bottom-10">
          <div class="o-grid__col u-12 u-10@sm u-offset-1@sm u-text-center u-padding-top-4 u-padding-bottom-4">
            <h1>Iniciativa no encontrada</h1>
            <p class="u-padding-top-4">Esto puede deberse a que la iniciativa no tiene relación directa con las temáticas TiPi o que aún no han sido procesados los últimos datos del Congreso de los Diputados. Accede nuevamente en unos días para comprobar si ya se ha actualizado o suscríbete a una alerta personalizada para recibir en tu mail todas las actualizaciones del Congreso.</p>
            <p>Encuentra <router-link :to="{name: 'about'}">más información</router-link> sobre la herramienta o utiliza el <router-link :to="{name:'search'}">buscador</router-link> para encontrar iniciativas similares.</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="o-grid o-grid--between">
          <div class="o-grid__col u-12 u-8@md">
            <h2>{{ initiative.title }}</h2>
            <div class="o-grid">
              <div class="o-grid__col u-12 u-6@sm u-text-center u-text-left@sm c-initiative__status">
                <initiative-status :initiative="initiative" />
              </div>
              <div class="o-grid__col u-12 u-6@sm u-text-left u-text-center u-text-right@sm">
                <congress-link :url="initiative.url"></congress-link>
              </div>
            </div>

            <div class="o-grid u-padding-top-2 u-margin-bottom-4">
              <div class="o-grid__col o-grid__col--fill">
                <h6 class="u-uppercase">Tipo de acto parlamentario</h6>
                <p class="c-initiative__info">{{ initiative.initiative_type_alt }}</p>
              </div>
              <div class="o-grid__col u-12 u-3@sm">
                <h6 class="u-uppercase">Referencia</h6>
                <p class="c-initiative__info">{{ initiative.reference }}</p>
              </div>
              <div class="o-grid__col u-12 u-3@sm">
                <h6 class="u-uppercase">Registro</h6>
                <p class="c-initiative__info">{{ moment(initiative.created).format('DD/MM/Y') }}</p>
              </div>
            </div>

            <topics-section class="u-hide u-block@md" meta="Temáticas tratadas" :topics="getTopics(initiative)" :tags="getTags(initiative)" :topicsStyles="styles.topics" />

          </div>

          <div class="o-grid__col u-12 u-3@md">
            <div class="u-margin-bottom-4">
              <ParliamentaryGroupCard v-for="author in initiative.authors" :parliamentary_group="getGroup(author)" layout="small"/>
              <deputy-card v-for="deputyName in initiative.deputies" :deputy="getDeputyByName(deputyName)" layout="medium" />
            </div>
          </div>
        </div>

        <div class="u-hide@md">

          <topics-section meta="Temáticas tratadas" :topics="initiative.topics" :tags="initiative.tags" :topicsStyles="styles.topics" />

        </div>
      </div>
    </div>
    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
    </div>
  </div>
</template>

<script>

import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';
import CongressLink from '@/components/CongressLink';
import CustomText from '@/components/CustomText';
import TopicsSection from '@/components/TopicsSection';
import InitiativeStatus from '@/components/InitiativeStatus';
import DeputyCard from '@/components/DeputyCard';
import TopicPill from '@/components/TopicPill';
import Results from '@/components/Results';
import Loader from '@/components/Loader';
import api from '@/api';
import config from '@/config';
import { mapGetters, mapState } from 'vuex';

const moment = require('moment');
moment.locale('es');

export default {
  name: 'initiative',
  components: {
    ParliamentaryGroupCard,
    CongressLink,
    CustomText,
    TopicsSection,
    InitiativeStatus,
    DeputyCard,
    TopicPill,
    Results,
    Loader,
  },
  data: function() {
    return {
      initiative: {},
      moment: moment,
      styles: config.STYLES,
      loaded: false,
    }
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
    ...mapState(['allDeputies', 'allTopics', 'allParliamentaryGroups']),
    dataLoaded: function() {
      return (Object.keys(this.initiative).length && this.allTopics.length > 0);
    },
  },
  methods: {
    getInitiative: function() {
      api.getInitiative(this.$route.params.id)
        .then(response => {
          this.initiative = response;
          this.loaded = true;
          window.document.title = window.document.head.querySelector('meta[property="og:title"]').content = window.document.head.querySelector('meta[name="twitter:title"]').content = `${this.initiative.title} - ${config.DEFAULT_PAGE_TITLE}`;
        })
        .catch(error => {
          this.errors = error;
          this.loaded = true;
        });
    },
    getTopics: function(initiative) {
      let topics = []
      for (const tagged of initiative['tagged']) {
        topics = topics.concat(tagged['topics'])
      }
      return topics
    },
    getTags: function(initiative) {
      let tags = []
      for (const tagged of initiative['tagged']) {
        tags = tags.concat(tagged['tags'])
      }
      return tags
    },
    getGroup: function(parliamentary_group) {
       for (const group of this.allParliamentaryGroups) {
         if (group.name == parliamentary_group) {
           return group
         }
       }
    },
  },
  created: function() {
    this.getInitiative();
  },
  watch: {
    '$route': 'getInitiative'
  }
}
</script>

<style lang="scss">

#initiative {
  .c-congress-link {
    display: inline-block;
    margin-bottom: 37px;
  }
}

</style>
