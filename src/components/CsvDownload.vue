<template>
  <h5 class="u-uppercase c-csv-download" v-show="initiatives.length">
    <a
      v-if="!csvItems.length"
      :class="{ disabled: !canDownloadCSV }"
      :title="
        !canDownloadCSV
          ? 'Demasiados resultados para poder descargar. Afina la búsqueda'
          : 'Descarga CSV con todos los resultados'
      "
      @click.prevent="loadCSVItems"
      href="#"
    >
      <span class="c-icon c-icon--type-download">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="16"
          fill="none"
          viewBox="0 0 12 16"
        >
          <path
            fill="#2D4252"
            d="M12 5.647H8.571V0H3.43v5.647H0l6 6.588 6-6.588zm-12 8.47V16h12v-1.882H0z"
          ></path>
        </svg>
      </span>
      {{ label }}
    </a>
    <json-excel
      v-else
      :data="csvItems"
      :fields="csvFields"
      type="csv"
      :name="getNameFromCSV()"
      id="downloadCSV"
    >
      <span class="c-icon c-icon--type-download">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="16"
          fill="none"
          viewBox="0 0 12 16"
        >
          <path
            fill="#2D4252"
            d="M12 5.647H8.571V0H3.43v5.647H0l6 6.588 6-6.588zm-12 8.47V16h12v-1.882H0z"
          ></path>
        </svg>
      </span>
      {{ label }}
    </json-excel>
  </h5>
</template>

<script setup>
import JsonExcel from "vue-json-excel3";

const { initiatives, csvItems, canDownloadCSV, csvFields, label, buttonClass } =
  defineProps({
    initiatives: {
      type: Array,
      default: () => [],
    },
    csvItems: Array,
    canDownloadCSV: Boolean,
    csvFields: {
      type: Object,
      default: () => ({
        title: "title",
        reference: "reference",
        initiative_type_alt: "initiative_type_alt",
        authors: "authors",
        deputies: "deputies",
        topics: "topics",
        tags: "tags",
        place: "place",
        status: "status",
        created: "created",
        updated: "updated",
        url: "url",
      }),
    },
    label: {
      type: String,
      default: "Descarga los datos",
    },
    buttonClass: {
      type: String,
      default: "c-button--compact",
    },
  });

const emit = defineEmits(["loadCSVItems"]);

const loadCSVItems = (event) => {
  emit("loadCSVItems", event);
};

const getNameFromCSV = () => {
  let d = new Date();
  return "export-" + d.toISOString() + ".csv";
};
</script>

<style scoped lang="scss">
.c-button--secondary {
  margin-right: 16px;
}
</style>
