<template>
  <p v-if="topics">
  <span class="meta">{{meta}}</span>
  <br>
  <ul class="list-unstyled">
    <li v-for="topic in topics" v-bind:key="topic" class="value">
      <router-link :to="{ name: 'results', params: { data: paramsData(topic) } }">{{topic}}</router-link>
      <br>
      <div v-for="subtopic in getSubtopics(topic)" v-bind:key="subtopic" class="subtopic">
        Meta {{subtopic}}
        <br>
        <span v-for="tag in getTags(subtopic)" v-bind:key="tag" class="tag">{{tag}}</span>
        <br>
      </div>

    </li>
  </ul>
  </p>
</template>

<script>
const qs = require('qs');

export default {
  name: 'topics-element',
  props: [
    'meta',
    'topics',
    'tags'
  ],
  methods: {
    getSubtopics(topic) {
      return [...new Set(this.$props.tags.filter(tag => tag.topic === topic).map(tag => tag.subtopic))];
    },
    getTags: function(subtopic) {
      return this.$props.tags.filter(tag => tag.subtopic === subtopic).map(tag => tag.tag)
    },
    paramsData: function(currentTopic) {
      return qs.stringify({
        topic: currentTopic
      });
    }
  }
}
</script>

<style scoped lang="scss">
.value {
  .subtopic {
    font-size: 0.8em;
    margin-left: 20px;
    .tag {
      background-color: lighten(#abe8ff, 5%);
      color: #222;
      padding: 5px;
      margin: 0px 5px 5px 5px;
      font-size: 0.8em;
      font-weight: normal;
    }
  }
}
</style>
