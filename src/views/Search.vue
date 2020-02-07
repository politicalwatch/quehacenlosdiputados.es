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
    <div id="search" class="o-container o-section u-padding-top-0">

      <tipi-header :title="'Buscar'" :subtitle="'Bucea en la actividad parlamentaria relacionada con los ODS con las múltiples opciones que te ofrece el buscador de Parlamento 2030'" />

      <search-form :data="this.data" @getResults="getResults" />

      <div class="o-grid u-padding-bottom-4" v-show="false" v-if="this.data.author || this.data.deputy">
        <div class="o-grid__col o-grid__col--fill">
          <router-link
            class="c-button c-button--secondary u-block"
            v-if="getParliamentaryGroupByName(this.data.author)"
            :to="{ path: `/parliamentarygroups/${getParliamentaryGroupByName(this.data.author).id}` }">
            ¿Quieres ver el perfil del {{ this.data.author }}?
          </router-link>
        </div>
        <div class="o-grid__col o-grid__col--fill">
          <router-link
            class="c-button c-button--secondary u-block"
            v-if="getDeputyByName(this.data.deputy)"
            :to="{ path: `/deputies/${getDeputyByName(this.data.deputy).id}` }">
            ¿Quieres ver el perfil del diputado {{ this.data.deputy }}?
          </router-link>
        </div>
      </div>
      <div class="o-grid o-grid--align-center u-margin-bottom-4">
        <div class="o-grid__col o-grid__col--fill">
          <tipi-message v-if="this.query_meta.page" :type="message.type" :icon="message.icon">{{ message.message }}</tipi-message>
        </div>
        <div class="o-grid__col o-grid__col--right">
          <tipi-csv-download
            :initiatives="initiatives || []"
            :csvItems="csvItems"
            :canDownloadCSV="canDownloadCSV"
            @loadCSVItems="loadCSVItems"
          />
          <save-alert :searchparams="data" v-show="alertsIsEnabled && this.query_meta.page" />
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
import searchForm from '@/components/search-form';
import SaveAlert from '@/components/save-alert';
import config from '@/config'
import api from '@/api'
import { TipiHeader, TipiCsvDownload, TipiMessage, TipiResults, TipiSplash } from 'tipi-uikit'
import { mapGetters } from 'vuex';

const qs = require('qs');

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
        page: 1
      },
      loadingResults: false,
      csvItems: [],
      LIMITCSV: 1000,
      topicsStyles: config.STYLES.topics,
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
        return { icon: true, type: 'success', message: `Se han encontrado ${this.query_meta.total} iniciativas.` }
      } else {
        return { icon: true, type: 'error', message: `No se han encontrado iniciativas que cumplan los criterios.` }
      }
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
