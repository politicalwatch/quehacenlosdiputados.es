<template>
  <div class="c-thematic-priorities">
    <div class="c-thematic-priorities__header">
      <h2>Prioridades temáticas de</h2>
      <select v-model="parliamentaryGroup" class="c-select">
        <option
          v-for="group in parliamentaryGroups"
          :key="group.id"
          :value="group"
        >
          <span class="c-thematic-priorities__group"></span>
          {{ group.name }}
        </option>
      </select>
    </div>
    <Barchart
      :entity="parliamentaryGroup"
      entityType="parliamentarygroup"
      :result="footprintByTopics"
    />
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

    select {
      padding: 0.5rem;
      text-transform: uppercase;
      font-weight: 500;
      border: 2px solid #000;
      color: v-bind(parliamentaryGroupColor);

      &:focus {
        border-color: v-bind(parliamentaryGroupColor);
        outline: none;
      }
    }
  }
}
</style>
