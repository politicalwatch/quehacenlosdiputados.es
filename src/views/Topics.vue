<template>
  <div>
    <navbar></navbar>
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
import Navbar from '@/components/navbar';
import { TipiHeader } from 'tipi-frontend-uikit/src/components'
import FooterBlock from '@/components/footer-block';
import api from '@/api'

export default {
  name: 'topics',
  components: {
    Navbar,
    TipiHeader,
    FooterBlock
  },
  data: function() {
    return {
      topics: {}
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
