<template>
  <div :class="`c-message c-message--${ type } ${icon ? 'c-message--icon' : ''}`">
    <div class="c-message__wrapper">
      <icon class="c-message__icon" v-if="icon" :icon="type" />
      <slot/>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'Message',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: 'success',
      validator: function(value) {
        return ["success", "error", "info"].includes(value);
      },
    },
    icon: Boolean,
  },
};
</script>
