<template>
  <div id="home" class="o-container u-margin-bottom-10 c-home">
    <div>
      <GroupThematicPriorities
        v-if="store.allParliamentaryGroups.length > 0"
        :parliamentaryGroups="store.allParliamentaryGroups"
      />
      <loader
        v-else
        title="Cargando prioridades temáticas"
        subtitle="Puede llevar algun tiempo"
      />
    </div>
    <div>
      <LastActivity v-if="lastdays" :lastdays="lastdays" />
      <loader
        v-else
        title="Cargando evolución de los últimos días"
        subtitle="Puede llevar algun tiempo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import api from "@/api";
import config from "@/config";
import { useParliamentStore } from "@/stores/parliament";
import GroupThematicPriorities from "@/components/GroupThematicPriorities.vue";
import LastActivity from "@/components/LastActivity.vue";
import Loader from "@/components/Loader.vue";

const topicsStyles = config.STYLES.topics;
const store = useParliamentStore();

const isLoaded = ref(false);
const errors = ref(null);

const approvedInitiatives = ref([]);
const inProcessInitiatives = ref([]);
const rejectedInitiatives = ref([]);
const lastdays = ref(null);

const per_page = 1000;
const legislativeInitiativeTypes = [
  "Iniciativa legislativa popular",
  "Proyecto de ley",
  "Proposición de ley de Grupos Parlamentarios del Congreso",
  "Proposición de ley de Diputados",
  "Proposición de ley del Senado",
  "Proposición de ley de Comunidades y Ciudades Autónomas",
  "Propuesta de reforma de Estatuto de Autonomía",
  "Real Decreto-Ley",
  "Real Decreto legislativo en desarrollo de Ley de Bases",
  "Real Decreto legislativo que aprueba texto refundido",
];

const getApprovedInitiatives = () => {
  const params = {
    per_page,
    type: legislativeInitiativeTypes,
    status: "Aprobada",
  };

  api
    .getInitiatives(params)
    .then((response) => (approvedInitiatives.value = response))
    .catch((error) => (errors.value = error));
};

const getInProcessInitiatives = () => {
  const params = {
    per_page,
    type: legislativeInitiativeTypes,
    status: "En tramitación",
  };

  api
    .getInitiatives(params)
    .then((response) => (inProcessInitiatives.value = response.initiatives))
    .catch((error) => (errors.value = error));
};

const getRejectedInitiatives = () => {
  const paramsRejected = {
    per_page,
    type: legislativeInitiativeTypes,
    status: "Rechazada",
  };

  const paramsNotDebated = {
    per_page,
    type: legislativeInitiativeTypes,
    status: "No debatida",
  };

  api
    .getInitiatives(paramsRejected)
    .then(
      (response) =>
        (rejectedInitiatives.value = [
          ...rejectedInitiatives.value,
          ...response.initiatives,
        ])
    )
    .catch((error) => (errors.value = error));

  api
    .getInitiatives(paramsNotDebated)
    .then(
      (response) =>
        (rejectedInitiatives.value = [
          ...rejectedInitiatives.value,
          ...response.initiatives,
        ])
    )
    .catch((error) => (errors.value = error));
};

const getLastdays = () => {
  api
    .getLastdaysStats()
    .then((response) => (lastdays.value = response))
    .catch((error) => (errors.value = error));
};

onMounted(() => {
  getApprovedInitiatives();
  getInProcessInitiatives();
  getRejectedInitiatives();
  getLastdays();
  isLoaded.value = true;
});
</script>

<style lang="scss" scoped>
.c-home {
  &__initiatives {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_title {
      margin: 0 auto;

      @media (min-width: $sm) {
        margin: 0;
      }
    }
  }
}
</style>
