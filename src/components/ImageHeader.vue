<template>
  <div class="c-image-header">
    <figure>
      <img fetchpriority="high" :src="image" :alt="alt" />
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
        ><icon icon="camera" /><span v-if="isUnsplashPhoto()">Unsplash: </span
        >Photo by {{ home.ImageAuthor }}</a
      >
    </h6>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  name: "LastActivity",
  components: {
    Icon,
  },
  props: {
    home: Object,
    alt: String,
    image: String,
  },
  methods: {
    isUnsplashPhoto: function () {
      if (this.$props.home.ImageUrl.includes("unsplash.com")) return true;
      return false;
    },
  },
};
</script>
