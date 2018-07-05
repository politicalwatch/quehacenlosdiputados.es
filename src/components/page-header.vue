<template>
  <div class="page-title">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>
            {{title}}
            <span v-if="subtitle">{{subtitle}}</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  props: ['title', 'subtitle']
}
</script>

<style scoped lang="scss">
h1 {
  margin: 1rem 0;
  font-size: 28px;
  @media (min-width: 768px) {
    font-size: 39px;
  }
  span {
    font-size: 0.5em;
    display: block;
  }
}
</style>
