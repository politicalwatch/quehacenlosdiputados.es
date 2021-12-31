<template>
  <span class="c-icon" :class="`c-icon--type-${icon}`" v-html="svg"></span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: String,
    color: String,
  },
  computed: {
    svg() {
      let svg = '';
      try {
        svg = require(`!html-loader!../assets/svg/icon-${this.icon}.svg`);
      } catch (error) {
        svg = this.icon;
      }
      return svg;
    },
  },
  mounted() {
    if (this.color && this.$el.firstChild.querySelector('path')) {
      this.$el.firstChild.querySelector('path').setAttribute('fill', this.color);
    }
  },
};
</script>
