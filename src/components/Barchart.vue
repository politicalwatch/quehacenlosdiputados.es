<template>
    <transition-group tag="div" class="c-barchart" name="barfade">
      <div class="c-barchart__row" v-for="d in rows" :key="d.name">

        <div class="c-barchart__name u-text-th4 u-uppercase">{{d.name}}</div>

        <div class="c-barchart__more">
          <router-link :to="{name: 'results', params: {data: paramsData(d.name, entity)}}" class="u-border-link u-uppercase">
            Consultar
          </router-link>
        </div>

        <div class="c-barchart__bar">
          <div class="c-barchart__backbar" :style="d.backbarStyle"></div>
          <div class="c-barchart__overbar" :style="d.overbarStyle"></div>
          <div class="c-barchart__score u-text-th3">{{d.score}}</div>
        </div>

      </div>
    </transition-group>
</template>


<script>
const qs = require('qs');

export default {
  name: 'Barchart',
  data() {
    return {
      rows: [],
    };
  },
  props: {
    result: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    barHeight: {
      type: Number,
      required: false,
      default: 56,
    },
    barGap: {
      type: Number,
      required: false,
      default: 24,
    },
    barColor: {
      type: String,
      required: false,
      default: '#efca53',
    },
    barBackgroundColor: {
      type: String,
      required: false,
      default: '#f3f3f3',
    },
    entity: {
      type: Object,
      required: true,
    },
    entityType: {
      type: String,
      requred: true,
    }
  },
  created() {
    this.calculeRows();
  },
  watch: {
    result: 'calculeRows'
  },
  methods: {
    calculeRows() {
      this.rows = [];
      const max = this.result[0].score;
      this.result.forEach(d => {
        this.rows.push({
          name: d.name,
          score: d.score,
          backbarStyle: {
            height: `${this.barHeight}px`,
            backgroundColor: this.barBackgroundColor,
          },
          overbarStyle: {
            height: `${this.barHeight}px`,
            width: `${(d.score/max)*100}%`,
            backgroundColor: this.barColor,
          },
        });
      });
    },
    getFieldToSearch: function() {
      if (this.entityType == 'deputy') return 'deputy'
      if (this.entityType == 'parliamentarygroup') return 'author'
      return ''
    },
    paramsData: function(topic, entity) {
      return qs.stringify({
        topic: topic,
        [this.getFieldToSearch()]: entity['name']
      });
    },
  },
};
</script>
