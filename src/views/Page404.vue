<template>
  <div>
    <div id="page404">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-4 text-center">
            <h1>¿Te has perdido?</h1>
            <p>Regresa a la página de inicio para encontrar lo que realmente estás buscando</p>
            <router-link :to="{name:'search'}" class="btn btn-custom">Volver al inicio</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
}
</script>

<style scoped lang="scss">
.container {
  padding: 80px 15px;
}
p {
  font-size: 1.2em;
}
</style>
