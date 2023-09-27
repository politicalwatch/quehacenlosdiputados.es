<template>
  <div class="c-footprint" :class="{'c-footprint--small': isSmall()}">
    <span class="c-footprint__wrapper">
      <icon icon="footprint" /><span>{{ footprint }}</span>
    </span>
  </div>
</template>

<script>
  import Icon from '@/components/Icon.vue';

  export default {
    name: 'Footprint',
    components: {
      Icon,
    },
    props: {
      footprint: [Number, String],
      small: Boolean,
    },
    methods: {
      isSmall: function() {
        if (this.small) {
          return this.small
        }
        return false
      }
    },
  }
</script>
