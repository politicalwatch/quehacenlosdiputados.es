<template>
  <div
    id="parliamentarygroups"
    class="o-container o-section u-margin-bottom-10"
  >
    <page-header title="Grupos parlamentarios" />
    <loader
      v-if="!isLoaded()"
      title="Cargando grupos parlamentarios"
      subtitle="Puede llevar algun tiempo"
    />
    <CardGrid
      :items="this.store.allParliamentaryGroups"
      type="parliamentarygroup"
      layout="medium"
    />
  </div>
</template>

<script>
import CardGrid from "@/components/CardGrid.vue";
import Loader from "@/components/Loader.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useParliamentStore } from "@/stores/parliament";

export default {
  name: "parliamentarygroups",
  components: {
    CardGrid,
    Loader,
    PageHeader,
  },
  setup() {
    const store = useParliamentStore();
    return { store };
  },
  methods: {
    isLoaded: function () {
      return this.store.allParliamentaryGroups?.length > 0;
    },
  },
};
</script>
