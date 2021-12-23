<template>
  <div>
    <div id="search" class="o-container o-section u-margin-bottom-10">

      <tipi-header :title="'Buscar'" subtitle="Bucea en la actividad parlamentaria relacionada con las temáticas TIPI" />

      <search-form :formData="this.data" @getResults="getResults" />

      <div class="o-grid o-grid--align-center u-margin-bottom-4" id="results">
        <div class="o-grid__col o-grid__col--fill">
          <h4 v-if="this.query_meta.page">{{ message.message }}</h4>
        </div>
        <div class="o-grid__col o-grid__col--right">
          <tipi-csv-download
            :initiatives="initiatives || []"
            :csvItems="csvItems"
            :canDownloadCSV="canDownloadCSV"
            @loadCSVItems="loadCSVItems"
          />
          <save-alert :searchparams="data" v-show="use_alerts && this.query_meta.page" />
        </div>
      </div>
      <tipi-results
        :loadingResults="loadingResults"
        :initiatives="initiatives || []"
        :topicsStyles="topicsStyles"
        :queryMeta="query_meta"
        @loadMore="loadMore"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import searchForm from '@/components/search-form';
import SaveAlert from '@/components/save-alert';
import config from '@/config'
import api from '@/api'
import { TipiHeader, TipiCsvDownload, TipiMessage, TipiResults, TipiSplash } from 'tipi-uikit'
import { mapGetters } from 'vuex';

const qs = require('qs');
const VueScrollTo = require('vue-scrollto');

export default {
  name: 'search',
  components: {
    TipiSplash,
    SaveAlert,
    TipiResults,
    TipiMessage,
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
        page: 1,
        tags: [],
        subtopics: [],
      },
      loadingResults: false,
      csvItems: [],
      LIMITCSV: 1000,
      use_alerts: config.USE_ALERTS,
      topicsStyles: config.STYLES.topics,
      scrollToID: '#results'
    }
  },
  computed: {
    canDownloadCSV: function() {
      return this.query_meta.total < this.LIMITCSV;
    },
    ...mapGetters(['getDeputyByName', 'getParliamentaryGroupByName']),
    message: function() {
      if (this.errors) {
        return { icon: true, type: 'error', message: this.errors }
      }
      if (this.query_meta.total) {
        return { icon: true, type: 'success', message: `Se han encontrado ${this.query_meta.total} iniciativas` }
      }
      return { icon: true, type: 'error', message: `No se han encontrado iniciativas que cumplan los criterios` }
    }
  },
  methods: {
    getResults: function(event, formData) {
      this.loadingResults = true;
      this.csvItems = [];
      const isNewSearch = event && event.type === 'submit';
      const params = this.$route.params.data && !isNewSearch ?
        qs.parse(this.$route.params.data)
        : formData;
      this.data = Object.assign(this.data, params);
      const urlParams = Object.assign({}, this.data);

      if (isNewSearch) {
        this.scrollToID = '#results';
        event.preventDefault();
      }

      Object.keys(urlParams).forEach(
        key => (!urlParams[key] || key === "page") && delete urlParams[key])

      this.$router.push({
        name: 'results',
        params: {
          data: qs.stringify(urlParams, { arrayFormat: 'repeat' })
        }
      }).catch(e => e);

      api.getInitiatives(this.data)
         .then(response => {
            if (!isNewSearch) {
              this.initiatives.push.apply(this.initiatives, response.initiatives);
            } else {
              this.initiatives = response.initiatives;
            }
            this.query_meta = response.query_meta;
            this.loadingResults = false;
            Vue.nextTick()
              .then(() => {
                VueScrollTo.scrollTo(this.scrollToID, 1500)
              })
          })
         .catch(error => this.errors = error);
    },
    loadMore: function() {
      let node = document.querySelectorAll('.c-initiative-card');
      node = node[node.length - 1]
      this.scrollToID = `#${node.id}`;
      this.data.page++;
      this.getResults();
    },
    loadCSVItems: function(event) {
      if (!this.canDownloadCSV) return false;
      event.target.innerText = "Procesando descarga...";
      let params =  Object.assign({ per_page: this.LIMITCSV }, this.data);
      api.getInitiatives(params)
         .then(response => {
           this.csvItems = response.initiatives;
           event.target.innerText = "Descarga los datos";
          })
         .catch(error => this.errors = error);
    },
  },
  created: function() {
    if (this.$route.name == "results") {
      this.getResults();
    }
  },
  updated: function() {
    if (document.getElementById('downloadCSV')) {
      document.getElementById('downloadCSV').click();
    }
  }
}
</script>
