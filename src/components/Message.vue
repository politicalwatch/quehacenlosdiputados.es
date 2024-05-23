<template>
  <div :class="`c-message c-message--${type} ${icon ? 'c-message--icon' : ''}`">
    <div class="c-message__wrapper">
      <icon class="c-message__icon" v-if="icon" :icon="type" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { type, icon } = defineProps({
  type: {
    type: String,
    default: "success",
    validator: (value) => {
      return ["success", "error", "info"].includes(value);
    },
  },
  icon: {
    type: Boolean,
    default: false,
  },
});
</script>
