<template>
  <div>
    <div class="c-topic-link">
      <div :class="'u-topic-bg__' + topic.id">
        <!-- <router-link :to="{name: 'topic', params: {id: topic.id }}" :class="'c-topic-link__image-link u-topic-bg__' + topic.id"> -->
        <router-link :to="{name: 'topic', params: {id: topic.id }}" class="c-topic-link__image-link">
          <div>
            <h1 class="c-topic-link__name u-uppercase ">{{ topic.name }}</h1>
            <h3 class="c-topic-link__name">{{ stat }}</h3><h4 class="c-topic-link__name u-uppercase">iniciativas vinculadas</h4>
          </div>
        </router-link>
      </div>
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
    stat: Number,
  },
  computed: {
    topicImage: function() {
      return `/img/topics/${this.image}` || `/img/topics/${this.topic.icon}`;
    },
  },
};
</script>
