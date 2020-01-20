<template>
  <div>
    <tipi-header title="Temáticas"/>
    <div id="dicts">
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <tipi-topic-link
              v-for="topic in allTopics"
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
import { mapState } from 'vuex';

export default {
  name: 'topics',
  components: {
    TipiHeader,
    TipiTopicLink,
  },
  computed: {
    ...mapState(['allTopics'])
  }
}
</script>
