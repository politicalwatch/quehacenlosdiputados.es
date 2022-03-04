<template>
    <transition-group tag="div" class="barchart" name="barfade">
      <div class="barchart__row" v-for="d in rows" :key="d.name" :style="rowStyle">

        <div class="barchart__name u-text-th4 u-uppercase">{{d.name}}</div>

        <div class="barchart__bar">
          <div class="barchart__backbar" :style="d.backbarStyle"></div>
          <div class="barchart__overbar" :style="d.overbarStyle"></div>
          <div class="barchart__score u-text-th3">{{d.score}}</div>
        </div>

        <div class="barchart__more">
          <router-link :to="{name: 'results', params: {data: paramsData(d.name, deputy)}}" class="u-border-link u-uppercase">
            Consultar
          </router-link>
        </div>

      </div>
    </transition-group>
</template>


<script>
const qs = require('qs');

import * as Utils from '@/utils';

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
    deputy: {
      type: String,
      required: true,
      default: ''
    }
  },
  mounted() {
    this.calculeRows();
  },
  computed: {
    rowStyle() {
      return {
        height: `${this.barHeight}px`,
        marginBottom: `${this.barGap}px`,
      };
    },
  },
  methods: {
    calculeRows() {
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
    paramsData: function(topic, deputy) {
      return qs.stringify({
        topic: topic,
        deputy: deputy
      });
    },
  },
};
</script>

<style lang="scss">
.barchart {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 48px;
    position: relative;
  }
  &__name {
    margin-right: 6px;
    margin-bottom: 0px !important;
    flex-basis: 20%;
  }
  &__bar {
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    flex-basis: 90%;
  }
  &__backbar {
    width: 100%;
  }
  &__overbar {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    transition: width 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95) 350ms;
  }
  &__score {
    position: absolute;
    z-index: 10;
    top: 25%;
    left: 24px;
  }
  &__more {
    margin-left: 6px;
    flex-basis: 10%;
  }
}

/* Animation */
.barfade {
  &-enter-active,
  &-leave-active,
  &-move {
    transition: 350ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
    .barchart__overbar {
      width: 0 !important;
    }
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
}

</style>
