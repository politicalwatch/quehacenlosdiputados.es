<template>
  <div id="home" class="o-container u-margin-bottom-10 c-home">
    <div class="o-grid u-margin-bottom-4">
      <div class="o-grid__col u-12">
        <InitiativesFormCompact v-model:formData="formData" />
      </div>
    </div>

    <div class="o-grid u-margin-bottom-4">
      <div class="o-grid__col u-12">
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
    </div>

    <div class="o-grid u-margin-bottom-4">
      <div class="o-grid__col u-12">
        <ApprovedInitiatives
          v-if="approvedInitiatives.length > 0 && isLoaded"
          :initiatives="approvedInitiatives"
        />
        <loader
          v-else
          title="Cargando prioridades temáticas"
          subtitle="Puede llevar algun tiempo"
        />
      </div>
    </div>

    <div class="o-grid u-margin-bottom-4">
      <div class="o-grid__col u-12 u-4@sm">
        <InitiativeStatusChart
          v-if="isLoaded"
          :initiativesStats="initiativesStats"
        />
        <loader
          v-else
          title="Cargando prioridades temáticas"
          subtitle="Puede llevar algun tiempo"
        />
      </div>
      <div class="o-grid__col u-12 u-8@sm">
        <InProcessInitiatives
          :initiatives="inProcessInitiatives"
          :numInitiatives="12"
        />
      </div>
    </div>

    <div class="o-grid u-margin-bottom-4">
      <div class="o-grid__col u-12">
        <LastActivity v-if="lastdays" :lastdays="lastdays" />
        <loader
          v-else
          title="Cargando evolución de los últimos días"
          subtitle="Puede llevar algun tiempo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

import api from "@/api";
import config from "@/config";
import { useParliamentStore } from "@/stores/parliament";
import InitiativesFormCompact from "@/components/InitiativesFormCompact.vue";
import GroupThematicPriorities from "@/components/GroupThematicPriorities.vue";
import ApprovedInitiatives from "@/components/ApprovedInitiatives.vue";
import InProcessInitiatives from "@/components/InProcessInitiatives.vue";
import InitiativeStatusChart from "@/components/InitiativeStatusChart.vue";
import LastActivity from "@/components/LastActivity.vue";
import Loader from "@/components/Loader.vue";

const topicsStyles = config.STYLES.topics;
const store = useParliamentStore();

const isLoaded = ref(false);
const errors = ref(null);

const formData = ref({
  topic: "",
  author: "",
  page: 1,
});

const approvedInitiatives = ref([]);
const inProcessInitiatives = ref([]);
const rejectedInitiatives = ref([]);
const initiativesStats = computed(() => {
  return {
    approved: approvedInitiatives.value.length,
    inProcess: inProcessInitiatives.value.length,
    rejected: rejectedInitiatives.value.length,
  };
});
const lastdays = ref(null);

const per_page = 1000;
const legislativeTypeIds = [
  "120",
  "121",
  "122",
  "123",
  "124",
  "125",
  "127",
  "130",
  "131",
  "132",
];
const legislativeTypeNames = [
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
  const newInitiatives = [];

  const paramsApproved = {
    per_page,
    type: legislativeTypeNames,
    status: "Aprobada",
  };

  const paramsRatified = {
    per_page,
    type: "Real Decreto-Ley",
    status: "Convalidada",
  };

  Promise.all([
    api.getInitiatives(paramsApproved),
    api.getInitiatives(paramsRatified),
  ])
    .then((responses) => {
      responses.forEach((response) => {
        newInitiatives.push(...response.initiatives);
      });
      approvedInitiatives.value = newInitiatives;
    })
    .catch((error) => (errors.value = error));
};

const getInProcessInitiatives = () => {
  const params = {
    per_page,
    type: legislativeTypeNames,
    status: "En tramitación",
  };

  api
    .getInitiatives(params)
    .then((response) => (inProcessInitiatives.value = response.initiatives))
    .catch((error) => (errors.value = error));
};

const getRejectedInitiatives = () => {
  const newInitiatives = [];

  const paramsRejected = {
    per_page,
    type: legislativeTypeNames,
    status: "Rechazada",
  };

  const paramsNotDebated = {
    per_page,
    type: legislativeTypeNames,
    status: "No debatida",
  };

  Promise.all([
    api.getInitiatives(paramsRejected),
    api.getInitiatives(paramsNotDebated),
  ])
    .then((responses) => {
      responses.forEach((response) => {
        newInitiatives.push(...response.initiatives);
      });
      rejectedInitiatives.value = newInitiatives;
    })
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
});

watch(
  () => initiativesStats.value,
  (newValue) => {
    console.log(newValue);
    if (newValue.approved && newValue.inProcess && newValue.rejected)
      isLoaded.value = true;
  }
);
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
