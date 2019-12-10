<template>
  <div>
    <splash></splash>
    <navbar></navbar>
    <div id="search">
      <page-header :title="'Buscar'" :subtitle="'Bucea en la actividad parlamentaria relacionada con los ODS con las múltiples opciones que te ofrece el buscador de Parlamento 2030'"></page-header>
      <div id="messages" class="container" v-if="query_meta.hasOwnProperty('total')">
          <div class="row">
            <div class="col-sm-12">
              <div v-if="this.errors">
                <div class="alert alert-dismissible alert-danger" role="alert">
                  {{this.errors}}
                </div>
                <br/>
              </div>
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
                    <div class="col-sm-5">
                      <multiselect
                        selectedLabel="Seleccionado"
                        selectLabel=""
                        deselectLabel="Pulsa para deseleccionar"
                        @select="fillSubtopicsAndTags"
                        @remove="clearSubtopicsAndTags"
                        v-model="data.topic"
                        :options="topics.map(topic => topic.name)"
                        :allow-empty="true"
                        name="topic" id="topic" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="subtopics" class="col-sm-1 control-label">Metas</label>
                    <div class="col-sm-5">
                      <multiselect
                        selectedLabel="Seleccionada"
                        selectLabel=""
                        deselectLabel="Pulsa para deseleccionar"
                        @select="addSubtopicToTagsFilter"
                        @remove="removeSubtopicToTagsFilter"
                        v-model="data.subtopics"
                        :multiple="true"
                        :options="subtopics"
                        :allow-empty="true"
                        :disabled="!this.subtopics.length"
                        :placeholder="this.subtopics.length ? 'Todos' : 'Selecciona previamente un ODS/SDG'"
                        name="subtopics" id="subtopics" >
                      </multiselect>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="tags" class="col-sm-1 control-label">Etiquetas</label>
                    <div class="col-sm-11">
                      <multiselect
                        selectedLabel="Seleccionada"
                        selectLabel=""
                        deselectLabel="Pulsa para deseleccionar"
                        v-model="data.tags"
                        :multiple="true"
                        :options="filteredTags"
                        :allow-empty="true"
                        :disabled="!this.filteredTags.length"
                        :placeholder="this.filteredTags.length ? 'Todos' : 'Selecciona previamente un ODS/SDG'"
                        name="tags" id="tags" >
                      </multiselect>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="author" class="col-sm-1 control-label">Autor</label>
                    <div class="col-sm-5">
                      <multiselect
                        selectedLabel="Seleccionado"
                        selectLabel=""
                        deselectLabel="Pulsa para deseleccionar"
                        v-model="data.author"
                        :options="groups.map(group => group.name || group)"
                        :allow-empty="true"
                        name="author" id="author" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="author_deputies" class="col-sm-1 control-label">Diputado/a</label>
                    <div class="col-sm-5">
                      <multiselect
                        selectedLabel="Seleccionado"
                        selectLabel=""
                        deselectLabel="Pulsa para deseleccionar"
                        v-model="data.deputy"
                        :options="deputies"
                        :allow-empty="true"
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
                      <label for="status" class="col-sm-1 control-label">Estado</label>
                      <div class="col-sm-3">
                        <multiselect
                          selectedLabel="Seleccionado"
                          selectLabel=""
                          deselectLabel="Pulsa para deseleccionar"
                          v-model="data.status"
                          :options="status"
                          :allow-empty="true"
                          name="status" id="status" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="place" class="col-sm-1 control-label">Lugar</label>
                      <div class="col-sm-5">
                        <multiselect
                          selectedLabel="Seleccionado"
                          selectLabel=""
                          deselectLabel="Pulsa para deseleccionar"
                          v-model="data.place"
                          :options="places"
                          :allow-empty="true"
                          name="place" id="place" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                      <label for="type" class="col-sm-1 control-label">Tipo</label>
                      <div class="col-sm-5">
                        <multiselect
                          selectedLabel="Seleccionado"
                          selectLabel=""
                          deselectLabel="Pulsa para deseleccionar"
                          v-model="data.type"
                          :options="types"
                          :allow-empty="true"
                          name="type" id="type" placeholder="Cualquiera">
                        </multiselect>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="reference" class="col-sm-1 control-label">Referencia</label>
                      <div class="col-sm-5">
                        <input v-model="data.reference" class="form-control" type="text" id="reference" name="reference" placeholder="Ej.: 121/000001">
                      </div>
                      <label for="title" class="col-sm-1 control-label">Título</label>
                      <div class="col-sm-5">
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

            <div class="well search-actions" v-show="this.query_meta.total >= 0">
              <save-alert :searchparams="data" v-show="alertsIsEnabled()"></save-alert>
              <span v-show="initiatives.length">
                <a
                  v-if="!csvItems.length"
                  :class="{ disabled: !canDownloadCSV }"
                  :title="!canDownloadCSV ? 'Demasiados resultados para poder descargar. Afina la búsqueda' : 'Descarga CSV con todos los resultados'"
                  @click.prevent="loadCSVItems"
                  class="pull-right" href="#">
                  <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descarga datos
                </a>
                <vue-csv-downloader
                  v-else
                  :data="csvItems"
                  :fields="csvFields"
                  :downloadName="getNameFromCSV()"
                  id="downloadCSV"
                  class="pull-right">
                  <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descarga datos
                </vue-csv-downloader>
              </span>
            </div>

            <Results :loadingResults="this.loadingResults" :initiatives="initiatives || []" />
            <HelloWorld :msg="'Hola mundo!'" />
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
import SaveAlert from '@/components/save-alert';
import config from '@/config'
import api from '@/api'
import { HelloWorld, Results } from 'tipi-frontend-uikit/src/components'

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
    VueCsvDownloader,
    SaveAlert,
    HelloWorld,
    Results
  },
  data: function() {
    return {
      topics: [],
      subtopics: [],
      tags: [],
      groups: [],
      deputies: [],
      places: [],
      status: [],
      types: [],
      errors: null,
      initiatives: [],
      query_meta: [],
      moment: moment,
      data: {
        topic: '',
        subtopics: [],
        tags: [],
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
      selectedSubtopics: [],
      filteredTags: [],
      loadingResults: false,
      advanced: false,
      csvItems: [],
      csvFields: ['title', 'reference', 'initiative_type_alt', 'authors', 'deputies', 'topics', 'subtopics', 'tags', 'place', 'status', 'updated', 'url'],
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
    fillSubtopicsAndTags: function(selectedTopic, clearValues) {
      if (clearValues) {
        this.data.subtopics = [];
        this.data.tags = [];
      }
      const currentTopic = this.topics.find(topic => topic.name === selectedTopic);
      this.getSubtopicsAndTags(currentTopic.id);
    },
    clearSubtopicsAndTags: function() {
      this.subtopics = [];
      this.selectedSubtopics = [];
      this.tags = [];
      this.filteredTags = [];
      this.data.subtopics = [];
      this.data.tags = [];
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
            this.fillSubtopicsAndTags(this.data.topic, false);
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
        .then(places => this.places = places.map(places => places.name))
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
    getSubtopicsAndTags: function(topicID) {
      api.getTags(topicID)
        .then(tags => {
          this.subtopics = [...new Set(tags.map(tag => tag.subtopic))];
          this.tags = tags;
          this.filteredTags = this.tags.map(tag => tag.tag);
        })
        .catch(error => this.errors = error);
    },
    filterTags: function() {
      let filtered = (this.selectedSubtopics.length) ?
        (tag => this.selectedSubtopics.indexOf(tag.subtopic) !== -1)
        : (() => true);
      this.filteredTags = this.tags.filter(filtered).map(tag => tag.tag);
    },
    addSubtopicToTagsFilter: function(selectedSubtopic) {
      this.data.tags = [];
      this.selectedSubtopics.push(selectedSubtopic);
      this.filterTags();
    },
    removeSubtopicToTagsFilter: function(removedSubtopic) {
      this.data.tags = [];
      this.selectedSubtopics.splice(this.selectedSubtopics.indexOf(removedSubtopic), 1);
      this.filterTags();
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
