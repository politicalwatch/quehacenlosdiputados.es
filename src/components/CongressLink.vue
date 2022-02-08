<template>
  <a :href="url" class="c-congress-link u-uppercase u-border-link" target="_blank" title="Ver en el Congreso.es">Ver en el Congreso.es<icon icon="open-blank"></icon></a>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'CongressLink',
  components: {
    Icon,
  },
  props: {
    url: String,
  }
}
</script>
