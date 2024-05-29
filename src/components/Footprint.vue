<template>
  <div class="c-footprint" :class="{ 'c-footprint--small': isSmall() }">
    <span class="c-footprint__wrapper">
      <icon icon="mdi:bar-chart" :height="18" /><span>{{ footprint }}</span>
    </span>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const { footprint, small } = defineProps({
  footprint: [Number, String],
  small: Boolean,
});

const isSmall = () => {
  return small ? true : false;
};
</script>
