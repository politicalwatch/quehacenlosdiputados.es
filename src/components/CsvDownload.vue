<template>
  <h5 class="u-uppercase c-csv-download" v-show="initiatives.length">
    <a
      v-if="!csvItems.length"
      :class="{ disabled: !canDownloadCSV }"
      :title="!canDownloadCSV ? 'Demasiados resultados para poder descargar. Afina la búsqueda' : 'Descarga CSV con todos los resultados'"
      @click.prevent="loadCSVItems"
      href="#">
        <span class="c-icon c-icon--type-download">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16">
            <path fill="#2D4252" d="M12 5.647H8.571V0H3.43v5.647H0l6 6.588 6-6.588zm-12 8.47V16h12v-1.882H0z"></path>
          </svg>
        </span>
        {{ label }}
    </a>
    <json-excel
      v-else
      :data="csvItems"
      :fields="csvFields"
      :type="csv"
      :name="getNameFromCSV()"
      id="download"
    >
      <span class="c-icon c-icon--type-download">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16">
            <path fill="#2D4252" d="M12 5.647H8.571V0H3.43v5.647H0l6 6.588 6-6.588zm-12 8.47V16h12v-1.882H0z"></path>
          </svg>
        </span>
        {{ label }}
    </json-excel>
  </h5>
</template>

<script>
// import VueCsvDownloader from 'vue-csv-downloader';
import JsonExcel from "vue-json-excel";

export default {
  name: 'CsvDownload',
  components: {
    // VueCsvDownloader,
    JsonExcel,
  },
  props: {
    initiatives: {
      type: Array,
      default: function() { return []; },
    },
    csvItems: Array,
    canDownloadCSV: Boolean,
    csvFields: {
      type: Array,
      default: function() { return ['title', 'reference', 'initiative_type_alt', 'authors', 'deputies', 'tagged.0.topics', 'tagged.0.tags', 'place', 'status',  'created','updated', 'url']; },
    },
    label: {
      type: String,
      default: 'Descarga los datos',
    },
    buttonClass: {
      type: String,
      default: 'c-button--compact',
    },
  },
  methods: {
    loadCSVItems: function(event) {
      this.$emit('loadCSVItems', event);
    },
    getNameFromCSV: function() {
      let d = new Date();
      return "export-" + d.toISOString() + ".csv";
    },
  },
};
</script>

<style scoped lang="scss">
.c-button--secondary {
  margin-right: 16px;
}
</style>
