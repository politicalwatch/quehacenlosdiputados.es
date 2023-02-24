<template>
  <div class="c-otherauthor_card">
      <div class="c-otherauthor_card__wrapper">
        <h4 class="u-uppercase">{{name}}</h4>
      </div>
  </div>
</template>

<script>
const qs = require('qs');

export default {
  name: 'OtherAuthorCard',
  props: {
    name: String
  },
  data: () => {
    return {
      qs: qs
    }
  }
}
</script>
