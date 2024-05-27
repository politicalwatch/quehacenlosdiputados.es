<template>
  <div class="o-grid c-card_grid">
    <div :class="classes" v-for="item in items" v-bind:key="item.id">
      <ParliamentaryGroupCard
        :parliamentaryGroup="item"
        v-if="isParliamentaryGroup()"
        :layout="layout"
      />
      <deputy-card
        v-if="isDeputy()"
        :deputy="item"
        :layout="layout"
        :footprint="getDeputyExtra()"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import ParliamentaryGroupCard from "@/components/ParliamentaryGroupCard.vue";
import DeputyCard from "@/components/DeputyCard.vue";

const { items, type, layout, extra } = defineProps({
  items: { type: Array },
  type: { type: String },
  layout: { type: String },
  extra: { type: Object },
});

const isDeputy = () => type == "deputy";
const isParliamentaryGroup = () => type == "parliamentarygroup";
const getDeputyExtra = () => {
  if (extra === undefined) return "General";
  if ("footprint" in extra) {
    return extra["footprint"];
  }
  return "General";
};

const classes = computed(() => {
  return (
    "o-grid__col u-12 u-4@sm c-card_grid__item c-card_grid__item__" +
    type +
    " c-card_grid__" +
    layout
  );
});
</script>
