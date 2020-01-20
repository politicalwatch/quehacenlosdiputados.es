<template>
  <div>
    <div id="dashboard">
      <tipi-header :title="'Métricas'" :subtitle="'Elige un Objetivo de Desarrollo Sostenible, o profundiza a nivel meta, y descubre las principales magnitudes de la actividad del Congreso de los Diputados sobre la Agenda 2030'"/>
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <div class="well">
              <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getResults">
                <fieldset>
                  <div class="form-group">
                    <label for="topic" class="col-sm-1 control-label">Objetivos</label>
                    <div class="col-sm-4">
                      <multiselect
                        @select="fillSubtopics"
                        v-model="data.topic"
                        :options="topics.map(topic => topic.name)"
                        name="topic" id="topic" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="subtopics" class="col-sm-1 control-label">Metas</label>
                    <div class="col-sm-6">
                      <multiselect
                        v-model="data.subtopic"
                        :options="subtopics"
                        name="subtopic" id="subtopic" placeholder="Todas">
                      </multiselect>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class="row">
              <div class="col-sm-12 widget" v-if="data.isSelected">
                <h4>Comparando objetivos y metas</h4>
                <p class="description"><strong>¿Cuánta atención recibe {{data.selection.selected._id}}?</strong></p>
                <p class="description">Descubre su volumen de actividad frente al más popular.</p>
                <div class="row vizz-block">
                  <div class="col-sm-6 text-center">
                    <tipi-two-circles :selection="data.selection" :topic="data.topic" :styles="data.styles"/>
                  </div>
                  <div class="col-sm-6">
                    <p class="description main">
                    Hay <strong>{{data.selection.selected.initiatives}}</strong> iniciativas relacionadas con <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la meta</span>&nbsp;<strong>{{data.selection.selected._id}}</strong>&nbsp;<span v-show="data.sameSelection">(<span v-show="!data.selectedTarget">el más popular</span><span v-show="data.selectedTarget">la meta más popular del <strong>{{data.topic}}</strong></span>)</span>.<span v-show="!data.sameSelection"> ¿Suficientes?<br/>Compáralo con <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la meta</span>&nbsp;<strong>{{data.selection.compareswith._id}}</strong> que, con <strong>{{data.selection.compareswith.initiatives}}</strong> iniciativas, es <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la</span> que más actividad concentra<span v-show="data.selectedTarget"> dentro del <strong>{{data.topic}}</strong></span>.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-show="data.selection.selected.initiatives">
              <div class="col-sm-12 widget" v-if="data.parliamentarygroups">
                <h4>Grupos parlamentarios más activos</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <ul class="list-unstyled">
                      <li v-for="pg in data.parliamentarygroups" v-bind:key="pg._id">
                        <span class="itemname">
                          <router-link :to="{path: '/parliamentarygroups/' + getPgIdFromName(pg._id)}">{{pg._id}} ({{pg.initiatives}} {{pluralizeInitiatives(pg.initiatives)}})</router-link>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-sm-5">
                    <p v-if="data.isSelected" class="description leftline">Ránking de los grupos que más iniciativas presentan relacionadas con <strong>{{data.selection.selected._id}}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-show="data.selection.selected.initiatives">
              <div class="col-sm-12 widget" v-if="data.places">
                <h4>¿Dónde se tramitan las iniciativas?</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <ul class="list-unstyled">
                      <li v-for="place in data.places" v-bind:key="place._id">
                        <span class="itemname">{{place._id}} ({{place.initiatives}} {{pluralizeInitiatives(place.initiatives)}})</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-sm-5">
                    <p v-if="data.isSelected" class="description leftline">Descubre cuáles son los lugares más habituales en los que se tramitan las iniciativas relacionadas con <strong>{{data.selection.selected._id}}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiTwoCircles } from 'tipi-uikit';
