<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div>
        <page-navbar
          pre-image="/img/yellow.png"
          :links="MENU"
          :logo="LOGO"
          :disclaimer="DISCLAIMER"
        />
        <router-view />
        <page-footer />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import PageNavbar from "@/components//Navbar.vue";
import PageFooter from "@/components/PageFooter.vue";
import config from "@/config";
import { useParliamentStore } from "@/stores/parliament";

const store = useParliamentStore();

const MENU = config.MENU;
const DISCLAIMER = config.DISCLAIMER;
const LOGO = config.LOGO;

onMounted(() => {
  store.getStatus();
  store.getPlaces();
  store.getTypes();
  store.getTopics();
  store.getParliamentaryGroups();
  store.getDeputies();
});
</script>

<style lang="scss">
.c-disclaimer {
  background-color: $yellow !important;
  color: $secondary-dark !important;
  align-items: center;
  justify-content: center;
  a {
    color: $secondary-dark !important;
  }
  svg {
    path {
      fill: $secondary-dark;
    }
  }
}
input[type="email"].swal2-input {
  width: auto;
}
.swal2-confirm {
  background-color: $primary !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
