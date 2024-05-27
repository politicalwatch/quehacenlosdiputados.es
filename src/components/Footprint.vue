<template>
  <div class="c-footprint" :class="{ 'c-footprint--small': isSmall() }">
    <span class="c-footprint__wrapper">
      <icon icon="footprint" /><span>{{ footprint }}</span>
    </span>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { footprint, small } = defineProps({
  footprint: [Number, String],
  small: Boolean,
});

const isSmall = () => {
  return small ? true : false;
};
</script>
