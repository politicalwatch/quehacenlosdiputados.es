<template>
  <div v-if="deputy" id="deputy" class="u-margin-bottom-10">
    <deputy-header v-if="deputy" :deputy="deputy" :parliamentaryGroup="parliamentarygroup">
      <a v-if="deputy.hasOwnProperty('email')" :href="`mailto:${deputy.email}`" target="_blank"><icon icon="mail" /> {{deputy.email}}</a>
      <a v-if="deputy.hasOwnProperty('twitter')" :href="deputy.twitter" target="_blank"><icon icon="twitter" /> @{{ deputy.twitter.split('/').reverse()[0] }}</a>
      <div class="u-margin-top-2">
        <congress-link v-if="deputy.hasOwnProperty('url')" :url="deputy.url"></congress-link>
      </div>
    </deputy-header>
    <div class="o-container" v-if="!deputy.active">
      <message type="info" icon>
        Causó baja en el Congreso de los Diputados
      </message>
    </div>
    <div class="o-container u-margin-top-4" v-show="use_alerts && deputy.active">
      <save-alert :searchparams="{deputy: deputy.name}" />
    </div>
    <div v-if="latestInitiatives && latestInitiatives.length" class="o-container o-section">
      <h4 class="u-margin-bottom-4">Últimas iniciativas</h4>
      <results layout="tiny" :initiatives="latestInitiatives" :topicsStyles="styles.topics"/>
    </div>
    <div class="o-container" v-else>
      <message type="info" icon>
        No se han encontrado iniciativas para este diputado/a
      </message>
    </div>
  </div>
  <div v-else class="o-container o-section u-margin-bottom-10">
    <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';
import CongressLink from '@/components/CongressLink';
import DeputyHeader from '@/components/DeputyHeader';
import Message from '@/components/Message';
import Results from '@/components/Results';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import SaveAlert from '@/components/SaveAlert';
import api from '@/api';
import config from '@/config';
import { mapState } from 'vuex';

export default {
  name: 'deputy',
  components: {
    PageHeader,
    CongressLink,
    DeputyHeader,
    Message,
    Results,
    Icon,
    Loader,
    SaveAlert,
  },
  data: function() {
    return {
      deputy: null,
      parliamentarygroup: null,
      latestInitiatives: null,
      use_alerts: config.USE_ALERTS,
      styles: config.STYLES,
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
          this.deputy.image = api.proxy(this.deputy.image);
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
  },
  created: function() {
    this.getDeputy()
  }
}
</script>

<style lang="scss" scoped>
.c-deputy__links a.c-button {
  display: inline-block;
}
.alerts-block {
  padding-bottom: 0rem;
  a {
    color: #fff;
  }
}
@media (max-width: 768px) {
  .alerts-block {
    text-align: center;
    margin-top: 0rem;
  }
}
</style>
