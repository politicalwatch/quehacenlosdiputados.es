<template>
  <div class="o-container o-section u-padding-bottom-10 u-margin-bottom-10">
    <tipi-header title="Temáticas"/>
    <div class="o-grid">
      <div class="o-grid__col u-6 u-3@sm u-2@md" v-for="topic in allTopics" :key="topic.id">
        <tipi-topic-link path="ods" :topic="topic" :image="topicsStyles[topic.name].image" :color="topicsStyles[topic.name].color" />
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader, TipiTopicLink } from 'tipi-uikit'
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
    TipiHeader,
    TipiTopicLink,
  },
  computed: {
    ...mapState(['allTopics'])
  }
}
</script>
