<template>
  <a
    :href="url"
    class="c-congress-link u-uppercase u-border-link"
    target="_blank"
    title="Ver en el Congreso.es"
  >
    Ver en el Congreso.es
    <Icon icon="mdi:external-link" color="#2d4252" :width="20" />
  </a>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const { url } = defineProps({
  url: { type: String },
});
</script>
