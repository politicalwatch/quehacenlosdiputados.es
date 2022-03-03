<template>
  <div class="c-save-alert o-container u-margin-top-4">
    <div class="o-grid o-grid--center">
      <div class="c-save-alert__wrapper o-grid__col u-12 u-6@sm">
        <div class="c-save-alert__image">
          <img src="/img/alerts.png" />
        </div>
        <h4 class="u-uppercase">No te pierdas nada con la actividad parlamentaria relacionada con</h4>
        <h1 class="u-uppercase">{{ text }}</h1>
        <AlertButton :searchparams="searchparams" />
      </div>
    </div>
  </div>
</template>

<script>
import AlertButton from '@/components/AlertButton';

export default {
  name: "SaveAlert",
  props: {
    searchparams: Object,
    text: String,
  },
  components: {
    AlertButton,
  },
}
</script>

<style scoped lang="scss">
</style>

