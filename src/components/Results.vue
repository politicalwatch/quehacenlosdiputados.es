<template>
  <div>
    <loader v-if="this.loadingResults" title="Cargando resultados" subtitle="Puede llevar algun tiempo" />
      <section class="o-masonry o-grid" v-if="this.initiatives && this.initiatives.length && !this.loadingResults">
        <div class="o-grid__col u-12 u-4@sm o-masonry__item" v-for="(initiative, index) in this.initiatives" :key="index">
          <initiative-card :initiative="initiative" :extendedLayout="extendedLayout" :topicsStyles="topicsStyles" />
        </div>
      </section>
      <div class="o-grid o-grid--center" v-if="this.$listeners.loadMore && isMoreResults">
        <div class="o-grid__col">
          <a href="#" class="c-button c-button--secondary" @click.prevent="loadMore">
            Cargar más {{ nextResultsLabel }}
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import InitiativeCard from './InitiativeCard';
import Loader from './Loader';
import Masonry from "masonry-layout";


export default {
  name: 'Results',
  components: {
    InitiativeCard,
    Loader,
  },
  props: {
    loadingResults: Boolean,
    initiatives: {
      type: Array,
      default: function() { return []; },
    },
    queryMeta: Object,
    layout: String,
    topicsStyles: Object,
  },
  computed: {
    isMoreResults: function() {
      return !this.loadingResults && (this.queryMeta.page < this.queryMeta.pages);
    },
    nextResultsLabel: function() {
      let nextResult = (this.queryMeta.page * this.queryMeta.per_page) + 1;
      let lastResult = nextResult + this.queryMeta.per_page -1;
      return `(${nextResult}-${lastResult})`;
    },
    extendedLayout: function() {
      return this.layout!='tiny';
    },
  },
  methods: {
    loadMore: function() {
      this.$emit('loadMore');
    },
    setupMasonry: function() {
      let grid = document.querySelector('.o-masonry');
      if (grid) {
        let msnry = new Masonry(grid, {
          columnWidth: '.o-masonry__item',
          percentPosition: true,
          itemSelector: '.o-masonry__item',
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
  mounted: function () {
    this.setupMasonry();
    window.addEventListener('resize', function() {
      this.setupMasonry();
    }.bind(this));
  },
};
</script>
