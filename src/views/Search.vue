<template>
  <div>
    <splash></splash>
    <navbar></navbar>
    <div id="search">
      <page-header :title="'Buscar'" :subtitle="'Bucea en la actividad parlamentaria relacionada con los ODS con las múltiples opciones que te ofrece el buscador de Parlamento 2030'"></page-header>
      <div id="messages" class="container" v-if="query_meta.hasOwnProperty('total')">
          <div class="row">
            <div class="col-sm-12">
              <div v-if="this.query_meta.total" class="alert alert-dismissible alert-info" role="alert">
                Se han encontrado {{ this.query_meta.total }} iniciativas.
              </div>
              <div v-else class="alert alert-dismissible alert-danger" role="alert">
                No se han encontrado iniciativas que cumplan los criterios.
              </div>
            </div>
          </div>
        </div>
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <div class="well">
              <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getResults">
                <fieldset>
                  <div class="form-group">
                    <label for="topic" class="col-sm-1 control-label">ODS/SDG</label>
                    <div class="col-sm-3">
                      <multiselect
                        @select="fillSubtopics"
                        v-model="data.topic"
                        :options="topics.map(topic => topic.name)"
                        name="topic" id="topic" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="subtopics" class="col-sm-1 control-label">Metas</label>
                    <div class="col-sm-7">
                      <multiselect
                        v-model="data.subtopics"
                        :multiple="true"
                        :options="subtopics"
                        :disabled="!this.subtopics.length"
                        :placeholder="this.subtopics.length ? 'Todos' : 'Selecciona previamente ODS/SDG'"
                        name="subtopics" id="subtopics" >
                      </multiselect>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="author" class="col-sm-1 control-label">Autor</label>
                    <div class="col-sm-3">
                      <multiselect
                        v-model="data.author"
                        :options="groups.map(group => group.name || group)"
                        name="author" id="author" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="author_deputies" class="col-sm-1 control-label">Diputado/a</label>
                    <div class="col-sm-7">
                      <multiselect
                        v-model="data.deputy"
                        :options="deputies"
                        name="deputy" id="deputy" placeholder="Apellidos, Nombre">
                      </multiselect>
                    </div>
                  </div>
                  <div class="adv-search-block" v-show="advanced">
                    <div class="form-group">
                      <label for="startdate" class="col-sm-1 control-label">Desde</label>
                      <div class="col-sm-3">
                        <datepicker
                          :value="moment(this.data.startdate, 'YYYY-MM-DD').format('DD/MMM/YYYY')" @selected="selectStartDate"
                          @cleared="clearStartDate"
                          input-class="form-control" placeholder="dd/mm/YYYY" format="dd/MM/yyyy" name="startdate"
                          :clear-button="true">
                        </datepicker>
                      </div>
                      <label for="enddate" class="col-sm-1 control-label">Hasta</label>
                      <div class="col-sm-3">
                        <datepicker
                          :value="moment(this.data.enddate, 'YYYY-MM-DD').format('DD/MMM/YYYY')"
                          @selected="selectEndDate"
                          @cleared="clearEndDate"
                          input-class="form-control" placeholder="dd/mm/YYYY" format="dd/MM/yyyy" name="enddate"
                          :clear-button="true">
                        </datepicker>
                      </div>
                      <label for="place" class="col-sm-1 control-label">Lugar</label>
                      <div class="col-sm-3">
                        <multiselect
                          v-model="data.place"
                          :options="places"
                          name="place" id="place" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="reference" class="col-sm-1 control-label">Referencia</label>
                      <div class="col-sm-3">
                        <input v-model="data.reference" class="form-control" type="text" id="reference" name="reference" placeholder="Ej.: 121/000001">
                      </div>
                      <label for="type" class="col-sm-1 control-label">Tipo</label>
                      <div class="col-sm-7">
                        <multiselect
                          v-model="data.type"
                          :options="types"
                          name="type" id="type" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="status" class="col-sm-1 control-label">Estado</label>
                      <div class="col-sm-3">
                        <multiselect
                          v-model="data.status"
                          :options="status"
                          name="status" id="status" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                      <label for="title" class="col-sm-1 control-label">Título</label>
                      <div class="col-sm-7">
                        <input v-model="data.title" class="form-control" type="text" id="title" name="title" placeholder="Nota: Se admiten expresiones regulares">
                      </div>
                    </div>
                    <div class="form-group">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-9">
                      <a href="#" class="adv-search-link show-block" @click="toggleAdvanced" v-if="!advanced">
                        <i class="fa fa-caret-square-o-down"></i>
                        Mostrar búsqueda avanzada
                      </a>
                      <a href="#" class="adv-search-link hide-block" v-if="advanced" @click="toggleAdvanced">
                        <i class="fa fa-caret-square-o-up"></i>
                        Ocultar búsqueda avanzada
                      </a>
                    </div>
                    <div class="col-sm-3">
                      <button class="btn btn-custom btn-block" type="submit">Buscar</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>

            <div v-show="initiatives.length" class="well search-actions">
              <a href="/">
                <i class="fa fa fa-times-circle-o"></i> Limpiar criterios de búsqueda
              </a>
              <a
                v-if="!csvItems.length"
                :class="{ disabled: !canDownloadCSV }"
                :title="!canDownloadCSV ? 'Demasiados resultados para poder descargar. Afina la búsqueda' : 'Descarga CSV con todos los resultados'"
                @click.prevent="loadCSVItems"
                class="pull-right" href="#">
                <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descargar datos
              </a>
              <vue-csv-downloader
                v-else
                :data="csvItems"
                :fields="csvFields"
                :downloadName="getNameFromCSV()"
                id="downloadCSV"
                class="pull-right">
                <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descargar datos
              </vue-csv-downloader>
            </div>

            <div v-if="this.loadingResults" class="text-center"><h2>Cargando resultados...</h2></div>
            <results-table v-if="initiatives.length && !this.loadingResults" :initiatives="initiatives"></results-table>
            <a v-if="isMoreResults" href="#" class="load-more btn btn-custom" @click.prevent="loadMore">
              Cargar más {{ nextResultsLabel }}
            </a>

          </div>
        </div>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>
