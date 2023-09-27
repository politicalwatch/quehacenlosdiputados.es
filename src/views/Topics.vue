<template>
  <div v-if="loaded" class="o-container o-section u-padding-bottom-10 u-margin-bottom-10">
    <page-header title="Temáticas"/>
    <div class="o-grid" v-if="stats">
      <div class="o-grid__col u-12 u-4@sm" v-for="topic in getTopics()" :key="topic.id">
        <topic-link path="topics" :topic="topic" :image="topicsStyles[topic.name].image" :color="topicsStyles[topic.name].color" :stat="topic.initiatives"/>
      </div>
    </div>
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import api from '@/api';
import config from '@/config'
import PageHeader from '@/components/PageHeader.vue';
import TopicLink from '@/components/TopicLink.vue'
import Loader from '@/components/Loader.vue';

export default {
  name: 'topics',
  components: {
    PageHeader,
    TopicLink,
    Loader
  },
  data: function() {
    return {
      topicsStyles: config.STYLES.topics,
      stats: null,
      loaded: false,
    };
  },
  computed: {
    ...mapState(['allTopics'])
  },
  created: function() {
    api.getOverallStats()
      .then(response => {
        this.stats = response.topics.politicas
        this.loaded = true;
      })
      .catch(error => {
        this.errors = error
        this.$router.push({name: 'Page404', params: { '0': '404'}});
      });
  },
  methods: {
    getTopics: function() {
      let topics = []
      for (const topic of this.allTopics) {
        topic.initiatives = this.getTopicStat(topic)
        topics.push(topic)
      }
      return topics.sort(function(a, b){return b.initiatives-a.initiatives})
    },
    getTopicStat: function(topic) {
      for (const stat of this.stats) {
        if (stat['_id'] == topic.name) {
          return stat['initiatives']
        }
      }
    },
  }
}
</script>
