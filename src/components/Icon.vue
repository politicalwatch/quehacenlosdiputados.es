<template>
  <span class="c-icon" :class="`c-icon--type-${icon}`">
    <component :is="svg" />
  </span>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Icon",
  props: {
    icon: String,
    color: String,
  },
  computed: {
    svg() {
      let svg = "";
      try {
        svg = defineAsyncComponent(() =>
          import(`@/assets/svg/icon-${this.icon}.svg`)
        );
      } catch (error) {
        svg = this.icon;
      }
      return svg;
    },
  },
  updated() {
    if (this.color && this.$el.querySelector("svg path")) {
      this.$el.querySelector("svg path").style.fill = this.color;
    }
  },
};
</script>
