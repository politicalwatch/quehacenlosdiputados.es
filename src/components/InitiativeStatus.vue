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

<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import es from "date-fns/locale/es";
import Icon from "@/components/Icon.vue";

export default {
  name: "InitiativeMeta",
  components: {
    Icon,
  },
  props: {
    initiative: Object,
    mappedStatus: {
      type: Object,
      default: function () {
        return {
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
            "Rechazada",
            "Retirada",
            "Derogada",
            "No celebrada",
          ],
        };
      },
    },
  },
  methods: {
    getColorByStatus: function (status) {
      for (let color in this.mappedStatus) {
        if (this.mappedStatus[color].indexOf(status) != -1) return color;
      }
      return "neutral";
    },
    getIcon: function (initiative) {
      const color = this.getColorByStatus(initiative["status"]);
      const map = { completed: "success", neutral: "clock", error: "denied" };
      return map[color];
    },
    getStateMessage: function (initiative) {
      if (initiative["status"] == "Desconocida") {
        return `${initiative["status"]}`;
      }

      const color = this.getColorByStatus(initiative["status"]);
      let date = initiative["updated"];
      if (color == "neutral") {
        date = initiative["created"];
      }

      const formattedDate = formatDistanceToNow(new Date(date), {
        locale: es,
        addSuffix: true,
      });
      return `${initiative["status"]} ${formattedDate}`;
    },
  },
};
</script>
