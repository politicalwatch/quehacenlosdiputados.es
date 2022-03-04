<template>
  <div class="c-footprint">
    <span class="c-footprint__wrapper">
      <icon icon="footprint" /><span>{{ footprint }}</span>
    </span>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'Footprint',
    components: {
      Icon,
    },
    props: {
      footprint: [Number, String],
    }
  }
</script>