import Multiselect from 'vue-multiselect';
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    TipiHeader,
    TipiTwoCircles,
    Multiselect,
  },
  data: function() {
    return {
      subtopics: [],
      data: {
        topic: '',
        subtopic: '',
        isSelected: false,
        selectedTarget: false,
        sameSelection: false,
        selection: {
          compareswith: {
            _id: "",
            initiatives: 0
          },
          selected: {
            _id: "",
            initiatives: 0
          }
        },
        parliamentarygroups: null,
        places: null,
        styles: config.STYLES,
      },
      loadingResults: false,
    }
  },
  computed: {
    ...mapState({
        allParliamentaryGroups: 'allParliamentaryGroups',
        topics: 'allTopics',
      }),
  },
  methods: {
    fillSubtopics: function(selectedTopic, clearValues) {
      this.data.subtopic = clearValues ? "" : this.data.subtopic;
      const currentTopic = this.topics.find(topic => topic.name === selectedTopic);
      this.getSubtopics(currentTopic.id);
    },
    getTopics: function() {
      api.getTopics()
        .then(topics => {
          this.topics = topics;

        })
        .catch(error => this.errors = error);
    },
    getSubtopics: function(topicID) {
      api.getTags(topicID)
        .then(tags => {
          this.subtopics = [...new Set(tags.map(tag => tag.subtopic))];
        })
        .catch(error => this.errors = error);
    },
    getResults: function() {
      api.getOverallStats()
        .then(overall => {
          if (this.data.subtopic) {
            if (this.data.selection === null) this.data.selection = {};
            this.data.selection.selected = overall.subtopics.find(el => el._id === this.data.subtopic);
            if (this.data.selection.selected === undefined) {
              this.data.selection.selected = {};
              this.data.selection.selected._id = this.data.subtopic;
              this.data.selection.selected.initiatives = 0;
            }
            let compareswith_posibilities = overall.subtopics.filter(el => el._id.startsWith(this.data.selection.selected._id.split('.')[0]));
            this.data.selection.compareswith = compareswith_posibilities[0];
            this.data.isSelected = true;
            this.data.selectedTarget = true;
          } else {
            if (this.data.selection === null) this.data.selection = {};
            this.data.selection.selected = overall.topics.find(el => el._id === this.data.topic);
            if (this.data.selection.selected === undefined) {
              this.data.selection.selected = {};
              this.data.selection.selected._id = this.data.topic;
              this.data.selection.selected.initiatives = 0;
            }
            this.data.selection.compareswith = overall.topics[0];
            this.data.isSelected = true;
            this.data.selectedTarget = false;
          }
          this.data.sameSelection = (this.data.selection.selected._id == this.data.selection.compareswith._id) ? true : false;
        })
        .catch(error => this.errors = error);
      api.getParliamentarygroupsRanking(this.data.topic, this.data.subtopic)
        .then(ranking => {
          this.data.parliamentarygroups = ranking;
        })
        .catch(error => this.errors = error);
      api.getPlacesRanking(this.data.topic, this.data.subtopic)
        .then(ranking => {
          this.data.places = ranking;
        })
        .catch(error => this.errors = error);
    },
    pluralizeInitiatives: function(number_of_initiatives) {
      return (number_of_initiatives == 1) ? "iniciativa" : "iniciativas";
    },
    prepareForm: function() {
      if (this.data.topic) {
        this.fillSubtopics(this.data.topic, false);
      }
    },
    getPgIdFromName: function (name) {
      return this.allParliamentaryGroups.find(s => s.name == name).id;
    },
  },
  created: function() {
    this.prepareForm();
  },
  watch: {
    'data.topic': 'getResults',
    'data.subtopic': function() {
        if (this.data.subtopic !== "") this.getResults()
    },
    'data.selection': function() {
      console.log("Change selection");
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
#dashboard {
  .widget {
    padding: 40px 0px;
    h4 {
      text-transform: uppercase;
      font-weight: bold;
      border-bottom: 10px solid #efefef;
      margin-bottom: 30px;
      padding: 5px;
    }
  }
  .description {
    font-size: 1.1em;
  }
  .description.main {
    font-size: 1.6em;
  }
  .description.help {
    font-size: 1.3em;
      padding-bottom: 20px;
  }
  .itemname {
    font-size: 1.2em;
    font-weight: bold;
  }
  .vizz-block {
    padding: 40px 0px;
  }
  .leftline {
    padding-left: 10px;
    border-left: 2px solid lighten(#222, 10%);
  }
}
</style>
