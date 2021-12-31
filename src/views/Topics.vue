<template>
  <div class="o-container o-section u-padding-bottom-10 u-margin-bottom-10">
    <page-header title="Temáticas"/>
    <div class="o-grid">
      <div class="o-grid__col u-6 u-3@sm u-2@md" v-for="topic in allTopics" :key="topic.id">
        <topic-link path="topics" :topic="topic" :image="topicsStyles[topic.name].image" :color="topicsStyles[topic.name].color" />
      </div>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import TopicLink from '@/components/TopicLink'
import { mapState } from 'vuex';
import config from '@/config'

export default {
  name: 'topics',
  data: function() {
    return {
      topicsStyles: config.STYLES.topics,
    };
  },
  components: {
    PageHeader,
    TopicLink,
  },
  computed: {
    ...mapState(['allTopics'])
  }
}
</script>
