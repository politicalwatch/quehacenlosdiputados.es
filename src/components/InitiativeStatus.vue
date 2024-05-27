<template>
  <div class="c-initiative-status">
    <div
      :class="`c-initiative-status__icon c-initiative-status__icon--${getColorByStatus(
        initiative.status
      )}`"
    >
      <icon :icon="getIcon(initiative)" />
    </div>
    <div class="c-initiative-status__message">
      {{ getStateMessage(initiative) }}
    </div>
  </div>
</template>

<script setup>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import es from "date-fns/locale/es";
import Icon from "@/components/Icon.vue";

const { initiative, mappedStatus } = defineProps({
  initiative: { type: Object, required: true },
  mappedStatus: {
    type: Object,
    default: () => ({
      completed: [
        "Aprobada",
        "Respondida",
        "Celebrada",
        "Convalidada",
        "Convertida en otra",
        "Acumulada en otra",
      ],
      neutral: ["En tramitación", "Desconocida"],
      error: [
        "No admitida a trámite",
        "No debatida",
        "Caducada",
        "Rechazada",
        "Retirada",
        "Derogada",
        "No celebrada",
      ],
    }),
  },
});

const getColorByStatus = (status) => {
  for (let color in mappedStatus) {
    if (mappedStatus[color].indexOf(status) != -1) return color;
  }
  return "neutral";
};

const getIcon = (initiative) => {
  const color = getColorByStatus(initiative["status"]);
  const map = { completed: "success", neutral: "clock", error: "denied" };
  return map[color];
};

const getStateMessage = (initiative) => {
  if (initiative["status"] == "Desconocida") {
    return `${initiative["status"]}`;
  }

  const color = getColorByStatus(initiative["status"]);
  let date = initiative["updated"];
  if (color == "neutral") {
    date = initiative["created"];
  }

  const formattedDate = formatDistanceToNow(new Date(date), {
    locale: es,
    addSuffix: true,
  }).replace("alrededor de ", "");
  return `${initiative["status"]} ${formattedDate}`;
};
</script>
