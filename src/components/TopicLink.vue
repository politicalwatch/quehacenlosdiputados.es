<template>
  <div>
    <div class="c-topic-link">
      <router-link :to="{name: 'topic', params: {id: topic.id }}" class="c-topic-link__image-link" :style="`background-color: ${color}`">
        <img :src="topicImage" :alt="`Imagen de ${topic.name}`" class="c-topic-link__image">
      </router-link>
      <h4 class="c-topic-link__name">
        <router-link :to="{name: 'topic', params: {id: topic.id }}">
          {{ topic.name }}
        </router-link>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicLink',
  props: {
    color: {
      type: String,
      default: '#000',
    },
    image: String,
    topic: Object,
  },
  computed: {
    topicImage: function() {
      return `/img/topics/${this.image}` || `/img/topics/${this.topic.icon}`;
    },
  },
};
</script>
