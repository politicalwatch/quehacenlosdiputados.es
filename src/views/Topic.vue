<template>
  <div>
    <tipi-header :title="topic.name"/>
    <div id="dict">
      <div class="container page">
        <tipi-topic-card :topic="topic" />
        <hr v-if="topic.description && topic.icon">
        <div class="row">
          <div class="col-sm-6" v-if="deputies">
            <tipi-text meta="Diputadas/os más activas/os" :value="deputies" type="deputies" :source="deputies" />
          </div>
          <div class="col-sm-6" v-if="parliamentarygroups">
            <tipi-text meta="Grupos más activos" :value="parliamentarygroups" type="parliamentarygroups" :source="parliamentarygroups" />
          </div>
        </div>
        <hr v-if="latestInitiatives">
        <h4 v-if="latestInitiatives">Últimas iniciativas</h4>
        <tipi-results layout="tiny" :initiatives="latestInitiatives"/>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiResults, TipiTopicCard, TipiText } from 'tipi-uikit'
import api from '@/api';

export default {
  name: 'topic',
  components: {
    TipiHeader,
    TipiResults,
    TipiTopicCard,
    TipiText,
  },
  data: function() {
    return {
      topic: {},
      allDeputies: null,
      deputies: null,
      allParliamentarygroups: null,
      parliamentarygroups: null,
      latestInitiatives: null,
    }
  },
  methods: {
    getTopic: function() {
      api.getTopic(this.$route.params.id)
        .then(response => {
          this.topic = response;
          this.getDeputies();
          this.getParliamentarygroups();
          this.getLatestInitiatives(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getDeputies: function() {
      api.getDeputies()
        .then(response => {
          this.allDeputies = response;
          this.getDeputiesRanking(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getDeputiesRanking: function(topic) {
      api.getDeputiesRanking(topic)
        .then(response => {
          this.deputies = response;
          this.deputies.forEach((deputy, index) => {
            let foundDeputy = this.allDeputies.find(allD => allD.name === deputy._id );
            this.deputies[index].name = this.deputies[index]._id;
            this.deputies[index].id = foundDeputy.id;
            this.deputies[index].image = foundDeputy.image;
          });
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroups: function() {
      api.getGroups()
        .then(response => {
          this.allParliamentarygroups = response;
          this.getParliamentarygroupsRanking(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroupsRanking: function(topic) {
      api.getParliamentarygroupsRanking(topic)
        .then(response => {
          this.parliamentarygroups = response;
          this.parliamentarygroups.forEach((group, index) => {
            let foundGroup = this.allParliamentarygroups.find(allPG => allPG.name === group._id );
            this.parliamentarygroups[index].name = this.parliamentarygroups[index]._id;
            this.parliamentarygroups[index].id = foundGroup.id;
          });
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function(topic) {
      api.getInitiatives({ 'topic': topic, 'per_page': 10 })
         .then(response => {
            if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    },
  },
  created: function() {
    this.getTopic()
  }
}
</script>
