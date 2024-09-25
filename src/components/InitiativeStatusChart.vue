<template>
  <div>
    <h2>Estado de las iniciativas</h2>
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

Chart.register(ArcElement, Tooltip, Legend);

const { initiativesStats } = defineProps({
  initiativesStats: {
    type: Object,
    required: true,
  },
});

const data = computed(() => ({
  labels: ["Aprobadas", "En proceso", "Rechazadas"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#bab7b6", "#E46651"],
      data: [
        initiativesStats.approved,
        initiativesStats.inProcess,
        initiativesStats.rejected,
      ],
    },
  ],
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-transform: uppercase;
}
</style>
