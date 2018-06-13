<template>
  <div id="search">
    <page-header :title="'Search'"></page-header>
    <div class="container page">
      <div class="row">
        <div class="col-sm-12">
          <div class="well">
            <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getInitiatives">
              <fieldset>
                <div class="form-group">
                  <label for="topic" class="col-sm-1 control-label">Tema</label>
                  <div class="col-sm-3">
                    <select-box name="topic" placeholder="Todos" :options="topics"></select-box>
                  </div>
                  <label for="tags" class="col-sm-1 control-label">Términos</label>
                  <div class="col-sm-7">
                    <select-box name="test" placeholder="Cualquiera" :options="['lorem', 'ipsum']"></select-box>
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupootro" class="col-sm-1 control-label">Autor</label>
                  <div class="col-sm-3">
                    <select-box name="grupootro" placeholder="Todos" :options="groups"></select-box>
                  </div>
                  <label for="autor" class="col-sm-1 control-label">Diputado/a</label>
                  <div class="col-sm-7">
                    <auto-complete name="autor" :options="deputies" placeholder="Apellidos, Nombre"></auto-complete>
                  </div>
                </div>
                <div class="adv-search-block" v-if="advanced">
                  <div class="form-group">
                    <label for="startdate" class="col-sm-1 control-label">Desde</label>
                    <div class="col-sm-3">
                      <datepicker input-class="form-control" placeholder="dd/mm/YYYY"  format="dd/MM/yyyy" name="fechadesde"></datepicker>
                    </div>
                    <label for="enddate" class="col-sm-1 control-label">Hasta</label>
                    <div class="col-sm-3">
                      <datepicker input-class="form-control" placeholder="dd/mm/YYYY"  format="dd/MM/yyyy" name="fechahasta"></datepicker>
                    </div>
                    <label for="lugar" class="col-sm-1 control-label">Lugar</label>
                    <div class="col-sm-3">
                      <select-box name="lugar" placeholder="Cualquiera" :options="places"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="reference" class="col-sm-1 control-label">Referencia</label>
                    <div class="col-sm-3">
                      <input class="form-control" type="text" id="reference" name="reference" placeholder="Ej.: 121/000001">
                    </div>
                    <label for="vtipo" class="col-sm-1 control-label">Tipo</label>
                    <div class="col-sm-7">
                      <select-box name="vtipo" placeholder="Cualquiera" :options="types"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="tramitacion" class="col-sm-1 control-label">Estado</label>
                    <div class="col-sm-3">
                      <select-box name="tramitacion" placeholder="Cualquiera" :options="states"></select-box>
                    </div>
                    <label for="titulo" class="col-sm-1 control-label">Título</label>
                    <div class="col-sm-7">
                      <input class="form-control" type="text" id="titulo" name="titulo" placeholder="Nota: Se admiten expresiones regulares">
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

export default {
  name: 'search',
  components: {
    PageHeader,
    SelectBox,
    AutoComplete,
    Datepicker,
    ResultsTable
  },
  data() {
    return {
      topics: [],
      groups: [],
      deputies: [],
      places: [],
      states: [],
      types: [],
      errors: [],
      initiatives: [],
      advanced: false
    }
  },
  methods: {
    getTopics() {
      api.getTopics()
        .then(topics => this.topics = topics)
        .catch(error => this.errors = error);
    },
    getGroups() {
      api.getGroups()
        .then(groups => this.groups = ['Gobierno'].concat(groups))
        .catch(error => this.errors = error);
    },
    getDeputies() {
      api.getDeputies()
        .then(deputies => this.deputies = deputies)
        .catch(error => this.errors = error);
    },
    getPlaces() {
      api.getPlaces()
        .then(places => this.places = places)
        .catch(error => this.errors = error);
    },
    getStates() {
      api.getStates()
        .then(states => this.states = states)
        .catch(error => this.errors = error);
    },
    getTypes() {
      api.getTypes()
        .then(types => this.types = types)
        .catch(error => this.errors = error);
    },
    getInitiatives() {
      const form = document.getElementById('search-form');
      let params = {};
      new FormData(form).forEach((value, key) => {
        if (value) {
          params[key] = value;
        }
      });
      api.getInitiatives(params)
        .then(initiatives => this.initiatives = initiatives)
        .catch(error => this.errors = error);
    },
    prepareForm() {
      this.getTopics();
      this.getGroups();
      this.getDeputies();
      this.getPlaces();
      this.getStates();
      this.getTypes();
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    }
  },
  created() {
    this.prepareForm();
  }
}
</script>

<style scoped lang="scss">
</style>
