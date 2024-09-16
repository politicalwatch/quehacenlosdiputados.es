<template>
  <div id="deputies" class="o-container o-section u-margin-bottom-10">
    <div v-if="store.birthdays.length > 0">
      <Callout
        closeId="qhld-birthday"
        :checkClosed="checkCalloutClosedDate"
        :closeCallback="getTodayDate"
      >
        <h3 class="u-uppercase">Hoy es el cumpleaños de...</h3>
        <CardGrid :items="store.birthdays" type="deputy" layout="large" />
      </Callout>
    </div>
    <PageHeader title="Listado de diputados" />
    <DeputiesForm
      :deputies="store.allDeputies"
      :groups="getGroupsLongNames"
      @setFilters="setFilters"
      :ranking="getRanking"
    />
    <Loader
      v-if="store.allDeputies.length == 0"
      title="Cargando diputados"
      subtitle="Puede llevar algun tiempo"
    />
    <CardGrid
      v-bind:key="filters['footprint']"
      :items="getFilteredDeputies"
      type="deputy"
      layout="large"
      :extra="{ footprint: getSelectedFootprint }"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import DeputiesForm from "@/components/DeputiesForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import Loader from "@/components/Loader.vue";
import CardGrid from "@/components/CardGrid.vue";
import Callout from "@/components/Callout.vue";
import { useParliamentStore } from "@/stores/parliament";

const store = useParliamentStore();

const filters = ref({});

const getGroupsLongNames = computed(() => {
  return store.allParliamentaryGroups.map((group) => group.name || group);
});

const getGroupShortName = (longname) => {
  const group = store.allParliamentaryGroups
    .filter((group) => group["name"] == longname)
    .pop();
  return group["shortname"].toUpperCase();
};

const setFilters = (updatedFilters) => {
  filters.value = updatedFilters;
};

const getFilteredDeputies = computed(() => {
  let filteredDeputies = store.allDeputies;

  if (
    "constituency" in filters.value &&
    filters.value["constituency"] != null
  ) {
    filteredDeputies = filteredDeputies.filter(
      (deputy) => deputy["constituency"] == filters.value["constituency"]
    );
  }

  if ("group" in filters.value && filters.value["group"] != null) {
    filteredDeputies = filteredDeputies.filter(
      (deputy) =>
        deputy["parliamentarygroup"].toUpperCase() ==
        getGroupShortName(filters.value["group"])
    );
  }

  if ("name" in filters.value && filters.value["name"] != null) {
    const regex = new RegExp(".*" + filters.value["name"] + ".*", "i");
    filteredDeputies = filteredDeputies.filter((deputy) =>
      regex.test(deputy["name"])
    );
  }

  if ("footprint" in filters.value && filters.value["footprint"] != undefined) {
    const footprint_sort = filters.value["footprint"];

    const updated_list = [...filteredDeputies].sort((a, b) => {
      const a_footprint_filter = a.footprint_by_topics.filter(
        (item) => item.name == footprint_sort
      );
      const a_footprint =
        a_footprint_filter.length > 0 ? a_footprint_filter[0].score : 0;
      const b_footprint_filter = b.footprint_by_topics.filter(
        (item) => item.name == footprint_sort
      );
      const b_footprint =
        b_footprint_filter.length > 0 ? b_footprint_filter[0].score : 0;

      return b_footprint - a_footprint;
    });

    return updated_list;
  }
  return [...filteredDeputies].sort((a, b) => {
    const a_name = prepareForSorting(a.name);
    const b_name = prepareForSorting(b.name);

    return a_name.localeCompare(b_name);
  });
});

const getRanking = computed(() => {
  const ranking = [];
  for (const item of store.allTopics) {
    ranking.push(item.name);
  }

  return ranking;
});

const getSelectedFootprint = computed(() => {
  const footprint_sort = filters.value["footprint"];
  if (footprint_sort == undefined) {
    return "General";
  }
  return footprint_sort;
});

const prepareForSorting = (name) => {
  const clean_name = name
    .toUpperCase()
    .replace("Á", "A")
    .replace("É", "E")
    .replace("Í", "I")
    .replace("Ó", "O")
    .replace("Ú", "U")
    .replace("Ñ", "NZ");

  return clean_name;
};

const checkCalloutClosedDate = () => {
  const savedDate = localStorage.getItem("qhld-birthday-closed");
  if (!savedDate) {
    return false;
  }

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return savedDate === formattedToday;
};

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
};
</script>
