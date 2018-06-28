<template>
  <div id="app">
    <div style="width:100%;height:10px;background: url('/img/cascade.png') repeat-x;"></div>
    <navbar></navbar>
    <router-view/>
    <div class="container-fluid">
      <div id="credits" class="row">
        <div class="col-sm-12 text-center">
          <small><strong>TIPI</strong> está licenciado bajo <a href="https://www.gnu.org/copyleft/gpl.html" target="_blank">GNU GPL v3</a></small>
          <br>
          <small>Hecho con ♥ por <a href="https://unmundosalvadorsoler.org/ciecode/" target="_blank">CIECODE (Fundacion Salvador Soler)</a></small>
        </div>
      </div>
    </div>
    <div style="width:100%;height:10px;background: url('/img/cascade.png') repeat-x;"></div>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar';

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
</style>
