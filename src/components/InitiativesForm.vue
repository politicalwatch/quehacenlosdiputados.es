<template>
  <form
    id="initiatives-form"
    class="u-margin-bottom-4 u-border-bottom"
    role="form"
    @submit.prevent="getResults($event)"
  >
    <div class="o-grid">
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="topic">Temática</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            @select="fillSubtopicsAndTags"
            @remove="clearSubtopicsAndTags"
            v-model="form.topic"
            :options="topics.map((topic) => topic.name)"
            :allow-empty="true"
            name="topic"
            id="topic"
            placeholder="Todas"
          >
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div
          class="c-select-label u-block"
          :class="{ 'c-select-label--disabled': !this.filteredTags.length }"
        >
          <label for="tags">Etiquetas</label>
          <multiselect
            selectedLabel="Seleccionada"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.tags"
            :multiple="true"
            :options="filteredTags"
            :allow-empty="true"
            :disabled="!this.filteredTags.length"
            :placeholder="
              this.filteredTags.length
                ? 'Todas'
                : 'Selecciona previamente una temática'
            "
            name="tags"
            id="tags"
          >
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-input-label u-block">
          <label for="text">Título y Contenido</label>
          <input
            v-model="form.text"
            type="text"
            id="text"
            name="text"
            placeholder="Texto libre"
          />
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-input-label u-block">
          <label for="reference">Referencia</label>
          <input
            v-model="form.reference"
            type="text"
            id="reference"
            name="reference"
            placeholder="Ej.: 121/000001"
          />
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm u-padding-bottom-4">
        <div class="c-datepicker-label u-block">
          <label for="startdate">Desde</label>
          <VueDatePicker
            v-model="form.startdate"
            locale="es"
            :format="formatDatepickerDate"
            placeholder="dd-mm-yyyy"
            hide-input-icon
            @update:model-value="selectStartDate"
            @cleared="clearStartDate"
            name="startdate"
          />
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm u-padding-bottom-4">
        <div class="c-datepicker-label u-block">
          <label for="enddate">Hasta</label>
          <VueDatePicker
            v-model="form.enddate"
            locale="es"
            :format="formatDatepickerDate"
            placeholder="dd-mm-yyyy"
            :max-date="new Date()"
            hide-input-icon
            @update:model-value="selectEndDate"
            @cleared="clearEndDate"
            name="enddate"
          />
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="status">Estado</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.status"
            :options="status"
            :allow-empty="true"
            name="status"
            id="status"
            placeholder="Cualquiera"
          >
          </multiselect>
        </div>
      </div>
    </div>
    <!-- /.o-grid -->
    <div class="o-grid" v-show="advanced">
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="author_deputies">Diputado/a</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.deputy"
            :options="getDeputies()"
            :allow-empty="true"
            name="deputy"
            id="deputy"
            placeholder="Apellidos, Nombre"
          >
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="author">Grupo</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.author"
            :options="groups.map((group) => group.name || group)"
            :allow-empty="true"
            name="author"
            id="author"
            placeholder="Todos"
          >
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="type">Tipo</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.type"
            :options="getTypes()"
            :allow-empty="true"
            :multiple="true"
            name="type"
            id="type"
            placeholder="Cualquiera"
          >
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="place">Lugar</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.place"
            :options="places"
            :allow-empty="true"
            name="place"
            id="place"
            placeholder="Cualquiera"
          >
          </multiselect>
        </div>
      </div>
    </div>
    <!-- /.o-grid -->
    <div class="o-grid">
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <a
          href="#"
          class="c-button u-padding-left-0"
          @click.prevent="toggleAdvanced"
        >
          <icon icon="advanced" />
          <span v-if="!advanced">Mostrar búsqueda avanzada</span>
          <span v-else>Ocultar búsqueda avanzada</span>
        </a>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4 u-text-right@sm">
        <button
          class="c-button u-padding-left-0 u-margin-right-2"
          @click.prevent="clearInitiatives"
        >
          Limpiar búsqueda
        </button>
        <button class="u-border-link u-uppercase" type="submit">Buscar</button>
      </div>
    </div>
  </form>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Multiselect from "vue-multiselect";
import Icon from "@/components/Icon.vue";
import * as Utils from "@/utils";
import api from "@/api";
import { mapGetters, mapState } from "vuex";

import format from "date-fns/format";

