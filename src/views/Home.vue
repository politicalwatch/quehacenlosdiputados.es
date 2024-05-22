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

<script>
import Icon from "@/components/Icon.vue";
import ImageHeader from "@/components/ImageHeader.vue";
import LastActivity from "@/components/LastActivity.vue";
import Loader from "@/components/Loader.vue";
import Results from "@/components/Results.vue";
import config from "@/config";
import api from "@/api";

export default {
  name: "home",
  components: {
    Icon,
    ImageHeader,
    LastActivity,
    Loader,
    Results,
  },
  data: function () {
    return {
      isLoaded: false,
      home: {
        Date: "Diciembre 2023",
        TitleDate: "Ya tenemos comisiones",
        ImageUrl:
          "https://www.congreso.es/es/fotonoticias?p_p_id=fotonoticias&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_fotonoticias_mvcPath=detalle&_fotonoticias_fotonId=4406",
        ImageAuthor: "Congreso.es",
      },
      relatedInitiatives: [],
      lastdays: null,
      topicsStyles: config.STYLES.topics,
    };
  },
  methods: {
    getHome: function () {
      api
        .getHome()
        .then((home) => {
          this.home = home;
          this._parseRelatedInitiatives();
          this.getRelatedInitiatives();
        })
        .catch((error) => (this.errors = error));
    },
    getHomeImageSrcset: function () {
      return this.home.Image
        ? `${api.getHomeResourceUrl(this.home.Image.formats.small.url)} 500w, ${api.getHomeResourceUrl(this.home.Image.formats.medium.url)} 750w, ${api.getHomeResourceUrl(this.home.Image.formats.large.url)} 1000w`
        : null;
    },
    getHomeImage: function () {
      return this.home.Image
        ? api.getHomeResourceUrl(this.home.Image.formats.large.url)
        : null;
    },
    getLastdays: function () {
      api
        .getLastdaysStats()
        .then((lastdays) => (this.lastdays = lastdays))
        .catch((error) => (this.errors = error));
    },
    getRelatedInitiatives: function () {
      this.home.RelatedInitiativesIds.forEach((id) => {
        api
          .getInitiative(id, false)
          .then((initiative) => {
            this.relatedInitiatives.push(initiative);
            this.isLoaded = true;
          })
          .catch((error) => (this.errors = error));
      });
    },
    _parseRelatedInitiatives: function () {
      if (this.home.RelatedInitiativesIds !== undefined) {
        return;
      }
      const RELATED_INITIATIVES = 6;
      this.home.RelatedInitiativesIds = [...Array(RELATED_INITIATIVES).keys()]
        .map((el) => el + 1)
        .map((el) => this.home["Initiative" + el])
        .filter((element) => element !== null);
      // for (let i=1; i<=RELATED_INITIATIVES; i++) delete this.home['Initiative'+i];
    },
  },
  created: function () {
    this.getHome();
    this.getLastdays();
  },
};
</script>
