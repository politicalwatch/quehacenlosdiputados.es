<template>
  <div id="home" class="o-container u-margin-bottom-10 c-home">
    <div v-if="home">
      <ImageHeader
        :home="home"
        :imageSrcset="getHomeImageSrcset()"
        imageSizes="(min-width: 1000px) 1000px, (min-width: 750px) 750px, 500px"
        :imageSrc="getHomeImage()"
        class="u-margin-bottom-4"
      />

      <loader
        v-if="!isLoaded"
        title="Cargando datos"
        subtitle="Puede llevar algun tiempo"
      />

      <div
        class="o-section c-home__initiatives"
        v-if="relatedInitiatives.length"
      >
        <h1 class="u-uppercase c-home__initiatives_title">
          Iniciativas relacionadas
        </h1>
        <a
          class="c-home__more u-border-link u-hide u-block@sm u-uppercase"
          :href="home.RelatedInitiativesSearch"
          >Más iniciativas</a
        >
      </div>

      <results
        v-if="relatedInitiatives.length"
        :initiatives="relatedInitiatives"
        :topicsStyles="topicsStyles"
      />

      <a
        v-if="relatedInitiatives.length"
        class="c-home__more u-hide@sm u-border-link u-uppercase"
        :href="home.RelatedInitiativesSearch"
        >Más iniciativas</a
      >

      <LastActivity :lastdays="lastdays" v-if="lastdays" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import ImageHeader from "@/components/ImageHeader.vue";
import LastActivity from "@/components/LastActivity.vue";
import Loader from "@/components/Loader.vue";
import Results from "@/components/Results.vue";
import config from "@/config";
import api from "@/api";

const topicsStyles = config.STYLES.topics;

const isLoaded = ref(false);
const home = ref(null);
const relatedInitiatives = ref([]);
const lastdays = ref(null);
const errors = ref(null);

const getHome = () => {
  api
    .getHome()
    .then((response) => {
      home.value = response;
      _parseRelatedInitiatives();
      getRelatedInitiatives();
    })
    .catch((error) => (errors.value = error));
};

const getHomeImageSrcset = () => {
  return home.value.Image
    ? `${api.getHomeResourceUrl(home.value.Image.formats.small.url)} 500w, ${api.getHomeResourceUrl(home.value.Image.formats.medium.url)} 750w, ${api.getHomeResourceUrl(home.value.Image.formats.large.url)} 1000w`
    : null;
};
const getHomeImage = () => {
  return home.value.Image
    ? api.getHomeResourceUrl(home.value.Image.formats.large.url)
    : null;
};
const getLastdays = () => {
  api
    .getLastdaysStats()
    .then((response) => (lastdays.value = response))
    .catch((error) => (errors.value = error));
};
const getRelatedInitiatives = () => {
  home.value.RelatedInitiativesIds.forEach((id) => {
    api
      .getInitiative(id, false)
      .then((initiative) => {
        relatedInitiatives.value.push(initiative);
        isLoaded.value = true;
      })
      .catch((error) => (errors.value = error));
  });
};
const _parseRelatedInitiatives = () => {
  if (home.value.RelatedInitiativesIds !== undefined) {
    return;
  }
  const RELATED_INITIATIVES = 6;
  home.value.RelatedInitiativesIds = [...Array(RELATED_INITIATIVES).keys()]
    .map((el) => el + 1)
    .map((el) => home.value["Initiative" + el])
    .filter((element) => element !== null);
  // for (let i=1; i<=RELATED_INITIATIVES; i++) delete this.home['Initiative'+i];
};

onMounted(() => {
  getHome();
  getLastdays();
});
</script>
