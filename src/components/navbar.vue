<template>
  <nav class="navbar navbar-default"><div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/"><img src="/img/tipi-ods.svg"></a>
      </div>
      <div id="main-menu" class="collapse navbar-collapse" aria-expanded="false">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/" class="menuitem">Buscar</router-link>
          </li>
          <li>
            <router-link to="/about" class="menuitem">Acerca</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
