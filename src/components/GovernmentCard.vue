<template>
  <div class="c-government_card">
    <div class="c-government_card__wrapper">
      <router-link
        :to="{
          name: 'results',
          params: { data: qs.stringify({ author: 'Gobierno' }) },
        }"
      >
        <h4 class="u-uppercase">Gobierno</h4>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import qs from "qs";
</script>
