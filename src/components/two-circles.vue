<template>
  <svg style="width:300px; height:500px"></svg>
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
      let maxRadius = 150;
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
           .attr("transform", "translate(" + width / 2 + "," + maxRadius + ")");

      node.append("circle")
        .attr("class", "compared")
        .attr("r", maxRadius)
        .attr("fill", maxColor);

      node.append("circle")
        .attr("fill", function(d) { return selectColor(d); })
        .attr("r", 0)
        .transition()
        .duration(duration)
        .attr("r", function(d) {
          let radius = Math.round((d.initiatives*maxRadius)/maxNumber);
          if (d.initiatives === 0) return 0;
          return (radius > minRadius) ? radius : minRadius;
        });


      let legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend");

      legend.append("rect")
        .attr("width", maxRadius*2)
        .attr("height", 10)
        .attr("fill", function(d) { return selectColor(d); })
        .attr("transform", "translate(0," + (maxRadius*2+50) + ")");

      legend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "#222")
        .style("font-size", "13px")
        .text(function(d) { return d._id; })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", "translate(" + width/2 + "," + (maxRadius*2+70) + ")");

      legend.append("rect")
        .attr("width", maxRadius*2)
        .attr("height", 10)
        .attr("class", "compared")
        .attr("fill", maxColor)
        .attr("transform", "translate(0," + (maxRadius*2+90) + ")");

      legend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "#222")
        .style("font-size", "13px")
        .text(maxName)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("transform", "translate(" + width/2 + "," + (maxRadius*2+110) + ")");


      function selectColor(d) {
          let color_objetivo = color['objetivos'][d._id.split('-')[0].trim()];
          let color_meta = color['metas'][d._id.split('.')[0].trim()];
          return (color_objetivo) ? color_objetivo : color_meta;
      }

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

circle.compared,
rect.compared {
  opacity: .3;
}

</style>
