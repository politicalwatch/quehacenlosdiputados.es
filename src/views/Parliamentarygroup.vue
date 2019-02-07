<template>
  <div>
    <navbar></navbar>
    <page-header :title="parliamentarygroup.name"></page-header>
    <div id="group">
      <div class="container page">
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
import api from '@/api'

const moment = require('moment');

export default {
  name: 'parliamentarygroup',
  components: {
    Navbar,
    PageHeader,
    FooterBlock,
    LatestInitiatives
  },
  data: function() {
    return {
      parliamentarygroup: null,
      latestInitiatives: null,
      moment: moment
    }
  },
  methods: {
    getParliamentaryGroup: function() {
      api.getGroup(this.$route.params.id)
        .then(response => {
          this.parliamentarygroup = response;
          this.getLatestInitiatives();
        })
        .catch(error => this.errors = error);
    },
    getLatestInitiatives: function() {
      api.getInitiatives({'author': this.parliamentarygroup.name})
         .then(response => {
           if (response.initiatives) this.latestInitiatives = response.initiatives;
          })
         .catch(error => this.errors = error);
    }
  },
  created: function() {
    this.getParliamentaryGroup()
  }
}
</script>

<style scoped lang="scss">
</style>
