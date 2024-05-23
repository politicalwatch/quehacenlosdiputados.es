<template>
  <a
    :href="url"
    class="c-congress-link u-uppercase u-border-link"
    target="_blank"
    title="Ver en el Congreso.es"
    >Ver en el Congreso.es<icon icon="open-blank"></icon
  ></a>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { url } = defineProps({
  url: { type: String },
});
</script>
