<template>
  <div
    id="constituency"
    class="o-container o-section u-margin-bottom-10"
  >
    <page-header :title="constituency" />
    <loader
      v-if="!isLoaded"
      title="Cargando datos de la provincia"
      subtitle="Puede llevar algun tiempo"
    />
    <CardGrid
      :items="getFilteredDeputies"
      type="deputy"
      layout="large"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useParliamentStore } from "@/stores/parliament";
import config from "@/config";

import Loader from "@/components/Loader.vue";
import PageHeader from "@/components/PageHeader.vue";
import CardGrid from "@/components/CardGrid.vue";

const route = useRoute();
const store = useParliamentStore();
const { allDeputies, allParliamentaryGroups } =
  storeToRefs(store);

const constituency = ref(null);

const isLoaded = computed(() => allDeputies.value?.length > 0);

const getConstituencyName = () => {
  constituency.value = config.CONSTITUENCIES.find(c => c.slug === route.params.id)?.name || null;
};

const getFilteredDeputies = computed(() =>
  allDeputies.value.filter(d => d.constituency == constituency.value).filter(d => d.active)
);

onMounted(() => {
  getConstituencyName()
});

</script>