export default {
  name: "InitiativesForm",
  components: {
    VueDatePicker,
    Multiselect,
    Icon,
  },
  props: {
    formData: Object,
  },
  data: function () {
    return {
      subtopics: [],
      tags: [],
      form: {},
      errors: null,
      selectedSubtopics: [],
      filteredTags: [],
      advanced:
        this.formData &&
        (this.formData.startdate ||
          this.formData.enddate ||
          this.formData.status ||
          this.formData.place ||
          this.formData.type ||
          this.formData.reference ||
          this.formData.text),
    };
  },
  computed: {
    ...mapGetters({
      deputies: "allDeputiesName",
      places: "allPlacesName",
      groups: "allParliamentaryGroupsWithGoverment",
      types: "allTypesName",
      getDeputyByName: "getDeputyByName",
      getParliamentaryGroupByName: "getParliamentaryGroupByName",
      getDeputiesByParliamentaryGroup: "getDeputiesByParliamentaryGroup",
    }),
    ...mapState({
      topics: "allTopics",
      status: "allStatus",
    }),
    formattedStartDate: function () {
      return this.form.startdate
        ? format(new Date(this.form.startdate), "dd/MMM/yyyy")
        : undefined;
    },

    formattedEndDate: function () {
      return this.form.enddate
        ? format(new Date(this.form.enddate), "dd/MMM/yyyy")
        : undefined;
    },
  },
  methods: {
    cleanForm: function () {
      this.form.topic = "";
      this.form.subtopics = [];
      this.form.tags = [];
      this.form.author = "";
      this.form.deputy = "";
      this.form.status = "";
      this.form.place = "";
      this.form.type = "";
      this.form.reference = "";
      this.form.enddate = "";
      this.form.startdate = "";
      this.form.text = "";
      this.clearSubtopicsAndTags();
      // //clear url
      this.$router.push({ name: "search" });
    },
    getTypes: function () {
      const options = [];
      for (const type of this.types) {
        options.push("'" + type + "'");
      }
      return options;
    },
    getDeputies: function () {
      const { author } = this.form;
      if (author == "Gobierno") {
        return [];
      }

      if (author) {
        const parliamentaryGroup = this.getParliamentaryGroupByName(author);
        const deputies = this.getDeputiesByParliamentaryGroup(
          parliamentaryGroup.shortname
        );
        return deputies.map((deputy) => deputy.name);
      }

      return this.deputies;
    },
    fillSubtopicsAndTags: function (selectedTopic, clearValues) {
      if (clearValues) {
        this.form.subtopics = [];
        this.form.tags = [];
      }
      const currentTopic = this.topics.find(
        (topic) => topic.name === selectedTopic
      );
      this.getSubtopicsAndTags(currentTopic.id);
    },
    clearSubtopicsAndTags: function () {
      this.subtopics = [];
      this.selectedSubtopics = [];
      this.tags = [];
      this.filteredTags = [];
      this.form.subtopics = [];
      this.form.tags = [];
    },
    clearStartDate: function () {
      this.form.startdate = "";
    },
    clearEndDate: function () {
      this.form.enddate = "";
    },
    selectStartDate: function (date) {
      this.form.startdate = format(new Date(date), "yyyy-MM-dd");
    },
    selectEndDate: function (date) {
      this.form.enddate = format(new Date(date), "yyyy-MM-dd");
    },
    formatDatepickerDate: function (date) {
      return format(new Date(date), "dd/MM/yyyy");
    },
    getSubtopicsAndTags: function (topicID) {
      api
        .getTags(topicID)
        .then((tags) => {
          this.subtopics = [...new Set(tags.map((tag) => tag.subtopic))].sort(
            Utils.naturalSort
          );
          this.tags = tags;
          this.filteredTags = this.tags
            .map((tag) => tag.tag)
            .sort(Utils.naturalSort);
        })
        .catch((error) => (this.errors = error));
    },
    filterTags: function () {
      let filtered = this.selectedSubtopics.length
        ? (tag) => this.selectedSubtopics.indexOf(tag.subtopic) !== -1
        : () => true;
      this.filteredTags = this.tags
        .filter(filtered)
        .map((tag) => tag.tag)
        .sort(Utils.naturalSort);
    },
    addSubtopicToTagsFilter: function (selectedSubtopic) {
      this.form.tags = [];
      this.selectedSubtopics.push(selectedSubtopic);
      this.filterTags();
    },
    removeSubtopicToTagsFilter: function (removedSubtopic) {
      this.form.tags = [];
      this.selectedSubtopics.splice(
        this.selectedSubtopics.indexOf(removedSubtopic),
        1
      );
      this.filterTags();
    },
    getResults: function (event) {
      this.$emit("getResults", event, this.form);
    },
    clearInitiatives: function (event) {
      this.cleanForm();
      this.$emit("clearInitiatives", event);
    },
    prepareForm: function () {
      if (this.form.topic) {
        this.fillSubtopicsAndTags(this.form.topic, false);
      }
    },
    toggleAdvanced: function () {
      this.advanced = !this.advanced;
    },
  },
  created: function () {
    this.form = Object.assign({}, this.formData);
    if (this.topics.length) {
      this.prepareForm();
    }
  },
};
</script>

<style lang="scss">
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
span.multiselect__option--selected {
  span {
    color: white;
  }
}
</style>
