<template>
  <div>
    <div class="disclaimer">
      <router-link :to="{name: 'about-en'}">Learn more about this project in English</router-link>
      <!-- <a class="close&#38;#45;disclaimer pull&#38;#45;right" href="" @click="">&#38;#38;times;</a> -->
    </div>
    <div class="cascade"></div>
    <nav class="navbar navbar-default"><div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/"><img src="/img/logo-beta.png"></a>
        </div>
        <div id="main-menu" class="collapse navbar-collapse" aria-expanded="false">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="{name:'search'}" class="menuitem">Buscar</router-link>
            </li>
            <li>
              <router-link :to="{name:'dashboard'}" class="menuitem">Métricas</router-link>
            </li>
            <li>
              <router-link :to="{name:'about'}" class="menuitem">Acerca</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  // data: function() {
  //   return {
  //     close: null
  //   }
  // },
  // created: function() {
  //   this.close = false;
  //   console.log("Se crea el navbar")
  // },
  // methods: {
  //   closeBlock: function() {
  //     this.close = true;
  //   }
  // }
}
</script>
