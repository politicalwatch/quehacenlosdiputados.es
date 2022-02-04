<template>
  <div :class="'c-parliamentary_group_card c-parliamentary_group_card__' + layout">
    <router-link :to="{name: 'parliamentarygroup', params: {id: parliamentary_group.id }}">
      <div class="c-parliamentary_group_card__overlay" :style="getBackground()"></div>
      <div v-if="layout == 'medium'" class="c-parliamentary_group_card__wrapper">
        <h3>{{getGroupName()}}</h3>
        <h4><icon icon="person" class="c-icon--secondary c-icon--white" />{{parliamentary_group.composition.deputies}} Diputados/as</h4>
        <div class="c-parliamentary_group_card__icons">
          <PartyLogoIcon v-for="party in parliamentary_group.parties" :key="party.name" :logo="party.logo" :color="party.color" :name="party.name" />
        </div>
      </div>
      <div v-if="layout == 'small'" class="c-parliamentary_group_card__wrapper">
        <h4>{{getGroupName()}}</h4>
      </div>
    </router-link>
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
    layout: String,
  }, 
  methods: {
    getBackground: function () {
      const bg = this.parliamentary_group.color
      if (bg.length == 7) {
        return "background-color:" + bg
      }
      return "background-image:" + bg
    },
    getGroupName: function () {
      if (this.layout == 'large') {
        return this.parliamentary_group.name
      }
      const short_name = this.parliamentary_group.name.replace('Grupo Parlamentario', 'GP')
      if (short_name.length < 30) {
        return short_name
      }
      return short_name.substring(0, 31) + '...'
    },
  },
}
</script>

