<template>
  <div>
    <div class="c-topic-link">
      <div :class="'u-topic-bg__' + topic.id">
        <!-- <router-link :to="{name: 'topic', params: {id: topic.id }}" :class="'c-topic-link__image-link u-topic-bg__' + topic.id"> -->
        <router-link
          :to="{ name: 'topic', params: { id: topic.id } }"
          class="c-topic-link__image-link"
        >
          <div>
            <h1 class="c-topic-link__name u-uppercase">{{ topic.name }}</h1>
            <h3 class="c-topic-link__name">{{ stat }}</h3>
            <h4 class="c-topic-link__name u-uppercase">
              iniciativas vinculadas
            </h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const { topic, stat, color, image } = defineProps({
  topic: {
    type: Object,
    required: true,
  },
  stat: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: "#000",
  },
  image: {
    type: String,
  },
});

const topicImage = computed(() => {
  return `/img/topics/${image}` || `/img/topics/${topic?.icon}`;
});
</script>
