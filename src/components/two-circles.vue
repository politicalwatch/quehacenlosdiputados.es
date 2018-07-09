<template>
  <svg style="width:240px; height:240px"></svg>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'two-circles',
  props: ['selection'],
  methods: {
    loadVizz: function() {
      //Configurations
      let duration = 2000;
      let color = {
        "objetivos": {
          "ODS 6": "#00aed9",
          "ODS 7": "#fdb713",
          "ODS 11": "#f99d26",
          "ODS 12": "#cf8d2a",
          "ODS 15": "#3eb049"
        },
        "metas": {
          "6": "#00aed9",
          "7": "#fdb713",
          "11": "#f99d26",
          "12": "#cf8d2a",
          "15": "#3eb049"
        }
      }

      //Globals
      let svg = d3.select(this.$el);
      svg.selectAll("*").remove();
      let width = +svg.node().getBoundingClientRect().width;
      let height = +svg.node().getBoundingClientRect().height;
      let maxRadius = 100;
      let minRadius = 5;

      let data = [this.$props.selection.selected];
      let maxName = this.$props.selection.compareswith._id;
      let maxNumber = this.$props.selection.compareswith.initiatives;
      let color_objetivo = color['objetivos'][maxName.split('-')[0].trim()];
      let color_meta = color['metas'][maxName.split('.')[0].trim()];
      let maxColor = (color_objetivo) ? color_objetivo : color_meta;

      let node = svg.selectAll(".node")
        .data(data)
         .enter()
         .append("g")
           .attr("class", "node")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      node.append("circle")
        .attr("class", "compared")
        .attr("r", maxRadius)
        .attr("fill", maxColor);

      node.append("circle")
        .attr("fill", function(d) {
          let color_objetivo = color['objetivos'][d._id.split('-')[0].trim()];
          let color_meta = color['metas'][d._id.split('.')[0].trim()];
          return (color_objetivo) ? color_objetivo : color_meta;
        })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", function(d) {
          let radius = Math.round((d.initiatives*maxRadius)/maxNumber);
          return (radius > minRadius) ? radius : minRadius;
        });
    }
  },
  mounted: function() {
    this.loadVizz();
  },
  watch: {
    'selection.selected._id': 'loadVizz'
  }
}
</script>


<style lang="scss">

circle.compared {
  opacity: .3;
}

</style>
