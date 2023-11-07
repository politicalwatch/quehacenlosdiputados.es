<template>
  <header class="c-navbar">

    <div class="c-disclaimer">

      <a v-if="disclaimer.external" :href="disclaimer.route" target="_blank" v-html="disclaimer.name"></a>
      <router-link v-else :to="{name: disclaimer.route}" v-html="disclaimer.name"></router-link>

      <button class="c-disclaimer__close" id="disclaimer-close" aria-label="Close Disclaimer" @click="closeDisclaimer"><icon icon="close" color="#EFCA53" /></button>

    </div>

    <div class="c-navbar__wrapper o-container">
      <div class="c-navbar__brand">
        <a class="c-navbar__brand-link" href="/"><img class="c-navbar__brand-logo" :src="logo" alt="Logo Qué hacen los diputados"></a>
      </div>
      <button
        type="button"
        class="c-navbar__menu-toggle"
        id="menu-toggle"
        aria-label="Menu Toggle"
        :class="{ 'is-active' : menuVisible }"
        v-on:click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="u-hide">Menú</span>
      </button>
      <nav class="c-navbar__menu" :class="{ 'is-active' : menuVisible }">
        <ul class="c-menu">
          <li
          @click="closeMenuMobile"
          class="c-menu__item"
          v-for="link in links"
          :key="link.route"
          v-show="link.condition">
            <a v-if="link.external" :href="link.route" class="c-menu__link" target="_blank">{{ link.name }}<icon :icon="link.icon" class="c-menu__icon" v-if="link.icon" /></a>
            <router-link v-else :to="{name: link.route }" class="c-menu__link">{{ link.name }}<icon :icon="link.icon" class="c-menu__icon" v-if="link.icon" /></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  name: 'PageNavbar',
  components: {
    Icon,
  },
  props: {
    links: Array,
    disclaimer: {
      type: Object,
      default: function() { return {}; },
    },
    preImage: String,
    logo: String,
  },
  data: function () {
    return {
      closedMessage: false,
      menuVisible: false,
    };
  },
  computed: {
    closedDisclaimer: function () {
      return window.sessionStorage.getItem('closedDisclaimer') || this.closedMessage ? true : false;
    },
  },
  methods: {
    closeDisclaimer: function() {
      window.sessionStorage.setItem('closedDisclaimer', true);
      this.closedMessage = true;
    },
    toggleMenu: function() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenuMobile: function () {
      if (this.menuVisible) {
        this.menuVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
.c-disclaimer {
  svg{
    path {
      fill: #EFCA53 !important;
    }
  }
}
</style>
