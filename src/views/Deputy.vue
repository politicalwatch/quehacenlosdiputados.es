<template>
  <div v-if="deputy" id="deputy" class="u-margin-bottom-10">
    <tipi-deputy v-if="deputy" :deputy="deputy" :parliamentaryGroup="parliamentarygroup">
      <p><tipi-icon icon="building" /> &nbsp {{deputy.constituency}}</p>
      <div class="o-grid">
        <div class="o-grid__col u-6">
         <button class="c-button c-button--compact c-button--icon-right c-button--secondary u-text-overline u-color-black" @click="bio">Biografía <tipi-icon icon="chevron-right" /></button>
          <br></br>
         <button class="c-button c-button--compact c-button--icon-right c-button--secondary u-text-overline u-color-black" @click="positions">Cargos públicos<tipi-icon icon="chevron-right" /></button>
         <br></br>
          <a v-if="deputy.extra.hasOwnProperty('activity_resource')" :href="deputy.extra.activity_resource" class="c-button c-button--compact c-button--icon-right c-button--secondary u-text-overline">Declaración de Actividades<tipi-icon icon="download" /></a>
          <br></br>
         <a v-if="deputy.extra.hasOwnProperty('assets_resource')" :href="deputy.extra.assets_resource" class="c-button c-button--compact c-button--icon-right c-button--secondary u-text-overline">Declaración de Bienes y Rentas<tipi-icon icon="download" /></a>
        </div>
        <div class="o-grid__col u-6">
        <ul><li v-if="seeBio" class= "u-text-tbody2" v-for="bio in deputy.bio">{{bio}}</li> </ul>
        <ul><li v-if="seeposition" class= "u-text-tbody2" v-for="position in deputy.public_position">{{position}}</li></ul>
        </div>
     </div>
     <br></br>
      <a v-if="deputy.hasOwnProperty('facebook')" :href="deputy.facebook" target="_blank"><tipi-icon icon="open-blank" />Facebook: {{deputy.facebook.split('/').reverse()[0]}}</a>
      <a v-if="deputy.hasOwnProperty('twitter')" :href="deputy.twitter" target="_blank"><tipi-icon icon="twitter" /> @{{ deputy.twitter.split('/').reverse()[0] }}</a>
      <a v-if="deputy.hasOwnProperty('email')" :href="`mailto:${deputy.email}`" target="_blank"><tipi-icon icon="mail" /> {{deputy.email}}</a>

    </tipi-deputy>
    <div v-if="latestInitiatives && latestInitiatives.length" class="o-container o-section">
      <h4 class="u-margin-bottom-4">Últimas iniciativas</h4>
      <tipi-results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles.topics"/>
    </div>
    <p class="u-text-center u-margin-bottom-10" v-else>No se han encontrado iniciativas para este diputado/a</p>
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <tipi-loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

import { TipiHeader, TipiDeputy, TipiResults, TipiIcon, TipiLoader, TipiText } from 'tipi-uikit'
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'deputy',
  components: {
    TipiHeader,
    TipiDeputy,
    TipiResults,
    TipiIcon,
    TipiLoader,
    TipiText
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      styles: config.STYLES,
      seeBio: false,
      seeposition: false,
    }
  },
  computed: {
    ...mapState(['allParliamentaryGroups'])
  },
  methods: {
    getDeputy: function() {
      api.getDeputy(this.$route.params.id)
        .then(response => {
          this.deputy = response;
          this.parliamentarygroup = this.allParliamentaryGroups.find(allPG => allPG.shortname === this.deputy.parliamentarygroup);
          this.getLatestInitiatives();
        })
        .catch(error => {
          this.errors = error
          this.$router.push({name: 'Page404', params: { '0': '404'}});
        });
    },
    getLatestInitiatives: function() {
      api.getInitiatives({ 'deputy': this.deputy.name, 'per_page': 12 })
        .then(response => {
          if (response.initiatives) this.latestInitiatives = response.initiatives;
        })
        .catch(error => this.errors = error);
    },
    bio: function(){
      if(this.seeBio == false){
        this.seeBio = true
        this.seeposition = false
      }
      else{
        this.seeBio = false
      }
    },
    positions: function(){
      if(this.seeposition == false){
        this.seeBio = false
        this.seeposition = true
      }
      else{
        this.seeposition = false
      }
    }
  },
  created: function() {
    this.getDeputy()
  }
}
</script>

<style scoped lang="scss">
</style>
