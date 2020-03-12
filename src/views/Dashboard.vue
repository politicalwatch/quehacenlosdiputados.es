<template>
  <div>
    <div id="dashboard" class="o-container o-section u-margin-bottom-10">
      <tipi-header :title="'Métricas'" :subtitle="'Elige un Objetivo de Desarrollo Sostenible o profundiza en sus Metas y descubre cuánto de la Agenda 2030 se está tratando en el Congreso de los Diputados'"/>
      <div class="o-grid u-margin-bottom-4">
        <div class="o-grid__col u-12">
          <form @submit.prevent="getResults">
            <div class="o-grid">
              <div class="o-grid__col u-12 u-6@sm">
                <div class="c-select-label u-block">
                  <label for="topic">Objetivos</label>
                  <multiselect
                    @select="fillSubtopics"
                    v-model="data.topic"
                    :options="topics.map(topic => topic.name)"
                    name="topic" id="topic" placeholder="Todos">
                  </multiselect>
                </div>
              </div>
              <div class="o-grid__col u-12 u-6@sm">
                <div class="c-select-label u-block">
                  <label for="subtopics">Metas</label>
                  <multiselect
                    v-model="data.subtopic"
                    :options="subtopics"
                    name="subtopic" id="subtopic" placeholder="Todas">
                  </multiselect>
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="data.isSelected" class="o-grid u-margin-bottom-8 u-padding-top-8 u-border-top u-border-bottom u-margin-top-8">
        <div class="o-grid__col u-12">
          <div class="o-grid">
            <div class="o-grid__col u-8@sm">
              <h4 class="u-margin-bottom-4">Comparando objetivos y metas</h4>
              <p class="u-margin-bottom-0"><strong>¿Cuánta atención recibe {{ data.selection.selected._id }}?</strong></p>
              <p class="u-margin-top-0">Descubre su volumen de actividad frente al más popular.</p>
              <p class="u-text-subtitle">
              Hay {{data.selection.selected.initiatives}} iniciativas relacionadas con <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la meta</span>&nbsp;{{data.selection.selected._id}}&nbsp;<span v-show="data.sameSelection">(<span v-show="!data.selectedTarget">el más popular</span><span v-show="data.selectedTarget">la meta más popular del {{data.topic}}</span>)</span>.<span v-show="!data.sameSelection"> ¿Suficientes? Compáralo con <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la meta</span>&nbsp;{{data.selection.compareswith._id}} que, con {{data.selection.compareswith.initiatives}} iniciativas, es <span v-show="!data.selectedTarget">el</span><span v-show="data.selectedTarget">la</span> que más actividad concentra<span v-show="data.selectedTarget"> dentro del {{data.topic}}</span>.</span>
              </p>
            </div>
            <div class="o-grid__col u-4@sm u-text-right">
              <tipi-two-circles :selection="data.selection" :topic="data.topic" :styles="data.styles"/>
            </div>
          </div>
        </div>
      </div>
      <div class="o-grid u-margin-bottom-4" v-show="data.selection.selected.initiatives">
        <div class="o-grid__col u-12">
          <div class="o-grid">
            <div class="o-grid__col u-6@sm" v-if="data.parliamentarygroups && data.parliamentarygroups.length">
              <tipi-message type="info" v-if="data.isSelected" icon>Ránking de los grupos que más iniciativas presentan relacionadas con <strong>{{data.selection.selected._id}}</strong></tipi-message>
              <tipi-text meta="Grupos parlamentarios más activos" :value="data.parliamentarygroups.map(group => `${group._id} (${group.initiatives} ${pluralizeInitiatives(group.initiatives)})`)" type="parliamentarygroups" :source="allParliamentaryGroups"/>
            </div>
            <div class="o-grid__col u-6@sm" v-if="data.places && data.places.length">
              <tipi-message type="info" v-if="data.isSelected" icon>Descubre cuáles son los lugares más habituales en los que se tramitan las iniciativas relacionadas con <strong>{{data.selection.selected._id}}</strong></tipi-message>
              <tipi-text meta="¿Dónde se tramitan las iniciativas?" :value="data.places.map(place => `${place._id} (${place.initiatives} ${pluralizeInitiatives(place.initiatives)})`)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiMessage, TipiTwoCircles, TipiText } from 'tipi-uikit';
import Multiselect from 'vue-multiselect';
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  components: {
    TipiText,
    TipiHeader,
    TipiTwoCircles,
    Multiselect,
    TipiMessage,
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

