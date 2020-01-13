<template>
  <div>
    <tipi-header title="Temáticas"/>
    <div id="dicts">
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <tipi-topic-link
              v-for="topic in topics"
              :key="topic.id"
              :topic="topic"
              class="col-sm-3 col-xs-6 text-center dict"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiTopicLink } from 'tipi-uikit'
import api from '@/api';

export default {
  name: 'topics',
  components: {
    TipiHeader,
    TipiTopicLink,
  },
  data: function() {
    return {
      topics: {},
    }
  },
  methods: {
    getTopics: function() {
      api.getTopics()
        .then(response => this.topics = response)
        .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getTopics()
  }
}
</script>
