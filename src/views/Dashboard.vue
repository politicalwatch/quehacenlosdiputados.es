<template>
  <div>
    <navbar></navbar>
    <div id="dashboard">
      <page-header :title="'Métricas'" :subtitle="'Elige un Objetivo de Desarrollo Sostenible, o profundiza a nivel meta, y descubre las principales magnitudes de la actividad del Congreso de los Diputados sobre la Agenda 2030'"></page-header>
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
            <!-- <div v&#45;if="this.loadingResults" class="text&#45;center"><h2>Loading results</h2></div> -->
            <!-- <results&#45;table v&#45;if="initiatives.length &#38;&#38; !this.loadingResults" :initiatives="initiatives"></results&#45;table> -->
            <div class="row">
              <div class="col-sm-12 widget" v-if="data.isSelected">
                <h4>Comparando objetivos y metas</h4>
                <p class="description"><strong>¿Cuánta atención recibe {{data.selection.selected._id}}?</strong></p>
                <p class="description">Descubre su volumen de actividad frente al más popular.</p>
                <div class="row vizz-block">
                  <div class="col-sm-6 text-center">
                    <two-circles :selection="data.selection"></two-circles>
                  </div>
                  <div class="col-sm-6">
                    <p class="description main">
                    Hay <strong>{{data.selection.selected.initiatives}}</strong> iniciativas relacionadas con <strong>{{data.selection.selected._id}}</strong>. ¿Suficientes?<br/>Compáralo con <strong>{{data.selection.compareswith._id}}</strong> que, con <strong>{{data.selection.compareswith.initiatives}}</strong> iniciativas, es el que más actividad concentra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 widget" v-if="data.parliamentarygroups">
                <h4>Grupos parlamentarios más activos</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <ul class="list-unstyled">
                      <li v-for="pg in data.parliamentarygroups" v-bind:key="pg._id">
                        <span class="itemname">{{pg._id}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="col-sm-5">
                    <p v-if="data.isSelected" class="description leftline">Ránking de los grupos que más iniciativas presentan relacionadas con <strong>{{data.selection.selected._id}}</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 widget" v-if="data.places">
                <h4>¿Dónde se tramitan las iniciativas?</h4>
                <div class="row">
                  <div class="col-sm-6">
                    <ul class="list-unstyled">
                      <li v-for="place in data.places" v-bind:key="place._id">
                        <span class="itemname">{{place._id}}</span>
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
    <footer-block></footer-block>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header';
import FooterBlock from '@/components/footer-block';
import TwoCircles from '@/components/two-circles';
import Multiselect from 'vue-multiselect'
import api from '@/api'

export default {
  name: 'dashboard',
  components: {
    Navbar,
    PageHeader,
    FooterBlock,
    TwoCircles,
    Multiselect
  },
  data: function() {
    return {
      topics: [],
      subtopics: [],
      data: {
        topic: '',
        subtopic: '',
        isSelected: false,
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
        places: null
      },
      loadingResults: false
    }
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
          if (this.data.topic) {
            this.fillSubtopics(this.data.topic, false);
          }
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
            this.data.selection.compareswith = overall.subtopics[0];
            this.data.isSelected = true;
          } else {
            if (this.data.selection === null) this.data.selection = {};
            this.data.selection.selected = overall.topics.find(el => el._id === this.data.topic);
            this.data.selection.compareswith = overall.topics[0];
            this.data.isSelected = true;
          }
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
    prepareForm: function() {
      this.getTopics();
    }
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
