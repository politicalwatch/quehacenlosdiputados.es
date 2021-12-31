<template>
<div :style="`background-color: ${getColor(topic)}`" class="c-topic-card">
  <div class="o-container">
    <div class="o-grid o-grid--reverse">
      <div class="o-grid__col u-12 u-3@sm u-offset-1@sm">
        <img :src="`/img/topics/${getIcon(topic)}`" :alt="`Imagen de ${topic.name}`" class="c-topic-card__image">
      </div>
      <div class="o-grid__col u-12 u-8@sm">
        <h1 class="c-topic-card__title">{{ topic.name }}</h1>
        <div class="c-topic-card__description">
          <p v-for="d in topic.description" :key="d">
            {{ d }}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TopicHeader',
  props: {
    topic: Object,
    topicsStyles: {
      type: Object,
      default: function () { return {}; },
    },
  },
  methods: {
    getIcon: function(topic) {
      return this.topicsStyles.hasOwnProperty(topic.name) && this.topicsStyles[topic.name].image ? this.topicsStyles[topic.name].image : this.topic.icon;
    },
    getColor: function(topic) {
      return this.topicsStyles.hasOwnProperty(topic.name) && this.topicsStyles[topic.name].color ? this.topicsStyles[topic.name].color : '#000';
    },
  },
};
</script>
