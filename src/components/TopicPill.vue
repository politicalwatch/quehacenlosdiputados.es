<template>
  <div class="c-topics">
    <span v-html="getTopics()" />
    <div
      v-if="limit && limit < topics.length"
      class="c-topics__topic c-topics__topic__small"
      style="background-color: #a3d5c8"
    >
      <icon icon="mdi:dots-horizontal" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

import * as Utils from "@/utils";

const { topics, topicsStyles, withLinks, limit } = defineProps({
  topics: {
    type: Array,
    default: () => [],
  },
  topicsStyles: {
    type: Object,
  },
  withLinks: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
  },
});

const getTopics = () => {
  let topicsArray = topics;
  if (limit) {
    topicsArray = topicsArray.slice(0, limit);
  }
  if (topicsStyles && topicsArray.length) {
    return topicsArray
      .slice()
      .sort(Utils.naturalSort)
      .map((element, i) => {
        if (withLinks) {
          return `
          <a href="#topic-${i}" class="c-topics__topic c-topics__topic__small" style="background-color:${topicsStyles[element]?.color}">
            ${topicsStyles[element]?.shortname}
          </a>
        `;
        } else {
          return `
          <div class="c-topics__topic c-topics__topic__small" style="background-color:${topicsStyles[element]?.color}">
            ${topicsStyles[element]?.shortname}
          </div>
        `;
        }
      })
      .join("");
  }
  return topicsArray.length ? topicsArray.join("<br/>") : "";
};
</script>

<style lang="scss">
.c-icon--type-more {
  svg {
    path {
      fill: $secondary-dark;
    }
  }
}
</style>
