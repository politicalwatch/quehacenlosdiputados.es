<template>
  <div class="o-section c-last-activity">
    <h1 class="u-uppercase">Iniciativas en los últimos 15 días</h1>
    <h4 class="u-uppercase u-hide u-inline@sm">
      Últimas iniciativas presentadas en el Congreso de los Diputados
    </h4>
    <div v-for="type in types" class="c-last-activity__stat">
      <h1 class="c-last-activity__number">
        <icon :icon="lastdays[type].trend" />{{ lastdays[type].initiatives }}
      </h1>
      <h4 class="c-last-activity__type u-uppercase">{{ titles[type] }}</h4>
      <span class="c-last-activity__description">{{ descriptions[type] }}</span>
      <!-- <a class="u&#45;border&#45;link u&#45;uppercase" :href="getLink(type)">Consultar</a> -->
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { lastdays } = defineProps({
  lastdays: {
    type: Object,
    required: true,
  },
});

const types = ["legislative", "orientation", "oversight"];
const titles = {
  legislative: "legislativas",
  orientation: "de orientación política",
  oversight: "de control",
};
const descriptions = {
  legislative:
    "Los diputados y diputadas tienen la capacidad de proponer y aprobar leyes, así como de ratificar y convalidar leyes a propuesta del Gobierno.",
  orientation:
    "Los grupos parlamentarios pueden orientar políticamente al Gobierno a través de la aprobación de iniciativas, que no son legalmente vinculantes.",
  oversight:
    "Los grupos parlamentarios controlan la labor del Gobierno a través de preguntas y de la solicitud de informes y comparecencias.",
};

const getLink = function (type) {
  return "/buscar";
};
</script>
