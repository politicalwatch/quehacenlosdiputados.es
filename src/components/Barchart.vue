<template>
  <TransitionGroup tag="div" class="c-barchart" name="barfade">
    <div class="c-barchart__row" v-for="d in rows" :key="d.name">
      <div class="c-barchart__name u-text-th4 u-uppercase">{{ d.name }}</div>

      <div class="c-barchart__more">
        <RouterLink
          :to="{
            name: 'results',
            params: { data: paramsData(d.name, entity) },
          }"
          class="u-border-link u-uppercase"
        >
          Consultar
        </RouterLink>
      </div>

      <div class="c-barchart__bar">
        <div class="c-barchart__backbar" :style="d.backbarStyle"></div>
        <div class="c-barchart__overbar" :style="d.overbarStyle"></div>
        <div class="c-barchart__score u-text-th3">{{ d.score }}</div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref, toRefs, onMounted, watch } from "vue";
import qs from "qs";

const props = defineProps({
  result: {
    type: Array,
    required: true,
    default: () => [],
  },
  barHeight: {
    type: Number,
    required: false,
    default: 56,
  },
  barGap: {
    type: Number,
    required: false,
    default: 24,
  },
  barColor: {
    type: String,
    required: false,
    default: "#efca53",
  },
  barBackgroundColor: {
    type: String,
    required: false,
    default: "#f3f3f3",
  },
  entity: {
    type: Object,
    required: true,
  },
  entityType: {
    type: String,
    requred: true,
  },
});

const {
  result,
  barHeight,
  barGap,
  barColor,
  barBackgroundColor,
  entity,
  entityType,
} = toRefs(props);

const rows = ref([]);

const calculateRows = () => {
  const tempRows = [];
  const max = result.value[0].score;
  result.value.forEach((d) => {
    tempRows.push({
      name: d.name,
      score: d.score,
      backbarStyle: {
        height: `${barHeight.value}px`,
        backgroundColor: barBackgroundColor.value,
      },
      overbarStyle: {
        height: `${barHeight.value}px`,
        width: `${(d.score / max) * 100}%`,
        backgroundColor: barColor.value,
      },
    });
  });

  rows.value = tempRows;
};

const getFieldToSearch = () => {
  if (entityType.value == "deputy") return "deputy";
  if (entityType.value == "parliamentarygroup") return "author";
  return "";
};

const paramsData = (topic, entity) => {
  return qs.stringify({
    topic: topic,
    [getFieldToSearch()]: entity["name"],
  });
};

onMounted(() => {
  calculateRows();
});

watch(result, () => {
  calculateRows();
});
</script>
