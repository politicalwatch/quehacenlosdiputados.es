<template>
  <div class="c-image-header">
    <figure>
      <img
        :srcset="imageSrcset"
        :sizes="imageSizes"
        :src="imageSrc"
        :alt="alt"
      />
    </figure>
    <h1 class="u-uppercase u-hide u-block@sm c-image-header__date">
      {{ home.Date }}
    </h1>
    <h2 class="u-uppercase u-hide u-block@sm c-image-header__date_title">
      {{ home.TitleDate }}
    </h2>
    <h2 class="u-uppercase u-hide@sm c-image-header__date">{{ home.Date }}</h2>
    <h3 class="u-uppercase u-hide@sm c-image-header__date_title">
      {{ home.TitleDate }}
    </h3>
    <h6 class="u-uppercase c-image-header__author u-hide u-block@sm">
      <a :href="home.ImageUrl" target="_blank"
        ><icon icon="mdi:camera" :height="16" /><span v-if="isUnsplashPhoto()"
          >Unsplash: </span
        >Photo by {{ home.ImageAuthor }}</a
      >
    </h6>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const { home, alt, imageSrcset, imageSizes, imageSrc } = defineProps({
  home: Object,
  alt: String,
  imageSrcset: String,
  imageSizes: String,
  imageSrc: String,
});

const isUnsplashPhoto = () => {
  return home.ImageUrl.includes("unsplash.com") ? true : false;
};
</script>

<style lang="scss" scoped>
.c-image-header figure {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
