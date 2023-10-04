<template>
  <div>
    <loader
      v-if="this.loadingResults"
      title="Cargando resultados"
      subtitle="Puede llevar algun tiempo"
    />
    <section
      class="o-masonry o-grid"
      v-if="this.initiatives && this.initiatives.length && !this.loadingResults"
    >
      <div
        class="o-grid__col u-12 u-4@sm o-masonry__item"
        v-for="(initiative, index) in this.initiatives"
        :key="index"
      >
        <initiative-card
          :initiative="initiative"
          :extendedLayout="extendedLayout"
          :topicsStyles="topicsStyles"
        />
      </div>
    </section>
    <div class="o-grid o-grid--center" v-if="isMoreResults">
      <div class="o-grid__col">
        <a href="#" class="u-border-link" @click.prevent="loadMore">
          <icon icon="load-more" />Cargar más {{ nextResultsLabel }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Masonry from "masonry-layout";
import InitiativeCard from "@/components/InitiativeCard.vue";
import Loader from "@/components/Loader.vue";
import Icon from "@/components/Icon.vue";

export default {
  name: "Results",
  components: {
    Icon,
    InitiativeCard,
    Loader,
  },
  props: {
    loadingResults: Boolean,
    initiatives: {
      type: Array,
      default: function () {
        return [];
      },
    },
    queryMeta: Object,
    layout: String,
    topicsStyles: Object,
  },
  computed: {
    isMoreResults: function () {
      return (
        !this.loadingResults && this.queryMeta?.page < this.queryMeta?.pages
      );
    },
    nextResultsLabel: function () {
      let nextResult = this.queryMeta?.page * this.queryMeta?.per_page + 1;
      let lastResult = nextResult + this.queryMeta?.per_page - 1;
      return `(${nextResult}-${lastResult})`;
    },
    extendedLayout: function () {
      return this.layout != "tiny";
    },
  },
  methods: {
    loadMore: function () {
      this.$emit("loadMore");
    },
    setupMasonry: function () {
      let grid = document.querySelector(".o-masonry");
      if (grid) {
        let msnry = new Masonry(grid, {
          columnWidth: ".o-masonry__item",
          percentPosition: true,
          itemSelector: ".o-masonry__item",
        });
        msnry.layout();
      }
    },
  },
  watch: {
    initiatives: function () {
      if (this.initiatives && this.initiatives.length && !this.loadingResults) {
        this.setupMasonry();
      }
    },
  },
  updated: function () {
    this.setupMasonry();
  },
  created: function () {
    this.setupMasonry();
  },
  mounted: function () {
    this.setupMasonry();
    window.addEventListener(
      "resize",
      function () {
        this.setupMasonry();
      }.bind(this)
    );
  },
};
</script>
