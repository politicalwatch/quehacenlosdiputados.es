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
        <div class="page-container">
          <router-view />
        </div>
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
  store.getBirthdays();
  store.getFootprintRange();
});
</script>

<style lang="scss">
.page-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="email"].swal2-input {
  width: auto;
}

.swal2-actions {
  flex-direction: row-reverse;
  font-family: "Fjalla One", sans-serif;

  .swal2-confirm {
    background-color: #fff;
    border: solid 4px #1d1d1b;
    border-radius: 0;
    color: black;
    text-transform: uppercase;
    transition: all 0.15s ease-in-out;
    &:hover {
      background-color: black;
      color: white;
    }
  }
  .swal2-cancel {
    background-color: transparent;
    color: $secondary-dark;

    &:hover {
      background-color: transparent;
      color: #8095a0;
    }
    &.swal2-styled:hover {
      background-image: none !important;
    }
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
