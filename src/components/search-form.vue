<template>
  <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getResults($event)">
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
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Multiselect from 'vue-multiselect'
import api from '@/api'
import { mapGetters, mapState } from 'vuex';

const moment = require('moment');

export default {
  name: 'searchForm',
  components: {
    Datepicker,
    Multiselect,
  },
  props: {
    data: Object,
  },
  data: function() {
    return {
      subtopics: [],
      tags: [],
      places: [],
      status: [],
      types: [],
      errors: null,
      moment: moment,
      selectedSubtopics: [],
      filteredTags: [],
      advanced: false,
    }
  },
  computed: {
    ...mapGetters({
      deputies: 'allDeputiesName',
      groups: 'allParliamentaryGroupsWithGoverment',
    }),
    ...mapState({
      topics: 'allTopics'
    })
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
      this.$emit('getResults', event);
    },
    prepareForm: function() {
      if (this.data.topic) {
        this.fillSubtopicsAndTags(this.data.topic, false);
      }
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
      this.$emit('getResults');
    }
    this.prepareForm();
  },
}
</script>

<style scoped lang="scss">
</style>
