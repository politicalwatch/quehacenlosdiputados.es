<template>
  <div class="page-title">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  props: ['title']
}
</script>
