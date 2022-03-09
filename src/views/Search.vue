<template>
  <div>
    <div id="search" class="o-container o-section u-margin-bottom-10">

      <page-header :title="'Buscador de iniciativas'" />

      <initiatives-form :formData="this.data" @getResults="getResults" @clearInitiatives="clearInitiatives" />

      <div v-if="initiatives.length > 0">
        <div class="o-grid o-grid--align-center u-margin-bottom-4" id="results">
          <div class="o-grid__col o-grid__col--fill">
            <h2 class="u-uppercase" v-if="this.query_meta.page">{{ message.message }}</h2>
            <csv-download
              :initiatives="initiatives || []"
              :csvItems="csvItems"
              :canDownloadCSV="canDownloadCSV"
              @loadCSVItems="loadCSVItems"
            />
          </div>
          <div class="o-grid__col o-grid__col--right">
            <AlertButton :searchparams="data" v-show="use_alerts && this.query_meta.page" />
          </div>
        </div>
        <results
          :loadingResults="loadingResults"
          :initiatives="initiatives || []"
          :topicsStyles="topicsStyles"
          :queryMeta="query_meta"
          @loadMore="loadMore"
        />
      </div>

      <div v-if="initiatives.length == 0 && !cleanedForm" id="results" class="u-padding-top-6 u-text-center">
        <not-found message="No se han encontrado resultados. Crea una alerta y te avisaremos."/>
        <AlertButton :searchparams="data" v-show="use_alerts && this.query_meta.page" />
      </div>

    </div>
  </div>
</template>

<script>
import InitiativesForm from '@/components/InitiativesForm';
import AlertButton from '@/components/AlertButton';
import config from '@/config'
import api from '@/api'
import PageHeader from '@/components/PageHeader';
import CsvDownload from '@/components/CsvDownload';
import Message from '@/components/Message';
import Results from '@/components/Results';
import NotFound from '@/components/NotFound';
import { mapGetters } from 'vuex';
import Vue from 'vue'

const qs = require('qs');
const VueScrollTo = require('vue-scrollto');

export default {
  name: 'search',
  components: {
    AlertButton,
    InitiativesForm,
    PageHeader,
    Results,
    NotFound,
    Message,
    CsvDownload,
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
      scrollToID: '#results',
      cleanedForm: true,
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
      this.cleanedForm = false;
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
    clearInitiatives: function() {
      this.initiatives = [];
      this.cleanedForm = true;
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
          event.target.innerText = "Descargar resultados";
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
