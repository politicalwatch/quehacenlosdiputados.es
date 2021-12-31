<template>
  <a :href="url" class="c-congress-link u-color-primary" target="_blank" title="Ver en el Congreso.es"><icon icon="open-blank"></icon>Ver en el Congreso.es</a>
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
