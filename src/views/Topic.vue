<template>
  <div>
    <navbar></navbar>
    <page-header :title="topic.name"></page-header>
    <div id="dict">
      <div class="container page">
        <div class="row" v-if="topic.description.length > 0 && topic.icon != ''">
          <div class="col-sm-3">
            <img class="img-responsive" :src="'/img/topics/'+topic.icon" :alt="'Imagen de' + topic.name">
          </div>
          <div class="col-sm-9">
            <p v-for="d in topic.description" v-bind:key="d" style="font-size:1.2em;">
              {{d}}
            </p>
            <!-- <text&#45;element :meta="'¿De qué trata?'" :value="topic.description"></text&#45;element> -->
          </div>
        </div>
        <hr v-if="topic.description && topic.icon">
        <div class="row">
          <div class="col-sm-6" v-if="deputies">
            <h4>Diputadas/os más activas/os</h4>
            <ul class="list-unstyled">
              <li v-for="deputy in deputies" v-bind:key="deputy._id">
                <span class="foto mediana">
                  <img class="img-responsive" :src="deputy.image" />
                </span>
                <span class="dipname">
                  <router-link :to="{path: '/deputies/' + deputy.id}">{{deputy.name}}</router-link>
                </span>
              </li>
            </ul>
          </div>
          <div class="col-sm-6" v-if="parliamentarygroups">
            <h4>Grupos más activos</h4>
            <ul class="list-unstyled">
              <li v-for="parliamentarygroup in parliamentarygroups" v-bind:key="parliamentarygroup._id">
                <span class="groupname"><router-link :to="{path: '/parliamentarygroups/' + parliamentarygroup.id}">{{parliamentarygroup.name}}</router-link></span>
              </li>
            </ul>
          </div>
        </div>
        <hr v-if="latestInitiatives">
        <latest-initiatives :initiatives="latestInitiatives"></latest-initiatives>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header'
import FooterBlock from '@/components/footer-block';
import LatestInitiatives from '@/components/latest-initiatives';
import TextElement from '@/components/text-element'
import api from '@/api'

export default {
  name: 'topic',
  components: {
    Navbar,
    PageHeader,
    FooterBlock,
    LatestInitiatives,
    TextElement
  },
  data: function() {
    return {
      topic: {},
      allDeputies: null,
      deputies: null,
      allParliamentarygroups: null,
      parliamentarygroups: null,
      latestInitiatives: null
    }
  },
  methods: {
    getTopic: function() {
      api.getTopic(this.$route.params.id)
        .then(response => {
          this.topic = response;
          this.getDeputies();
          this.getParliamentarygroups();
          this.getLatestInitiatives(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getDeputies: function() {
      api.getDeputies()
        .then(response => {
          this.allDeputies = response;
          this.getDeputiesRanking(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getDeputiesRanking: function(topic) {
      api.getDeputiesRanking(topic)
        .then(response => {
          this.deputies = response;
          this.deputies.forEach((deputy, index) => {
            let foundDeputy = this.allDeputies.find(allD => allD.name === deputy._id );
            this.deputies[index].name = this.deputies[index]._id;
            this.deputies[index].id = foundDeputy.id;
            this.deputies[index].image = foundDeputy.image;
          });
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroups: function() {
      api.getGroups()
        .then(response => {
          this.allParliamentarygroups = response;
          this.getParliamentarygroupsRanking(this.topic.name);
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroupsRanking: function(topic) {
      api.getParliamentarygroupsRanking(topic)
        .then(response => {
          this.parliamentarygroups = response;
          this.parliamentarygroups.forEach((group, index) => {
            let foundGroup = this.allParliamentarygroups.find(allPG => allPG.name === group._id );
            this.parliamentarygroups[index].name = this.parliamentarygroups[index]._id;
            this.parliamentarygroups[index].id = foundGroup.id;
          });
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function(topic) {
      api.getLatestInitiatives(topic)
        .then(response => {
          this.latestInitiatives = response.slice(0, 10);
          this.latestInitiatives.forEach((initiative, index) => {
            console.log(initiative.date.$date)
            this.latestInitiatives[index].updated = initiative.date.$date;
          });
        })
        .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getTopic()
  }
}
</script>

<style scoped lang="scss">
</style>
