<template>
  <div>
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
    <tipi-header title="Temáticas"/>
    <div id="dicts">
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <div v-for="topic in topics" v-bind:key="topic.id" class="col-sm-3 col-xs-6 text-center dict">
              <router-link :to="{path: '/topics/' + topic.id}">
                <img :src="'/img/topics/'+topic.icon" :alt="'Imagen de' + topic.name">
                <h4>{{topic.name}}</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>

import { TipiHeader, TipiNavbar } from 'tipi-frontend-uikit/src/components'
import FooterBlock from '@/components/footer-block';
import api from '@/api';
import config from '@/config';

export default {
  name: 'topics',
  components: {
    TipiNavbar,
    TipiHeader,
    FooterBlock
  },
  data: function() {
    return {
      topics: {},
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    }
  },
  methods: {
    getTopics: function() {
      api.getTopics()
        .then(response => this.topics = response)
        .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getTopics()
  }
}
</script>

<style scoped lang="scss">
</style>
