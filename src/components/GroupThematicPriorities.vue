<template>
  <div class="c-thematic-priorities">
    <div class="c-thematic-priorities__header">
      <h2>Prioridades temáticas de</h2>
      <div class="c-thematic-priorities__selector">
        <div class="c-thematic-priorities__selector-group"></div>
        <select v-model="parliamentaryGroup" class="c-select">
          <option
            v-for="group in parliamentaryGroups"
            :key="group.id"
            :value="group"
          >
            {{ group.name }}
          </option>
        </select>
      </div>
    </div>
    <Barchart
      :entity="parliamentaryGroup"
      entityType="parliamentarygroup"
      :result="footprintByTopics"
      :maxValue="store.footprintParliamentaryGroupMax"
    />
    <p>
      El tamaño de la barra es relativo al valor de huella máximo para todos los
      grupos parlamentarios.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { useParliamentStore } from "@/stores/parliament";
import Barchart from "@/components/Barchart.vue";

const store = useParliamentStore();

const { parliamentaryGroups } = defineProps({
  parliamentaryGroups: {
    type: Array,
    required: true,
  },
});

const parliamentaryGroup = ref(
  parliamentaryGroups[Math.floor(Math.random() * parliamentaryGroups.length)]
);

const parliamentaryGroupColor = computed(() => {
  if (parliamentaryGroup.value) {
    return parliamentaryGroup.value.color;
  }
  return "#000";
});

const footprintByTopics = computed(() => {
  if (parliamentaryGroup.value) {
    return parliamentaryGroup.value.footprint_by_topics
      .filter((item) =>
        store.allTopics.some((topic) => topic.name === item.name)
      )
      .filter((item) => item.score > 0)
      .slice(0, 5);
  }
  return [];
});
</script>

<style lang="scss" scoped>
.c-thematic-priorities {
  h2 {
    text-transform: uppercase;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 0;
    }
  }

  &__selector {
    position: relative;
    select {
      padding: 0.5rem 4rem 0.5rem 2.5rem;
      text-transform: uppercase;
      font-weight: 500;
      border: 2px solid #000;
      color: v-bind(parliamentaryGroupColor);
      appearance: none;
      background: url("/assets/svg/icon-chevron-down.svg") no-repeat right
        0.5rem center;
      background-size: 1rem; /* Adjust size as needed */
      padding-right: 2rem; /* Add space for the custom arrow */

      &:focus {
        border-color: v-bind(parliamentaryGroupColor);
        outline: none;
      }
    }
  }

  &__selector-group {
    position: absolute;
    top: 9px;
    left: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: v-bind(parliamentaryGroupColor);
  }
}
</style>
