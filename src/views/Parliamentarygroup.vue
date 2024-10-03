<template>
  <div>
    <div
      v-if="parliamentarygroup"
      id="group"
      class="o-container o-section u-margin-bottom-10"
    >
      <ParliamentaryGroupCard
        :parliamentaryGroup="parliamentarygroup"
        layout="large"
      />

      <div class="o-container" v-if="parliamentarygroup">
        <h2 class="u-uppercase u-margin-bottom-4 u-text-center u-text-left@md">
          Radiografía
        </h2>
        <div class="o-grid">
          <div class="o-grid__col u-12 u-4@md">
            <gender
              gender="female"
              :percentage="
                calculatePercentage(
                  parliamentarygroup.composition.gender.female
                )
              "
            />
            <gender
              gender="male"
              :percentage="
                calculatePercentage(parliamentarygroup.composition.gender.male)
              "
            />
          </div>
          <div class="o-grid__col u-12 u-8@md">
            <h3 class="u-uppercase u-text-center u-text-left@md">
              Distribución por edades
            </h3>
            <div class="u-text-center u-text-left@md">
              <span class="u-text-th3"
                >{{
                  calculatePercentage(
                    parliamentarygroup.composition.ages.under35
                  )
                }}%</span
              >
              con menos de 35 años
            </div>
            <div class="u-text-center u-text-left@md">
              <span class="u-text-th3"
                >{{
                  calculatePercentage(
                    parliamentarygroup.composition.ages.between35and49
                  )
                }}%</span
              >
              entre 35 y 49 años
            </div>
            <div class="u-text-center u-text-left@md">
              <span class="u-text-th3"
                >{{
                  calculatePercentage(
                    parliamentarygroup.composition.ages.between50and65
                  )
                }}%</span
              >
              entre 50 y 65 años
            </div>
            <div class="u-text-center u-text-left@md">
              <span class="u-text-th3"
                >{{
                  calculatePercentage(
                    parliamentarygroup.composition.ages.over65
                  )
                }}%</span
              >
              con más de 65 años
            </div>
          </div>
        </div>
      </div>

      <div v-if="footprintByTopics.length > 0" class="o-container o-section">
        <h2 class="u-margin-bottom-4 u-uppercase u-text-center u-text-left@md">
          Temáticas destacadas
        </h2>
        <Barchart
          :entity="parliamentarygroup"
          entityType="parliamentarygroup"
          :result="footprintByTopics"
        />
        <p>
          El tamaño de la barra es relativo al valor máximo de la huella para
          cada temática.
          <router-link
            :to="{ name: 'footprint' }"
            target="_blank"
            style="text-decoration: none !important"
            >Consulta aquí cómo funciona el algoritmo de huella
            parlamentaria.</router-link
          >
        </p>
      </div>

      <h2
        class="u-uppercase u-margin-top-4 u-margin-bottom-4 u-text-center u-text-left@sm"
        v-if="latestInitiatives && latestInitiatives.length"
      >
        Últimas iniciativas
      </h2>
      <results
        layout="extended"
        :initiatives="latestInitiatives"
        class="u-margin-bottom-8"
        :topicsStyles="topicsStyles"
      />

      <save-alert
        v-if="use_alerts"
        :searchparams="{ author: parliamentarygroup.name }"
        :text="parliamentarygroup.name"
      />

      <h2
        class="u-uppercase u-margin-top-6 u-margin-bottom-4 u-text-center u-text-left@sm"
      >
        Diputados/as
      </h2>
      <CardGrid
        :items="deputies"
        type="deputy"
        layout="medium"
        :extra="undefined"
      />
    </div>

    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";

import CardGrid from "@/components/CardGrid.vue";
import ParliamentaryGroupCard from "@/components/ParliamentaryGroupCard.vue";
import Results from "@/components/Results.vue";
import Gender from "@/components/Gender.vue";
import Barchart from "@/components/Barchart.vue";
import Loader from "@/components/Loader.vue";
import SaveAlert from "@/components/SaveAlert.vue";
import FootprintInfo from "@/components/FootprintInfo.vue";
import api from "@/api";
import config from "@/config";
import { useParliamentStore } from "@/stores/parliament";

const route = useRoute();
const router = useRouter();
const store = useParliamentStore();

const use_alerts = config.USE_ALERTS;
const topicsStyles = config.STYLES.topics;

const parliamentarygroup = ref(null);
const latestInitiatives = ref([]);
const errors = ref([]);

const headTitle = computed(() => {
  return parliamentarygroup.value?.name
    ? `${parliamentarygroup.value.name} - Qué hacen los diputados`
    : "Qué hacen los diputados";
});

useHead({
  title: headTitle,
});

const deputies = computed(() => {
  if (parliamentarygroup.value) {
    return store
      .getDeputiesByParliamentaryGroup(parliamentarygroup.value.shortname)
      .filter((deputy) => deputy.active)
      .map((deputy) => deputy);
  }
  return [];
});

const dividedDeputies = computed(() => {
  let results = [];
  let divided = deputies.value;

  for (let i = 3; i > 0; i--) {
    results.push(divided.splice(0, Math.ceil(divided.length / i)));
  }

  return results;
});

const footprintByTopics = computed(() => {
  if (parliamentarygroup.value) {
    return parliamentarygroup.value.footprint_by_topics
      .filter((item) =>
        store.allTopics.some((topic) => topic.name === item.name)
      )
      .filter((item) => item.score > 0)
      .slice(0, 5);
  }
  return [];
});

const getParliamentaryGroup = () => {
  api
    .getGroup(route.params.id)
    .then((response) => {
      parliamentarygroup.value = response;
      getLatestInitiatives();
    })
    .catch((error) => {
      errors.value.push(error);
      router.push({ name: "Page404", params: { 0: "404" } });
    });
};

const getLatestInitiatives = () => {
  api
    .getInitiatives({ author: parliamentarygroup.value.name, per_page: 6 })
    .then((response) => {
      if (response.initiatives) latestInitiatives.value = response.initiatives;
    })
    .catch((error) => errors.value.push(error));
};

const calculatePercentage = (value) => {
  return Math.round(
    (value / parliamentarygroup.value.composition.deputies) * 100
  );
};

onMounted(() => {
  getParliamentaryGroup();
});

watch(route, () => {
  getParliamentaryGroup();
});
</script>

<style lang="scss" scoped>
.alerts-block {
  text-align: left;
  margin-top: -4rem;
  padding-top: 0;
  padding-bottom: 4rem;
  .o-container {
    padding-left: -16px;
  }
}
@media (max-width: 768px) {
  .alerts-block {
    text-align: left;
    margin-top: -2rem;
  }
}
</style>
