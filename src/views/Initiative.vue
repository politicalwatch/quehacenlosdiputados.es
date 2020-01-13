<template>
  <div>
    <div id="initiative">
      <tipi-header :title="initiative.title" />
      <div class="container page">
        <div class="row">
          <div class="col-sm-6 keyvalues">
            <tipi-text meta="Tipo de acto parlamentario" :value="initiative.initiative_type_alt" />
            <tipi-text meta="Referencia" :value="initiative.reference" />
            <tipi-text meta="Autor" :value="initiative.authors" type="parliamentarygroups" :source="allParliamentarygroups" />
            <tipi-text meta="Diputada/o" :value="initiative.deputies" type="deputies" :source="allDeputies" />
            <tipi-text meta="Lugar" :value="initiative.place" />
            <tipi-text meta="Registro" :value="moment(initiative.created).format('DD/MM/Y')" />
            <tipi-text meta="Actualización" :value="moment(initiative.updated).format('DD/MM/Y')" />
            <tipi-topics meta="ODS tratados" :topics="initiative.topics" :tags="initiative.tags" />
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-8 col-sm-offset-2">
                <tipi-initiative-meta :initiative="initiative" link-text="Ver en el Congreso de los Diputados" />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 text-center neuron-block">
                <span>Relación de esta iniciativa con los ODS <sup title="El gráfico muestra los ODS relacionados con la iniciativa y el grado de relación con cada uno de ellos, cuya intensidad se refleja en la barra circular que los rodea."><i class="fa fa-question-circle"></i></sup></span>
                <tipi-neuron :initiative="initiative"  :topics="neuronTopics" v-if="dataLoaded" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="initiative.related && initiative.related.length">
          <hr>
          <div class="row">
            <div class="col-sm-12">
              <tipi-related-initiatives meta="Actos relacionados" :related="initiative.related"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiText, TipiTopics, TipiInitiativeMeta, TipiNeuron, TipiRelatedInitiatives } from 'tipi-uikit'
import api from '@/api';
import config from '@/config';

const moment = require('moment');

export default {
  name: 'initiative',
  components: {
    TipiHeader,
    TipiText,
    TipiTopics,
    TipiInitiativeMeta,
    TipiNeuron,
    TipiRelatedInitiatives,
  },
  data: function() {
    return {
      initiative: {},
      allDeputies: null,
      allParliamentarygroups: null,
      moment: moment,
      dataLoaded: false,
      neuronTopics: [],
    }
  },
  methods: {
    getDeputies: function() {
      api.getDeputies()
        .then(response => {
          this.allDeputies = response;
          this.getParliamentarygroups();
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroups: function() {
      api.getGroups()
        .then(response => {
          this.allParliamentarygroups = response;
          this.getInitiative();
        })
        .catch(error => this.errors = error);
    },
    getInitiative: function() {
      api.getInitiative(this.$route.params.id)
        .then(response => {
          this.initiative = response;
          this.dataLoaded = true;
          window.document.title = window.document.head.querySelector('meta[property="og:title"]').content = window.document.head.querySelector('meta[name="twitter:title"]').content = `${this.initiative.title} - ${config.DEFAULT_PAGE_TITLE}`;
        })
        .catch(error => this.errors = error);
    },
    getTopics: function () {
      api.getTopics()
      .then(topics => {
        this.neuronTopics = topics;
      })
      .catch(error => this.errors = error);
    },
  },
  created: function() {
    this.getDeputies();
    this.getTopics();
  },
  watch: {
    '$route': 'getInitiative'
  }
}
</script>

<style scoped lang="scss">
.neuron-block {
  margin-top: 60px;
    span {
      text-transform: uppercase;
      border-bottom: 5px solid #efefef;
      padding-bottom: 10px;
      font-weight: bold;
    }
}
</style>
