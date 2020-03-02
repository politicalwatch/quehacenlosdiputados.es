<template>
  <div>
    <div id="initiative" class="o-container o-section u-margin-bottom-10">
      <div class="o-grid o-grid--between">
        <div class="o-grid__col u-12 u-8@md">
          <div class="o-grid">
            <div class="o-grid__col u-12 u-6@md">
              <tipi-topic-pill v-if="initiative.topics && initiative.topics.length" class="u-margin-bottom-2" :topicsStyles="styles.topics" :topics="['ODS 1 - Fin de la Pobreza','ODS 11 - Ciudades y comunidades sostenibles','ODS 7 - Energía asequible y no contaminante']" with-links/>
            </div>
            <div class="o-grid__col u-12 u-6@md u-text-right@md u-margin-bottom-2" v-if="initiative.related && initiative.related.length">
              <a href="#related" class="c-button c-button--compact u-padding-left-0">Ver iniciativas relacionadas</a>
            </div>
          </div>
          <p class="u-color-secondary u-margin-bottom-1 u-margin-top-0">Actualizado {{ moment(initiative.updated).fromNow() }}</p>
          <h1 class="u-text-th4 u-margin-bottom-4">{{ initiative.title }}</h1>

          <div class="o-grid u-padding-top-4 u-border-top u-border-bottom u-margin-bottom-4">
            <div class="o-grid__col o-grid__col--fill">
              <tipi-text meta="Tipo de acto parlamentario" :value="initiative.initiative_type_alt" />
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <tipi-text meta="Registro" :value="moment(initiative.created).format('DD/MM/Y')" />
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <tipi-text meta="Referencia" :value="initiative.reference" />
            </div>
          </div>
          <tipi-topics meta="ODS tratados" :topics="initiative.topics" :tags="initiative.tags" :topicsStyles="styles.topics" />

          <div class="o-grid u-margin-top-4 u-padding-top-4 u-border-top" v-if="initiative.related && initiative.related.length">
            <div class="o-grid__col o-grid__col--fill">
              <h4 id="related" class="u-margin-bottom-4">Iniciativas relacionadas</h4>
              <tipi-results :initiatives="initiative.related" :topicsStyles="styles.topics"/>
            </div>
          </div>
        </div>
        <div class="o-grid__col u-12 u-3@md">
          <div class="u-padding-bottom-4 u-border-bottom u-margin-bottom-4">
            <tipi-initiative-meta :initiative="initiative" link-text="Ver en el Congreso de los Diputados" />
          </div>

          <div class="u-padding-bottom-4 u-border-bottom u-margin-bottom-4">
            <InitiativeChart :initiative="initiative" :topics="allTopics" v-if="dataLoaded"></InitiativeChart>
            <span class="u-text-tbody2">Relación de esta iniciativa con los ODS <sup title="El gráfico muestra los ODS relacionados con la iniciativa y el grado de relación con cada uno de ellos, cuya intensidad se refleja en la barra circular que los rodea."><i class="fa fa-question-circle"></i></sup></span>
          </div>
          <div class="u-border-bottom u-margin-bottom-4">
            <tipi-text meta="Autor" :value="initiative.authors" type="parliamentarygroups" :source="allParliamentaryGroups" />
            <tipi-text meta="Diputada/o" :value="initiative.deputies" type="deputies" :source="allDeputies" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiText, TipiTopics, TipiInitiativeMeta, TipiNeuron, TipiTopicPill, TipiResults } from 'tipi-uikit'
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';
import InitiativeChart from '@/components/initiative-chart.vue';

const moment = require('moment');
moment.locale('es');

export default {
  name: 'initiative',
  components: {
    TipiHeader,
    TipiText,
    TipiTopics,
    TipiInitiativeMeta,
    TipiNeuron,
    TipiTopicPill,
    TipiResults,
    InitiativeChart,
  },
  data: function() {
    return {
      initiative: {},
      moment: moment,
      styles: config.STYLES,
    }
  },
  computed: {
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
          window.document.title = window.document.head.querySelector('meta[property="og:title"]').content = window.document.head.querySelector('meta[name="twitter:title"]').content = `${this.initiative.title} - ${config.DEFAULT_PAGE_TITLE}`;
        })
        .catch(error => {
          this.errors = error;
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
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
