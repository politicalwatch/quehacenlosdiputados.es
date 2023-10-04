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

<script>
import PageNavbar from "@/components//Navbar.vue";
import PageFooter from "@/components/PageFooter.vue";
import config from "@/config";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: {
    PageNavbar,
    PageFooter,
  },
  data: function () {
    return {
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    };
  },
  methods: {
    ...mapActions([
      "getDeputies",
      "getTopics",
      "getParliamentaryGroups",
      "getPlaces",
      "getStatus",
      "getTypes",
    ]),
  },
  created: function () {
    this.getDeputies();
    this.getTopics();
    this.getStatus();
    this.getPlaces();
    this.getTypes();
    this.getParliamentaryGroups();
  },
};
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
.swal2-confirm {
  background-color: $primary !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
