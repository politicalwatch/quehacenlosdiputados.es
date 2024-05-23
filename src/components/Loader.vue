<template>
  <div class="c-loader">
    <div class="c-loader__spinner">
      <div class="c-loader__spinner-dot"></div>
      <div class="c-loader__spinner-dot"></div>
      <div class="c-loader__spinner-dot"></div>
      <div class="c-loader__spinner-dot"></div>
      <div class="c-loader__spinner-dot"></div>
      <div class="c-loader__spinner-dot"></div>
    </div>
    <div class="c-loader__text" v-if="title || subtitle">
      <h4 v-if="title" class="c-loader__title">{{ title }}</h4>
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup>
const { title, subtitle } = defineProps({
  title: { type: String },
  subtitle: { type: String },
});
</script>
