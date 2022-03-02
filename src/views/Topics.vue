<template>
  <div class="o-container o-section u-padding-bottom-10 u-margin-bottom-10">
    <page-header title="Temáticas"/>
    <div class="o-grid" v-if="stats">
      <div class="o-grid__col u-12 u-4@sm" v-for="topic in allTopics" :key="topic.id">
        <topic-link path="topics" :topic="topic" :image="topicsStyles[topic.name].image" :color="topicsStyles[topic.name].color" :stat="getTopicStat(topic)"/>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import api from '@/api';
import config from '@/config'
import PageHeader from '@/components/PageHeader';
import TopicLink from '@/components/TopicLink'

export default {
  name: 'topics',
  data: function() {
    return {
      topicsStyles: config.STYLES.topics,
      stats: null,
    };
  },
  components: {
    PageHeader,
    TopicLink,
  },
  computed: {
    ...mapState(['allTopics'])
  },
  created: function() {
    api.getOverallStats()
      .then(response => {
        this.stats = response.topics.politicas
      })
      .catch(error => {
        this.errors = error
        this.$router.push({name: 'Page404', params: { '0': '404'}});
      });
  },
  methods: {
    getTopicStat: function(topic) {
      for (const stat of this.stats) {
        if (stat['_id'] == topic['name']) {
          return stat['initiatives']
        }
      }
    },
  }
}
</script>
