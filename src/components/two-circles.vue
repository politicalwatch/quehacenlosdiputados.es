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

      console.log("load graph")

      //Configurations
      let duration = 2000;
      let color = {
        "ODS 6": "#00aed9",
        "ODS 7": "#fdb713",
        "ODS 11": "#f99d26",
        "ODS 12": "#cf8d2a",
        "ODS 15": "#3eb049",
      }

      //Globals
      let svg = d3.select(this.$el);
      svg.selectAll("*").remove();
      let width = +svg.node().getBoundingClientRect().width;
      let height = +svg.node().getBoundingClientRect().height;
      let maxRadius = 100;

      let data = [this.$props.selection.selected];
      let maxName = this.$props.selection.compareswith._id;
      let maxNumber = this.$props.selection.compareswith.initiatives;
      let maxColor = color[maxName.split('-')[0].trim()];

      let node = svg.selectAll(".node")
        .data(data)
         .enter()
         .append("g")
           .attr("class", "node")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      node.append("circle")
        .attr("r", maxRadius)
        .attr("fill", maxColor);

      node.append("circle")
        .attr("fill", (d) => color[d._id.split('-')[0].trim()])
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", (d) => Math.round((d.initiatives*maxRadius)/maxNumber) );



    }
  },
  mounted: function() {
    this.loadVizz();
  },
  watch: {
    'this.$props.selection': 'loadVizz'
  }
}
</script>

<style lang="scss">
</style>
