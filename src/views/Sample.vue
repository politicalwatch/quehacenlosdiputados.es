<template>
  <div>
    <div id="samples" class="o-container o-section u-margin-bottom-10">
      <page-header title="This is a page header" subtitle="This is the page subtitle"/>
      <h1>This is a H1: 40px</h1>
      <h1 class="u-uppercase">Class u-uppercase to capitalize the content</h1>
      <h2>This is a H2: 32px</h2>
      <h3>This is a H3: 24px</h3>
      <h4>This is a H4: 16px</h4>
      <h5>This is a H5: 14px</h5>
      <ul>
        <li>This is a unordered list element.</li>
        <li>This is a unordered list element.</li>
        <li>This is a unordered list element.</li>
      </ul>
      <ol>
        <li>This is an ordered list element.</li>
        <li>This is an ordered list element.</li>
        <li>This is an ordered list element.</li>
      </ol>
      <p>This is a paragraph and <a href="/sample">this is a link</a>.</p>
      <p><a class="u-border-link" href="/sample">Border using u-border-link</a></p>
      <hr>
      <h3 class="u-uppercase">DeputyCard</h3>
      <div class="o-grid">
        <div class="o-grid__col u-4@sm">
          <h4>Layout: large</h4>
          <deputy-card :deputy="oneDeputy" layout="large" />
        </div>
        <div class="o-grid__col u-4@sm">
          <h4>Layout: medium</h4>
          <deputy-card :deputy="oneDeputy" layout="medium" />
        </div>
        <div class="o-grid__col u-4@sm">
          <h4>Layout: small</h4>
          <deputy-card :deputy="getDeputyByName(deputyName)" layout="small" />
        </div>
      </div>
      <hr>
      <h3 class="u-uppercase">Alerts</h3>
      <save-alert :searchparams="{deputy: 'Ábalos Meco, José Luis'}" text="Ábalos Meco, José Luis"/>
    </div>
  </div>
</template>

<script>

import DeputyCard from '@/components/DeputyCard';
import PageHeader from '@/components/PageHeader';
import SaveAlert from '@/components/SaveAlert';
import { mapGetters, mapState } from  'vuex';

export default {
  name: 'sample',
  components: {
    DeputyCard,
    PageHeader,
    SaveAlert,
  },
  data: function() {
    return {
      deputyName: 'Aizcorbe Torra, Juan José'
    }
  },
  computed: {
    ...mapState(['allDeputies']),
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
    oneDeputy: function () {
      return this.allDeputies[3];
    }
  },
}
</script>

<style scoped lang="scss">
</style>
