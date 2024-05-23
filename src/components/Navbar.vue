<template>
  <header class="c-navbar">
    <div
      class="c-disclaimer"
      v-if="!closedDisclaimer && disclaimer.hasOwnProperty('name')"
    >
      <a
        v-if="disclaimer.external"
        :href="disclaimer.route"
        target="_blank"
        v-html="disclaimer.name"
      ></a>
      <router-link
        v-else
        :to="{ name: disclaimer.route }"
        v-html="disclaimer.name"
      ></router-link>

      <button
        class="c-disclaimer__close"
        id="disclaimer-close"
        aria-label="Close Disclaimer"
        @click="closeDisclaimer"
      >
        <icon icon="close" color="#ffffff" />
      </button>
    </div>

    <div class="c-navbar__wrapper o-container">
      <div class="c-navbar__brand">
        <a class="c-navbar__brand-link" href="/">
          <Logo
            class="c-navbar__brand-logo"
            alt="Logo Qué hacen los diputados"
          />
        </a>
      </div>
      <button
        type="button"
        class="c-navbar__menu-toggle"
        id="menu-toggle"
        aria-label="Menu Toggle"
        :class="{ 'is-active': menuVisible }"
        v-on:click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="u-hide">Menú</span>
      </button>
      <nav class="c-navbar__menu" :class="{ 'is-active': menuVisible }">
        <ul class="c-menu">
          <li
            @click="closeMenuMobile"
            class="c-menu__item"
            v-for="link in links"
            :key="link.route"
            v-show="link.condition"
          >
            <a
              v-if="link.external"
              :href="link.route"
              class="c-menu__link"
              target="_blank"
            >
              {{ link.name }}
              <icon
                :icon="link.icon"
                :class="{
                  'c-menu__link': true,
                  'c-menu__link--icon': link.icon,
                }"
                v-if="link.icon"
              />
            </a>
            <router-link
              v-else
              :to="{ name: link.route }"
              :class="{ 'c-menu__link': true, 'c-menu__link--icon': link.icon }"
            >
              <icon :icon="link.icon" class="c-menu__icon" v-if="link.icon" />
              <span>{{ link.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";

import Logo from "@/assets/logo.svg";
import Icon from "@/components/Icon.vue";

const { links, disclaimer, preImage, logo } = defineProps({
  links: { type: Array },
  disclaimer: {
    type: Object,
    default: () => {},
  },
  preImage: { type: String },
  logo: { type: String },
});

const closedMessage = ref(false);
const menuVisible = ref(false);

const closedDisclaimer = computed(() => {
  return window.sessionStorage.getItem("closedDisclaimer") ||
    closedMessage.value
    ? true
    : false;
});

const closeDisclaimer = () => {
  window.sessionStorage.setItem("closedDisclaimer", true);
  closedMessage.value = true;
};

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const closeMenuMobile = () => {
  if (menuVisible.value) {
    menuVisible.value = false;
  }
};
</script>
