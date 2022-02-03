<template>
  <div class="c-party_logo_icon" :style="getBackground()">
    <img class="c-party_logo_icon__image" :src="getLogoSrc()" :alt="'Logo de ' + name"/>
  </div>
</template>

<script>
export default {
  name: 'PartyLogoIcon',
  props: {
    name: String,
    logo: String,
    color: String,
  },
  methods: {
    getBackground: function () {
      const bg = this.color
      if (bg.length == 7) {
        return "background-color:" + bg
      }
      return "background-image:" + bg
    },
    getLogoSrc: function () {
      return require(`../assets/party_logos/icon/${this.logo}.svg`);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
