<template>
    <transition-group tag="div" class="tipichart" name="barfade">
      <div class="tipichart__row" v-for="d in rows" :key="d.topic" :style="rowStyle">

        <div class="tipichart__tooltip" :style="{bottom: `${barHeight}px`}">
          <div class="tipichart__tip">{{ d.topic }} {{ d.percent }}%</div>
        </div>

        <div class="tipichart__name">{{d.name}}</div>

        <div class="tipichart__bar">
          <div class="tipichart__backbar" :style="d.backbarStyle"></div>
          <div class="tipichart__overbar" :style="d.overbarStyle"></div>
        </div>

      </div>
    </transition-group>
</template>


<script>
import * as Utils from '../../utils';

export default {
  name: 'TipiBarchart',
  data() {
    return {
      rows: [],
    };
  },
  props: {
    result: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    styles: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    barHeight: {
      type: Number,
      required: false,
      default: 24,
    },
    barGap: {
      type: Number,
      required: false,
      default: 12,
    },
    barColor: {
      type: String,
      required: false,
      default: '#fbc239',
    },
    barBackgroundColor: {
      type: String,
      required: false,
      default: '#f4f6f8',
    },
    barOrder: {
      type: String,
      required: false,
      default: 'desc', // Options: alphabetically, asc, desc
    },
    knowledgebase: {
      type: String,
      required: true,
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
      const tagged = this.getTagged()
      const tags = tagged.tags
      const rows = [];
      const totalTimes = tags
        .reduce((cnt, o) => (cnt + o.times), 0);


      tags.forEach(d => {
        const idx = rows.map(r => r.topic).indexOf(d.topic);
        if(idx === -1) {
          // New topic -> construct object
          rows.push({
            topic: d.topic,
            times: d.times,
            percent: Math.ceil((d.times/totalTimes)*100),
            iconStyle: {
              flex: `0 0 ${this.barHeight}px`,
              height: `${this.barHeight}px`,
              backgroundSize: `${this.barHeight}px`,
              backgroundImage: `url(/img/topics/${this.styles.topics[d.topic].image})`,
            },
            backbarStyle: {
              height: `${this.barHeight}px`,
              backgroundColor: this.barBackgroundColor,
            },
            overbarStyle: {
              height: `${this.barHeight}px`,
              width: `${(d.times/totalTimes)*100}%`,
              backgroundColor: this.barColor,
            },
          });
        } else {
          // Existing topic -> update values (sum ocurrences)
          rows[idx].times += d.times;
          rows[idx].overbarStyle.width = `${(rows[idx].times/totalTimes)*100}%`;
          rows[idx].percent = Math.ceil((rows[idx].times/totalTimes)*100);
        }
      });
      this.rows = this.barOrder === 'alphabetically'
        ? rows.sort((a, b) => Utils.naturalSort(a.topic, b.topic))
        : this.barOrder === 'asc'
          ? rows.sort((a, b) => a.times - b.times)
          : rows.sort((a, b) => b.times - a.times);
    },
    getTagged() {
      return this.result.tagged.filter(e => e.knowledgebase == this.knowledgebase).pop()
    },
  },
};
</script>

<style lang="scss">
.tipichart {
  &__row {
    display: flex;
    position: relative;
    &:hover .tipichart__tooltip {
      display: block;
    }
  }
  &__tooltip {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 99;
    text-align: center;
    display: none;
    pointer-events: none;
  }
  &__tip {
    background: black;
    color: white;
    font-size: small;
    display: inline-block;
    padding: 0 4px;
    line-height: 1.5;
    border-radius: 3px;
  }
  &__icon {
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 6px;
  }
  &__bar {
    flex: 1 1 auto;
    overflow: hidden;
    border-radius: 3px;
    position: relative;
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
}

/* Animation */
.barfade {
  &-enter-active,
  &-leave-active,
  &-move {
    transition: 350ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
    .tipichart__overbar {
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
