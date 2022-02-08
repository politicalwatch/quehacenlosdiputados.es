<template>
  <div class="c-not-found o-container">
    <div class="o-grid u-text-center">
      <div class="o-grid__col u-12@sm">
        <span v-html="svg"></span>
      </div>
      <div class="o-grid__col u-12@sm">
        <h5>{{ message }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    message: String,
  },
  computed: {
    svg() {
      let svg = '';
      try {
        svg = require(`!html-loader!../assets/svg/not-found.svg`);
      } catch (error) {
        svg = '';
      }
      return svg;
    },
  },
};
</script>

<style scoped lang="scss">
h5 {
  font-size: 16px;
  margin-top: 32px;
}
</style>
