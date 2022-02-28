<template>
  <div class="c-topics c-topics--extended" v-if="topics.length > 0">
    <h3 class="c-topics__label u-uppercase">{{ meta }}</h3>
    <ul class="c-topics__list">
      <li v-for="(topic, i) in sortedTopics" v-bind:key="topic" class="c-topics__list-topic">
        <router-link
          :id="`topic-${i}`"
          class="c-topics__topic"
          :style="`background-color:${topicsStyles[topic].color}`"
          :to="{ name: 'results', params: { data: paramsData(topic) } }">
          {{ topic }}
        </router-link>

        <ul v-if="getSubtopics(topic)" class="c-topics__list-subtopic">
          <li v-for="subtopic in getSubtopics(topic)" v-bind:key="subtopic+' - '+topic" class="c-topics__subtopic">
            <router-link class="c-topics__link" :to="{ name: 'results', params: { data: paramsData(topic, subtopic) } }">
              {{ subtopic }}
            </router-link>

            <ul v-if="getTags(subtopic)" class="c-topics__list-tags">
              <li v-for="tag in getTags(subtopic)" v-bind:key="tag+' - '+topic" class="c-topics__tag">
                <router-link
                  class="c-topics__link"
                  :to="{ name: 'results', params: { data: paramsData(topic, subtopic, tag) } }">
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
const qs = require('qs');
import * as Utils from '@/utils';

export default {
  name: 'TopicsSection',
  props: {
    meta: String,
    topics: Array,
    tags: Array,
    topicsStyles: Object,
  },
  computed: {
    sortedTopics: function() {
      return this.$props.topics.slice().sort(Utils.naturalSort);
    },
  },
  methods: {
    getSubtopics(topic) {
      return [...new Set(this.$props.tags.filter(tag => tag.topic === topic).map(tag => tag.subtopic))];
    },
    getTags: function(subtopic) {
      return this.$props.tags.filter(tag => tag.subtopic === subtopic).map(tag => tag.tag);
    },
    paramsData: function(currentTopic, currentSubtopic, currentTag) {
      return qs.stringify({
        topic: currentTopic,
        subtopics: currentSubtopic ? currentSubtopic : undefined,
        tags: currentTag ? currentTag : undefined,
      });
    },
  },
};
</script>
