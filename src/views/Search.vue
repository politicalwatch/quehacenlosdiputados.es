<template>
  <div>
    <tipi-splash>
      <img src="/img/logo.png">
      <p><strong>Parlamento 2030</strong> te ofrece toda la información sobre la actividad del Congreso de los Diputados relacionada con los <strong>Objetivos de Desarrollo Sostenible (ODS)</strong>. Entra y descubre cómo trabajan los diputados españoles de cara al cumplimiento de la <strong>Agenda 2030</strong>.</p>
      <p>Estás a punto de entrar en la versión beta de Parlamento 2030. En ella encontrarás toda la información parlamentaria relacionada con 6 de los 17 ODS que configuran la Agenda 2030. Estamos actualmente trabajando en el resto de ODS y pronto estarán disponible.</p>
      <p>
        <router-link :to="{name: 'about-en'}">Learn more about this project in English</router-link>
      </p>
    </tipi-splash>
    <div id="search">
      <tipi-header :title="'Buscar'" :subtitle="'Bucea en la actividad parlamentaria relacionada con los ODS con las múltiples opciones que te ofrece el buscador de Parlamento 2030'" />
      <tipi-messages :errors="this.errors" :queryMeta="this.query_meta" />
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <div class="well">
              <search-form :data="this.data" @getResults="getResults" />
            </div>
            <div class="well search-actions" v-show="this.query_meta.total >= 0">
              <save-alert :searchparams="data" v-show="alertsIsEnabled()" />
              <tipi-csv-download
                :initiatives="initiatives || []"
                :csvItems="csvItems"
                :canDownloadCSV="canDownloadCSV"
                @loadCSVItems="loadCSVItems"
              />
            </div>
            <tipi-results
              :loadingResults="loadingResults"
              :initiatives="initiatives || []"
              :queryMeta="query_meta"
              @loadMore="loadMore"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/search-form';
import SaveAlert from '@/components/save-alert';
import config from '@/config'
import api from '@/api'
import { TipiHeader, TipiCsvDownload, TipiMessages, TipiResults, TipiSplash } from 'tipi-frontend-uikit'

const qs = require('qs');

export default {
  name: 'search',
  components: {
    TipiSplash,
    SaveAlert,
    TipiResults,
    TipiMessages,
    TipiCsvDownload,
    TipiHeader,
    searchForm,
  },
  data: function() {
    return {
      errors: null,
      initiatives: [],
      query_meta: {},
      data: {
        topic: '',
        author: '',
        deputy: '',
        startdate: '',
        enddate: '',
        place: '',
        reference: '',
        page: 1
      },
      loadingResults: false,
      csvItems: [],
      LIMITCSV: 1000,
    }
  },
  computed: {
    canDownloadCSV: function() {
      return this.query_meta.total < this.LIMITCSV;
    }
  },
  methods: {
    getResults: function(event) {
      this.loadingResults = true;
      this.csvItems = [];
      const isNewSearch = event && event.type === 'submit';
      const params = this.$route.params.data && !isNewSearch ?
        qs.parse(this.$route.params.data)
        : {};
      this.data = Object.assign(this.data, params);
      const urlParams = Object.assign({}, this.data);

      Object.keys(urlParams).forEach(
        key => (!urlParams[key] || key === "page") && delete urlParams[key])

      this.$router.push({
        name: 'results',
        params: {
          data: qs.stringify(urlParams, { arrayFormat: 'repeat' })
        }
      });

      api.getInitiatives(this.data)
         .then(response => {
            if (!isNewSearch) {
              this.initiatives.push.apply(this.initiatives, response.initiatives);
            } else {
              this.initiatives = response.initiatives;
            }
            this.query_meta = response.query_meta;
            this.loadingResults = false;
          })
         .catch(error => this.errors = error);
    },
    loadMore: function() {
      this.data.page++;
      this.getResults();
    },
    alertsIsEnabled: function() {
      return config.USE_ALERTS;
    },
    loadCSVItems: function(event) {
      if (!this.canDownloadCSV) return false;
      event.target.innerText = "Procesando descarga...";
      let params =  Object.assign({ per_page: this.LIMITCSV }, this.data);
      api.getInitiatives(params)
         .then(response => {
           this.csvItems = response.initiatives;
           event.target.innerText = "Descarga datos";
          })
         .catch(error => this.errors = error);
    },
  },
  updated: function() {
    if (document.getElementById('downloadCSV')) {
      document.getElementById('downloadCSV').click();
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.multiselect {
  &__content {
    max-width: 100%;
    font-size: 14px;
  }
}
.container {
  @media (min-width: 992px) and (max-width: 1200px) {
    width: 98%;
  }
}
</style>
