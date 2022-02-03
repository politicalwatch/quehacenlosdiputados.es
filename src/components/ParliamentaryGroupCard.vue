<template>
  <div class="c-parliamentary_group_card">
    <div class="c-parliamentary_group_card__overlay" :style="getBackground()"></div>
    <div class="c-parliamentary_group_card__wrapper">
      <h3>{{parliamentary_group.name}}</h3>
      <h4><icon icon="person" class="c-icon--secondary c-icon--white" />{{parliamentary_group.composition.deputies}} Diputados/as</h4>
      <div class="c-parliamentary_group_card__icons">
        <PartyLogoIcon v-for="party in parliamentary_group.parties" :logo="party.logo" :color="party.color" :name="party.name" />
      </div>
    </div>
  </div>
</template>

<script>

import Icon from './Icon';
import PartyLogoIcon from './PartyLogoIcon';

export default {
  name: 'ParliamentaryGroupCard',
  components: {
    Icon,
    PartyLogoIcon,
  },
  props: {
    parliamentary_group: Object,
  }, 
  methods: {
    getBackground: function () {
      const bg = this.parliamentary_group.color
      if (bg.length == 7) {
        return "background-color:" + bg
      }
      return "background-image:" + bg
    },
  },
}
</script>