import Splash from '@/components/splash';
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header';
import FooterBlock from '@/components/footer-block';
import ResultsTable from '@/components/results-table';
import Datepicker from 'vuejs-datepicker';
import Multiselect from 'vue-multiselect'
import VueCsvDownloader from 'vue-csv-downloader';
import api from '@/api'

const moment = require('moment');
const qs = require('qs');

export default {
  name: 'search',
  components: {
    Splash,
    Navbar,
    PageHeader,
    FooterBlock,
    Datepicker,
    ResultsTable,
    Multiselect,
    VueCsvDownloader
  },
  data: function() {
    return {
      topics: [],
      subtopics: [],
      groups: [],
      deputies: [],
      places: [],
      status: [],
      types: [],
      errors: [],
      initiatives: [],
      query_meta: [],
      moment: moment,
      data: {
        topic: '',
        subtopics: '',
        author: '',
        deputy: '',
        startdate: '',
        enddate: '',
        place: '',
        reference: '',
        type: '',
        status: '',
        title: '',
        page: 1
      },
      loadingResults: false,
      advanced: false,
      csvItems: [],
      csvFields: ['title', 'reference', 'initiative_type_alt', 'authors', 'deputies', 'topics', 'status', 'updated'],
      LIMITCSV: 1000
    }
  },
  computed: {
    isMoreResults: function() {
      return !this.loadingResults && (this.query_meta.page < this.query_meta.pages);
    },
    nextResultsLabel: function() {
      let nextResult = (this.query_meta.page * this.query_meta.per_page) + 1;
      let lastResult = nextResult + this.query_meta.per_page -1;
      return `(${nextResult}-${lastResult})`;
    },
    canDownloadCSV: function() {
      return this.query_meta.total < this.LIMITCSV;
    }
  },
  methods: {
    fillSubtopics: function(selectedTopic, clearValues) {
      this.data.subtopics = clearValues ? [] : this.data.subtopics;
      const currentTopic = this.topics.find(topic => topic.name === selectedTopic);
      this.getSubtopics(currentTopic.id);
    },
    clearStartDate: function() {
      this.data.startdate = '';
    },
    clearEndDate: function() {
      this.data.enddate = '';
    },
    selectStartDate: function(date) {
      this.data.startdate = moment(date).format('YYYY-MM-DD');
    },
    selectEndDate: function(date) {
      this.data.enddate = moment(date).format('YYYY-MM-DD');
    },
    getTopics: function() {
      api.getTopics()
        .then(topics => {
          this.topics = topics;
          if (this.data.topic) {
            this.fillSubtopics(this.data.topic, false);
          }
        })
        .catch(error => this.errors = error);
    },
    getGroups: function() {
      api.getGroups()
        .then(groups => this.groups = ['Gobierno'].concat(groups))
        .catch(error => this.errors = error);
    },
    getDeputies: function() {
      api.getDeputies()
        .then(deputies => this.deputies = deputies.map(deputy => deputy.name))
        .catch(error => this.errors = error);
    },
    getPlaces: function() {
      api.getPlaces()
        .then(places => this.places = places)
        .catch(error => this.errors = error);
    },
    getStatus: function() {
      api.getStatus()
        .then(status => this.status = status)
        .catch(error => this.errors = error);
    },
    getTypes: function() {
      api.getTypes()
        .then(types => this.types = types)
        .catch(error => this.errors = error);
    },
    getSubtopics: function(topicID) {
      api.getTags(topicID)
        .then(tags => {
          this.subtopics = [...new Set(tags.map(tag => tag.subtopic))];
        })
        .catch(error => this.errors = error);
    },
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
    prepareForm: function() {
      this.getTopics();
      this.getGroups();
      this.getDeputies();
      this.getPlaces();
      this.getStatus();
      this.getTypes();
    },
    getNameFromCSV: function() {
      let d = new Date();
      return "export-" + d.toISOString() + ".csv";
    },
    loadCSVItems: function(event) {
      if (!this.canDownloadCSV) return false;
      event.target.innerText = "Procesando descarga...";
      let params =  Object.assign({ per_page: this.LIMITCSV }, this.data);
      api.getInitiatives(params)
         .then(response => {
           this.csvItems = response.initiatives;
           event.target.innerText = "Descargar datos";
          })
         .catch(error => this.errors = error);
    },
    toggleAdvanced: function() {
      this.advanced = !this.advanced;
    }
  },
  created: function() {
    if (this.$route.name == "results") {
      this.getResults();
    }
    this.prepareForm();
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
.load-more {
  display: block;
  margin: 2rem auto;
  max-width: 320px;
  text-align: center;
}
a.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
