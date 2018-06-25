<template>
  <p v-if="topics">
  <span class="meta">{{meta}}</span>
  <br>
  <ul class="list-unstyled">
    <li v-for="topic in topics" v-bind:key="topic" class="value">
      <router-link :to="{ name: 'results', params: { topic: topic } }">{{topic}}</router-link>
    <!--   <br> -->
    <!--   <small> -->
    <!--     (Por mencionar: -->
    <!--     {{#each getTerms ../terms this}} -->
    <!--     <a href="/escaner?dicts={{..}}&#38;terms[]={{this}}">{{this}}</a>,&#38;nbsp; -->
    <!--     {{/each}} -->
    <!--     ) -->
    <!--   </small> -->
    </li>
  </ul>
  </p>
</template>

<script>
export default {
  name: 'topics-element',
  props: [
    'meta',
    'topics'
  ]
}
</script>
