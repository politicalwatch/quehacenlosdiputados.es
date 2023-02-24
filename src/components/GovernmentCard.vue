<template>
  <div class="c-government_card">
      <div class="c-government_card__wrapper">
        <router-link :to="{name: 'results', params: {data: qs.stringify({author: 'Gobierno'})}}">
          <h4 class="u-uppercase">Gobierno</h4>
        </router-link>
      </div>
  </div>
</template>

<script>
const qs = require('qs');

export default {
  name: 'GovernmentCard',
  data: () => {
    return {
      qs: qs
    }
  }
}
</script>
