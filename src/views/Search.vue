<template>
  <div>
    <div id="search" class="o-container o-section u-margin-bottom-10">
      <page-header :title="'Buscador de iniciativas'" />

      <initiatives-form
        v-model:formData="this.formData"
        @getResults="getResults"
        @clearInitiatives="clearInitiatives"
      />

      <div v-if="initiatives.length > 0">
        <div class="o-grid o-grid--align-center u-margin-bottom-4" id="results">
          <div class="o-grid__col o-grid__col--fill">
            <h2 class="u-uppercase" v-if="this.query_meta.page">
              {{ message.message }}
            </h2>
            <csv-download
              :initiatives="initiatives || []"
              :csvItems="csvItems"
              :canDownloadCSV="canDownloadCSV"
              @loadCSVItems="loadCSVItems"
            />
          </div>
          <div class="o-grid__col o-grid__col--right">
            <AlertButton
              :searchparams="formData"
              v-if="use_alerts && this.query_meta.page"
            />
          </div>
        </div>
        <results
          :loadingResults="loadingResults"
          :initiatives="initiatives || []"
          :topicsStyles="topicsStyles"
          :queryMeta="query_meta"
          @loadMore="loadMore"
        />
      </div>

      <div
        v-if="initiatives.length == 0 && !cleanedForm && !loadingResults"
        id="results"
        class="u-padding-top-6 u-text-center"
      >
        <not-found
          message="No se han encontrado resultados. Crea una alerta y te avisaremos."
        />
        <AlertButton
          :searchparams="formData"
          v-if="use_alerts && this.query_meta.page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InitiativesForm from "@/components/InitiativesForm.vue";
import AlertButton from "@/components/AlertButton.vue";
import config from "@/config";
import api from "@/api";
import PageHeader from "@/components/PageHeader.vue";
import CsvDownload from "@/components/CsvDownload.vue";
import Message from "@/components/Message.vue";
import Results from "@/components/Results.vue";
import NotFound from "@/components/NotFound.vue";
import { nextTick } from "vue";
import qs from "qs";
import VueScrollTo from "vue-scrollto";
import { useParliamentStore } from "@/stores/parliament";

export default {
  name: "search",
  components: {
    AlertButton,
    InitiativesForm,
    PageHeader,
    Results,
    NotFound,
    Message,
    CsvDownload,
  },
  setup() {
    const store = useParliamentStore();
    return { store };
  },
  data: function () {
    return {
      errors: null,
      initiatives: [],
      query_meta: {},
      formData: {
        topic: "",
        author: "",
        deputy: "",
        startdate: "",
        enddate: "",
        place: "",
        reference: "",
        page: 1,
        tags: [],
        subtopics: [],
      },
      loadingResults: false,
      csvItems: [],
      LIMITCSV: 20000,
      use_alerts: config.USE_ALERTS,
      topicsStyles: config.STYLES.topics,
      scrollToID: "#results",
      cleanedForm: true,
    };
  },
  computed: {
    canDownloadCSV: function () {
      return this.query_meta.total < this.LIMITCSV;
    },
    message: function () {
      if (this.errors) {
        return { icon: true, type: "error", message: this.errors };
      }
      if (this.query_meta.total) {
        return {
          icon: true,
          type: "success",
          message: `Se han encontrado ${this.query_meta.total} iniciativas`,
        };
      }
      return {
        icon: true,
        type: "error",
        message: `No se han encontrado iniciativas que cumplan los criterios`,
      };
    },
  },
  methods: {
    getResults: function (event) {
      this.loadingResults = true;
      this.cleanedForm = false;
      this.csvItems = [];
      const isNewSearch = event?.type === "submit";
      const params =
        this.$route.params.data && !isNewSearch
          ? qs.parse(this.$route.params.data)
          : this.formData;
      this.formData = Object.assign(this.formData, params);
      const urlParams = Object.assign({}, this.formData);

      if (isNewSearch) {
        this.scrollToID = "#results";
        event.preventDefault();
      }

      Object.keys(urlParams).forEach(
        (key) => (!urlParams[key] || key === "page") && delete urlParams[key]
      );

      this.$router
        .push({
          name: "results",
          params: {
            data: qs.stringify(urlParams, { arrayFormat: "repeat" }),
          },
        })
        .catch((e) => e);

      api
        .getInitiatives(this.formData)
        .then((response) => {
          if (!isNewSearch) {
            this.initiatives.push.apply(this.initiatives, response.initiatives);
          } else {
            this.initiatives = response.initiatives;
          }
          this.query_meta = response.query_meta;
          this.loadingResults = false;
          nextTick().then(() => {
            VueScrollTo.scrollTo(this.scrollToID, 1500);
          });
        })
        .catch((error) => (this.errors = error));
    },
    clearInitiatives: function () {
      this.initiatives = [];
      this.cleanedForm = true;
    },
    loadMore: function () {
      let node = document.querySelectorAll(".c-initiative-card");
      node = node[node.length - 1];
      this.scrollToID = `#${node.id}`;
      this.formData.page++;
      this.getResults();
    },
    loadCSVItems: function (event) {
      if (!this.canDownloadCSV) return false;
      event.target.innerText = "Procesando descarga...";
      let params = Object.assign({ per_page: this.LIMITCSV }, this.formData);
      api
        .getInitiatives(params)
        .then((response) => {
          this.csvItems = response.initiatives.map((initiative) => ({
            ...initiative,
            topics: initiative.tagged[0].topics.join(", "),
            tags: initiative.tagged[0].tags.map((tag) => tag.tag).join(", "),
          }));
          event.target.innerText = "Descargar resultados";
        })
        .catch((error) => (this.errors = error));
    },
  },
  created: function () {
    if (this.$route.name == "results") {
      this.getResults();
    }
  },
  updated: function () {
    if (document.getElementById("downloadCSV")) {
      document.getElementById("downloadCSV").click();
    }
  },
};
</script>
