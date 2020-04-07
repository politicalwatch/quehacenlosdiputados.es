<template>
    <transition-group tag="div" class="tipichart" name="barfade">
      <div class="tipichart__row" v-for="d in rows" :key="d.topic">

        <div class="tipichart__tooltip">
          <div class="tipichart__tip">{{d.topic}} {{d.percent}}%</div>
        </div>

        <div class="tipichart__icon" :style="d.iconStyle"></div>

        <div class="tipichart__bar">
          <div class="tipichart__backbar" :style="d.backbarStyle"></div>
          <div class="tipichart__overbar" :style="d.overbarStyle"></div>
        </div>

      </div>
    </transition-group>
</template>


<script>
export default {
  name: 'InitiativeBarChart',
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
  },
  mounted() {
    this.calculeRows();
  },
  methods: {
    calculeRows() {
      const rows = [];
      const totalTimes = this.result.tags
        .reduce((cnt, o) => (cnt + o.times), 0);

      this.result.tags.forEach(d => {
        const idx = rows.map(r => r.topic).indexOf(d.topic);
        if(idx === -1) {
          // New topic -> construct object
          rows.push({
            topic: d.topic,
            times: d.times,
            percent: Math.floor((d.times/totalTimes)*100),
            iconStyle: {
              backgroundImage: `url(/img/topics/${this.styles.topics[d.topic].image})`,
            },
            backbarStyle: {
              // backgroundColor: this.styles.defaultColor, // default color provided not matches page styles
              backgroundColor: '#f4f6f8',
            },
            overbarStyle: {
              backgroundColor: this.styles.topics[d.topic].color,
              width: `${(d.times/totalTimes)*100}%`,
            },
          })
        } else {
          // Existing topic -> update values (sum ocurrences)
          rows[idx].times += d.times;
          rows[idx].overbarStyle.width = `${(rows[idx].times/totalTimes)*100}%`;
          rows[idx].percent = Math.floor((rows[idx].times/totalTimes)*100);
        }
      });
      this.rows = rows;
    },
  },
};
</script>

<style lang="scss">
.tipichart {
  $bar-height: 20px;
  $vertical-separation: 12px;
  $icon-bar-separation: 6px;

  &__row {
    display: flex;
    height: $bar-height;
    margin-bottom: $vertical-separation;
    position: relative;
    &:hover .tipichart__tooltip {
      display: block;
    }
  }
  &__tooltip {
    position: absolute;
    bottom: calc(#{$bar-height});
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
    flex: 0 0 $bar-height;
    height: $bar-height;
    background-repeat: no-repeat;
    background-position: center;
    background-size: $bar-height;
    margin-right: $icon-bar-separation;
  }
  &__bar {
    flex: 1 1 auto;
    background: red;
    overflow: hidden;
    border-radius: 3px;
    position: relative;
  }
  &__backbar {
    height: $bar-height;
    width: 100%;
  }
  &__overbar {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    height: $bar-height;
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