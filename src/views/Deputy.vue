<template>
  <div>
    <navbar></navbar>
    <page-header :title="deputy.name"></page-header>
    <div id="deputy">
      <div class="container page">
        <div class="row">
          <div class="col-sm-2">
            <span class="foto grande">
              <img class="img-responsive" :src="deputy.image" :alt="'Foto de ' + deputy.name">
            </span>
          </div>
          <div class="col-sm-10">
            <h3>
                <router-link :to="{path: '/parliamentarygroups/' + parliamentarygroup.id}">{{parliamentarygroup.name}}</router-link>
            </h3>
            <ul class="list-unstyled">
              <li v-if="deputy.email"><a :href="'mailto:'+deputy.email" target="_blank"><i class="fa fa-envelope"></i> {{deputy.email}}</a></li>
              <li v-if="deputy.twitter"><a :href="deputy.twitter" target="_blank"><i class="fa fa-twitter"></i> {{deputy.twitter}}</a></li>
            </ul>
          </div>
        </div>
        <hr v-if="latestInitiatives">
        <latest-initiatives :initiatives="latestInitiatives"></latest-initiatives>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header'
import FooterBlock from '@/components/footer-block';
import LatestInitiatives from '@/components/latest-initiatives';
import api from '@/api'

const moment = require('moment');

export default {
  name: 'deputy',
  components: {
    Navbar,
    PageHeader,
    FooterBlock,
    LatestInitiatives
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      moment: moment,

    }
  },
  methods: {
    getDeputy: function() {
      api.getDeputy(this.$route.params.id)
        .then(response => {
          this.deputy = response;
          this.getParliamentaryGroup();
          this.getLatestInitiatives();

        })
        .catch(error => this.errors = error);
    },
    getParliamentaryGroup: function() {
      api.getGroups()
        .then(response => {
          let parliamentarygroups = response;
          this.parliamentarygroup = parliamentarygroups.find(allPG => allPG.shortname === this.deputy.parliamentarygroup );
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function() {
      api.getInitiatives({'deputy': this.deputy.name})
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives.slice(0, 10);
          })
         .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getDeputy()
  }
}
</script>

<style scoped lang="scss">
</style>
