<template>
  <div class="c-image-header">
      <figure>
        <img :src="image" alt="">
      </figure>
      <h1 class="u-uppercase c-image-header__date">{{ home.Date }}</h1>
      <h2 class="u-uppercase c-image-header__date_title">{{ home.TitleDate }}</h2>
      <h6 class="u-uppercase c-image-header__author u-hide u-block@sm"><a :href="home.ImageUrl" target="_blank"><icon icon="camera" />Unsplash: Photo by {{ home.ImageAuthor }}</a></h6>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'LastActivity',
    components: {
      Icon,
    },
    props: {
      home: Object,
      image: String,
    }
  }
</script>
