<template>
  <a class="c-social-icon" :href="link" target="_blank"><img :src="`/img/${icon}.svg`"/></a>
</template>

<script>

import Icon from '@/components/Icon.vue';

export default {
  name: 'social-icon',
  components: {
    Icon,
  },
  props: {
    link: String,
    icon: String,
  },
}
</script>

<style lang="scss" scoped>
</style>
