<template>
  <div id="search">
    <page-header :title="'Search'"></page-header>
    <div class="container page">
      <div class="row">
        <div class="col-sm-12">
          <div class="well">
            <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getResults">
              <fieldset>
                <div class="form-group">
                  <label for="topic" class="col-sm-1 control-label">Tema</label>
                  <div class="col-sm-3">
                    <select-box
                    @change="fillTags"
                    v-model="data.topic" name="topic" placeholder="Todos" :options="topics"></select-box>
                  </div>
                  <label for="tags" class="col-sm-1 control-label">Términos</label>
                  <div class="col-sm-7">
                    <select-box v-model="data.tags" name="tags" placeholder="Cualquiera" :options="tags"></select-box>
                  </div>
                </div>
                <div class="form-group">
                  <label for="author" class="col-sm-1 control-label">Autor</label>
                  <div class="col-sm-3">
                    <select-box v-model="data.author" name="author" id="author" placeholder="Todos" :options="groups"></select-box>
                  </div>
                  <label for="author_deputies" class="col-sm-1 control-label">Diputado/a</label>
                  <div class="col-sm-7">
                    <auto-complete v-model="data.deputy" name="deputy" id="deputy" :options="deputies" placeholder="Apellidos, Nombre"></auto-complete>
                  </div>
                </div>
                <div class="adv-search-block" v-show="advanced">
                  <div class="form-group">
                    <label for="startdate" class="col-sm-1 control-label">Desde</label>
                    <div class="col-sm-3">
                      <datepicker
                      :value="moment(this.data.startdate, 'YYYY-MM-DD').format('DD/MMM/YYYY')" @selected="selectStartDate"
                      input-class="form-control" placeholder="dd/mm/YYYY" format="dd/MM/yyyy" name="startdate"></datepicker>
                    </div>
                    <label for="enddate" class="col-sm-1 control-label">Hasta</label>
                    <div class="col-sm-3">
                      <datepicker
                      :value="moment(this.data.enddate, 'YYYY-MM-DD').format('DD/MMM/YYYY')"
                      @selected="selectEndDate"
                      input-class="form-control" placeholder="dd/mm/YYYY" format="dd/MM/yyyy" name="enddate"></datepicker>
                    </div>
                    <label for="place" class="col-sm-1 control-label">Lugar</label>
                    <div class="col-sm-3">
                      <select-box v-model="data.place" name="place" placeholder="Cualquiera" :options="places"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="reference" class="col-sm-1 control-label">Referencia</label>
                    <div class="col-sm-3">
                      <input v-model="data.reference" class="form-control" type="text" id="reference" name="reference" placeholder="Ej.: 121/000001">
                    </div>
                    <label for="type" class="col-sm-1 control-label">Tipo</label>
                    <div class="col-sm-7">
                      <select-box v-model="data.type" name="type" placeholder="Cualquiera" :options="types"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="status" class="col-sm-1 control-label">Estado</label>
                    <div class="col-sm-3">
                      <select-box v-model="data.status" name="status" placeholder="Cualquiera" :options="status"></select-box>
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
                  <div class="col-sm-12 pull-right">
                    <button class="btn btn-primary pull-right" type="submit">Iniciar la búsqueda</button>
                    <br>
                    <a href="#" class="adv-search-link show-block" @click="toggleAdvanced" v-if="!advanced">
                      <i class="fa fa-caret-square-o-down"></i>
                      Mostrar búsqueda avanzada
                    </a>
                    <a href="#" class="adv-search-link hide-block" v-if="advanced" @click="toggleAdvanced">
                      <i class="fa fa-caret-square-o-up"></i>
                      Ocultar búsqueda avanzada
                    </a>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <results-table v-if="initiatives.length" :initiatives="initiatives"></results-table>
          <a v-if="isMoreResults" href="#" class="load-more btn btn-primary" @click.prevent="loadMore">Cagar más</a>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-center">
          <p class="well"><i class="fa fa-lightbulb-o"></i> Tip: <strong>Los nombres de l@s diputad@s se autocompletan. Introduce una letra y verás.</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/page-header';
import SelectBox from '@/components/select-box';
import AutoComplete from '@/components/auto-complete';
import ResultsTable from '@/components/results-table';
import Datepicker from 'vuejs-datepicker';
import api from '@/api'

const moment = require('moment');

export default {
  name: 'search',
  components: {
    PageHeader,
    SelectBox,
    AutoComplete,
    Datepicker,
    ResultsTable
  },
  data: function() {
    return {
      topics: [],
      tags: [],
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
        tags: '',
        author: '',
        deputy: '',
        startdate: '',
        enddate: '',
        place: '',
        reference: '',
        type: '',
        status: '',
        title: '',
        offset: 0
      },
      advanced: false
    }
  },
  computed: {
    isMoreResults: function() {
      return this.query_meta.offset < this.query_meta.total - this.query_meta.limit;
    }
  },
  methods: {
    fillTags: function() {
      const currentTopic = this.topics.find(topic => topic.name === this.data.topic);
      this.getTags(currentTopic.id);
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
            this.fillTags();
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
        .then(deputies => this.deputies = deputies)
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
    getTags: function(topicID) {
      api.getTags(topicID)
        .then(tags => {
          this.tags = tags.map(tag => {
            tag.name = tag.tag
            return tag;
          })
        })
        .catch(error => this.errors = error);
    },
    getResults: function(event) {
      const isNewSearch = event && event.type === 'submit';
      const routeParams = this.$route.params.data ?
        this.$route.params.data
        : JSON.stringify(this.$route.params);
      const params = routeParams && !isNewSearch ?
        JSON.parse(decodeURIComponent(routeParams))
        : {};

      //keep current offset and ignored offset in url params
      const currentOffset = this.data.offset;
      this.data = Object.assign(this.data, params);
      this.data.offset = currentOffset;

      this.$router.push("/results/" + encodeURIComponent(JSON.stringify(this.data)));

      api.getInitiatives(this.data)
         .then(response => {
            if (!isNewSearch) {
              this.initiatives.push.apply(this.initiatives, response.initiatives);
            } else {
              this.initiatives = response.initiatives;
            }
            this.query_meta = response.query_meta;
          })
         .catch(error => this.errors = error);
    },
    loadMore: function() {
      this.data.offset = this.data.offset + this.query_meta.limit;
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
    toggleAdvanced: function() {
      this.advanced = !this.advanced;
    }
  },
  created: function() {
    if (this.$route.name == "results") {
      this.getResults();
    }
    this.prepareForm();
  }
}
</script>

<style scoped lang="scss">
.load-more {
  display: block;
  margin: 2rem auto;
  max-width: 320px;
  text-align: center;
}
</style>
