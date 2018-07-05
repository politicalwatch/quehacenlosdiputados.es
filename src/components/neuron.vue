<template>
  <svg style="width:100%; height:450px;"></svg>
</template>

<script>
import api from '@/api'
const d3 = require('d3');

export default {
  name: 'neuron',
  props: ['initiative'],
  methods: {
    loadVizz: function() {
      var self = this;

      console.log("loading vizz");

      this.initiative = this.$props.initiative;

      api.getTopics()
        .then(topics => {
          this.topics = topics;
          //TODO:  We should use the ID of the initiative on the SVG element
          //       so that we can have multiple viz in the same page, not rely on querystrinty
          //       and make the creation of the viz on the HTML side completely transparent.
          svg = d3.select(this.$el);
          width = +svg.node().getBoundingClientRect().width;
          height = +svg.node().getBoundingClientRect().height;
          onDataReady();
        })
        .catch(error => this.errors = error);



      //=== Utilities ===
      //Mapping ranges
      function map(x, in_min, in_max, out_min, out_max) {
          return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }

      //Converting polar coordinates to cartesian coordinates
      function polar(angle, radius) {
        return [
        Math.cos(angle)*radius,
        Math.sin(angle)*radius
        ]
      }

      //Calculate the transform of a node
      function calculateTransform(d,i) {
          var pos = calculatePosition(d,i);
          return "translate(" + pos[0] + "," + pos[1] + ")";
      }

      //Calculate the position of a node
      function calculatePosition(d, i) {
          var angle = map(i, 0, data.length, 0, Math.PI*2);
          var pos = polar(angle, d["related"] ? 150 : 100);
          return [pos[0] + width/2, pos[1] + height/2];
      }


      //=== Data visualization ===

      //Configurations
      var color = {
        "related": {
          "ODS 6": "#00aed9",
          "ODS 7": "#fdb713",
          "ODS 11": "#f99d26",
          "ODS 12": "#cf8d2a",
          "ODS 15": "#3eb049",
        },
        "notRelated": "#cecece",
        "center": "#222",
        "line": "#cecece"
      }

      //TODO: Encapsulate this in a class so we can have multiple vizualisations in one page.
      //Globals
      var data = [];
      var svg;
      var width;
      var height;


      function onDataReady() {

        for(var d=0; d<self.topics.length; d++) {
          var newNode = {"name": self.topics[d].name, "related": false, "intensity": 0};
          for(var t=0; t<self.initiative["topics"].length; t++) {
            if(self.initiative["topics"][t] == newNode["name"]) {
              newNode["related"] = true;
            }
          }

          for(var i=0; i<self.initiative["tags"].length; i++) {
            if(self.initiative["tags"][i]["topic"] == newNode["name"]) {
              newNode["intensity"]++;
            }
          }
          //intensity goes from 0 to 1 (percentage of tags)
          newNode["intensity"] = newNode["intensity"]/self.initiative["tags"].length;

          data.push(newNode);
        }

        console.log("Data ready");

        createNodes();
      }

      function createNodes() {
        svg.selectAll(".connection")
          .data(data)
          .enter().append("path").transition()
            .duration(700)
            .delay(function(d, i) { return i * i + 500; })
            .ease(d3.easeBackOut)
            .attr("d", function(d,i){
                var pos = calculatePosition(d,i);
                return "M " + width/2 + " " + height/2
                     + "L " + pos[0] + " " + pos[1];
              })
            .attr("stroke-width",function(d){return d["related"] ? '3px' : '1px'})
            .attr("stroke", function(d){ return d["related"] ? color["related"][d["name"].split('-')[0].trim()] : color["line"]});

        var node = svg.selectAll(".node")
        .data(data)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(){return "translate(" +  width/2 + "," + height/2 + ")";});

        node.transition()
        .duration(700)
        .delay(function(d, i) { return i * i; })
        .ease(d3.easeBackOut)
        .attr("transform", calculateTransform);

        node.append("circle")
            .attr("class", function(d){return d["related"] ? "related" : ""})
            .attr("r", function(d){return d["related"] ? 15 : 10})
            .style("fill", function(d){ return d["related"] ? color["related"][d["name"].split('-')[0].trim()] : color["notRelated"]});

        node.append("path")
            .attr("d", d3.arc()
              .innerRadius(function (d){return d["related"] ? 20 : 15})
              .outerRadius(function (d){return d["related"] ? 25 : 20})
              .startAngle(0)
              .endAngle(function (d){
                return Math.PI * 2 * d["intensity"]}))
            .attr("class", function(d){return d["related"] ? "related" : ""})
            .style("fill", function(d){ return d["related"] ? color["related"][d["name"].split('-')[0].trim()] : color["notRelated"]});

        node.append("text")
            .attr("class", "label_name")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .text(function(d) { return d["related"] ? d["name"].split('-')[0].trim() : ""; });
            //.text(function(d){return d["related"] ? Math.round(d["intensity"]*100) + "%" : ""})

         /*
        node.append("text")
            .attr("class", "label_name")
            .attr("transform", function(d,i) {
              var angle = map(i, 0, data.length, 0, Math.PI*2);
              var flip = 0;
              if (angle > Math.PI/2 && angle < 3*Math.PI/2) {
                flip = 180;
              }
              var size = 0;
              if(flip >0) {
                size = d["name"].length*7;
              }
              return "translate(" + (Math.cos(angle)*(25 + size)) + "," + (Math.sin(angle)*(25+size)) + "), rotate("+ ((angle)*(180/Math.PI) + flip) + ")";
            })
            .text(function(d) { return d["related"] ? d["name"].split('-')[0].trim() : ""; });
        */

        var center = svg.append("g")
          .attr("class", "center")
          .attr("transform", "translate("+width/2+", "+height/2+")")

        center.append("circle")
          .attr("r", 5)
          .attr("fill", color["center"])
          .transition()
          .duration(700)
          .ease(d3.easeBackOut)
          .attr("r", 20);
      }
    }
  },
  watch: {
    '$props.initiative': 'loadVizz'
  }
}
</script>

<style lang="scss">
  .node circle {
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    /* IE 5-7 */
    filter: alpha(opacity=50);
    /* Netscape */
    -moz-opacity: 0.5;
    /* Safari 1.x */
    -khtml-opacity:0.5;
    /* Good browsers */
    opacity: 0.5;
  }

  .node circle.related {
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    /* IE 5-7 */
    filter: alpha(opacity=100);
    /* Netscape */
    -moz-opacity: 1;
    /* Safari 1.x */
    -khtml-opacity:1;
    /* Good browsers */
    opacity: 1;
  }

  .node circle:hover {
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    /* IE 5-7 */
    filter: alpha(opacity=100);
    /* Netscape */
    -moz-opacity: 1;
    /* Safari 1.x */
    -khtml-opacity:1;
    /* Good browsers */
    opacity: 1;
  }

  .node path {
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
    /* IE 5-7 */
    filter: alpha(opacity=40);
    /* Netscape */
    -moz-opacity: .4;
    /* Safari 1.x */
    -khtml-opacity:.4;
    /* Good browsers */
    opacity: .4;

  }

  .node .label_percentage {
    font-size: 10px;
    font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .node .label_name {
    font-size: 20px;
    font-weight: bold;
    font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
