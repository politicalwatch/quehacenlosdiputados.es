<template>
  <div class="c-info-dropdown">
    <div class="c-info-dropdown__title_wrapper" @click="shown = !shown">
      <h3 class="c-info-dropdown__title">{{ title }}</h3>
      <div v-show="shown" class="c-info-dropdown__icon">Mostrar menos<icon icon="less" color="#efca53"/></div>
      <div v-show="!shown" class="c-info-dropdown__icon">Mostrar más<icon icon="plus" color="#efca53"/></div>
    </div>
    <div class="c-info-dropdown__content" v-if="shown">
      <slot />
    </div>
  </div>
</template>

<script>

import Icon from '@/components/Icon.vue';

export default {
  name: 'info-dropdown',
  components: {
    Icon,
  },
  data: function() {
    return {
      shown: false,
    }
  },
  props: {
    title: String,
  },
}
</script>

<style></style>
