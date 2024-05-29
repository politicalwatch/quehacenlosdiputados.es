<template>
  <form
    id="initiatives-form"
    class="c-initiatives-form u-margin-bottom-4 u-border-bottom"
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
            v-model="formData.topic"
            :options="store.allTopics.map((topic) => topic.name)"
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
          :class="{ 'c-select-label--disabled': !filteredTags.length }"
        >
          <label for="tags">Etiquetas</label>
          <multiselect
            selectedLabel="Seleccionada"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="formData.tags"
            :multiple="true"
            :options="filteredTags"
            :allow-empty="true"
            :hide-selected="true"
            :disabled="!filteredTags.length"
            :placeholder="
              filteredTags.length
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
            v-model="formData.text"
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
            v-model="formData.reference"
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
            v-model="formData.startdate"
            locale="es"
            :format="formatDatepickerDate"
            placeholder="dd/mm/yyyy"
            hide-input-icon
            auto-apply
            @update:model-value="selectStartDate"
            @cleared="clearStartDate"
            :text-input="textInputOptions"
            name="startdate"
          />
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm u-padding-bottom-4">
        <div class="c-datepicker-label u-block">
          <label for="enddate">Hasta</label>
          <VueDatePicker
            v-model="formData.enddate"
            locale="es"
            :format="formatDatepickerDate"
            placeholder="dd/mm/yyyy"
            :max-date="new Date()"
            hide-input-icon
            auto-apply
            @update:model-value="selectEndDate"
            @cleared="clearEndDate"
            :text-input="textInputOptions"
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
            v-model="formData.status"
            :options="store.allStatus"
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
            v-model="formData.deputy"
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
            v-model="formData.author"
            :options="
              store.getAllParliamentaryGroupsWithGoverment.map(
                (group) => group.name || group
              )
            "
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
            v-model="formData.type"
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
            v-model="formData.place"
            :options="store.getAllPlacesName"
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

<script setup>
import { ref, toRefs, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Multiselect from "vue-multiselect";
import Icon from "@/components/Icon.vue";
import * as Utils from "@/utils";
import api from "@/api";
import { useParliamentStore } from "@/stores/parliament";

import format from "date-fns/format";

const props = defineProps({
  formData: Object,
});

const { formData } = toRefs(props);

const emit = defineEmits(["getResults", "clearInitiatives"]);

const router = useRouter();
const store = useParliamentStore();
const textInputOptions = {
  enterSubmit: true,
  tabSubmit: true,
  selectOnFocus: true,
  format: "dd/MM/yyyy",
};

const subtopics = ref([]);
const tags = ref([]);
const errors = ref(null);
const selectedSubtopics = ref([]);
const filteredTags = ref([]);
const advanced = ref(
  formData.value &&
    (formData.value.startdate ||
      formData.value.enddate ||
      formData.value.status ||
      formData.value.place ||
      formData.value.type ||
      formData.value.reference ||
      formData.value.text)
);

const formattedStartDate = computed(() => {
  return formData.value.startdate
    ? format(new Date(formData.value.startdate), "dd/MMM/yyyy")
    : undefined;
});

const formattedEndDate = computed(() => {
  return formData.value.enddate
    ? format(new Date(formData.value.enddate), "dd/MMM/yyyy")
    : undefined;
});

const cleanForm = () => {
  formData.value = {
    topic: "",
    subtopics: [],
    tags: [],
    author: "",
    deputy: "",
    status: "",
    place: "",
    type: "",
    reference: "",
    enddate: "",
    startdate: "",
    text: "",
  };
  clearSubtopicsAndTags();
  // //clear url
  router.push({ name: "search" });
};

const getTypes = () => {
  const options = [];
  for (const type of store.getAllTypesName) {
    options.push(type);
  }
  return options;
};

const getDeputies = () => {
  const { author } = formData.value;
  if (author == "Gobierno") {
    return [];
  }

  if (author) {
    const parliamentaryGroup = store.getParliamentaryGroupByName(author);
    const deputies = store.getDeputiesByParliamentaryGroup(
      parliamentaryGroup.shortname
    );
    return deputies.map((deputy) => deputy.name);
  }

  return store.getAllDeputiesName;
};

const fillSubtopicsAndTags = (selectedTopic, clearValues) => {
  if (clearValues) {
    formData.value.subtopics = [];
    formData.value.tags = [];
  }
  const currentTopic = store.allTopics.find(
    (topic) => topic.name === selectedTopic
  );
  getSubtopicsAndTags(currentTopic.id);
};

const getResults = (event) => {
  emit("getResults", event);
};

const clearInitiatives = (event) => {
  cleanForm();
  emit("clearInitiatives", event);
};

const clearSubtopicsAndTags = () => {
  subtopics.value = [];
  selectedSubtopics.value = [];
  tags.value = [];
  filteredTags.value = [];
  formData.value.subtopics = [];
  formData.value.tags = [];
};

const clearStartDate = () => {
  formData.value.startdate = "";
};

const clearEndDate = () => {
  formData.value.enddate = "";
};

const selectStartDate = (date) => {
  formData.value.startdate = format(new Date(date), "yyyy-MM-dd");
};

const selectEndDate = (date) => {
  formData.value.enddate = format(new Date(date), "yyyy-MM-dd");
};

const prepareForm = () => {
  if (formData.value.topic) {
    fillSubtopicsAndTags(formData.value.topic, false);
  }
};

const getSubtopicsAndTags = (topicID) => {
  api
    .getTags(topicID)
    .then((tempTags) => {
      subtopics.value = [...new Set(tempTags.map((tag) => tag.subtopic))].sort(
        Utils.naturalSort
      );
      tags.value = tempTags;
      filteredTags.value = tags.value
        .map((tag) => tag.tag)
        .sort(Utils.naturalSort);
    })
    .catch((error) => (errors.value = error));
};

const filterTags = () => {
  let filtered = selectedSubtopics.value.length
    ? (tag) => selectedSubtopics.value.indexOf(tag.subtopic) !== -1
    : () => true;
  filteredTags.value = tags.value
    .filter(filtered)
    .map((tag) => tag.tag)
    .sort(Utils.naturalSort);
};

const addSubtopicToTagsFilter = (selectedSubtopic) => {
  formData.value.tags = [];
  selectedSubtopics.value.push(selectedSubtopic);
  filterTags();
};

const removeSubtopicToTagsFilter = (removedSubtopic) => {
  formData.value.tags = [];
  selectedSubtopics.value.splice(
    selectedSubtopics.value.indexOf(removedSubtopic),
    1
  );
  filterTags();
};

const formatDatepickerDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

const toggleAdvanced = () => {
  advanced.value = !advanced.value;
};

onMounted(() => {
  if (store.allTopics.length) {
    prepareForm();
  }
});
</script>

<style lang="scss">
.c-initiatives-form {
  .o-grid {
    align-items: start;
  }
}

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
