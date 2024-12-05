<template>
  <div class="footprint-range-chart-wrapper" ref="chartWrapper">
    <svg :width="availableWidth" :height="availableHeight">
      <g ref="rangeChartGroup" />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { scaleLinear, scaleBand, axisBottom, axisLeft, select } from "d3";

const { dataset, defaultWidth, defaultHeight, entityName, entityImage } =
  defineProps({
    dataset: {
      type: Array,
      default: () => [],
    },
    defaultWidth: {
      type: Number,
      default: 1200,
    },
    defaultHeight: {
      type: Number,
      default: 400,
    },
    entityName: {
      type: String,
      default: "",
    },
    entityImage: {
      type: String,
      default: "",
    },
  });

const availableWidth = ref(defaultWidth);
const availableHeight = ref(defaultHeight);

const chartWrapper = ref(null);
const rangeChartGroup = ref(null);

const maxValueX = computed(() => {
  return Math.max(...dataset.map((d) => d.max));
});

onMounted(() => {
  if (dataset?.length > 0) {
    drawChart();
  }
});

const drawChart = () => {
  console.log("Drawing chart");
  console.log("dataset", dataset);

  const margin = { top: 20, right: 200, bottom: 40, left: 180 };
  const width = availableWidth.value - margin.left - margin.right;
  const height = availableHeight.value - margin.top - margin.bottom;

  const xScale = scaleLinear().domain([0, maxValueX.value]).range([0, width]);
  const yScale = scaleBand()
    .domain(dataset.map((d) => d.name))
    .range([0, height])
    .padding(0.1);

  const svg = select("svg");
  const g = select(rangeChartGroup.value);

  const circleRadius = 8;

  g.attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(axisBottom(xScale))
    .selectAll("text")
    .attr("y", 20)
    .style("font-size", "14px")
    .style("font-family", "Fjalla One");

  g.append("g")
    .call(axisLeft(yScale))
    .selectAll("text")
    .style("text-anchor", "start")
    .attr("x", -180)
    .style("text-transform", "uppercase")
    .style("font-size", "16px")
    .style("font-family", "Fjalla One")
    .each(function (d) {
      const self = select(this);
      const text = self.text();
      const words = text.split(" ");
      self.text("");

      const lines = [];
      let currentLine = "";
      const maxLineLength = 20;

      words.forEach((word) => {
        if ((currentLine + word).length > maxLineLength) {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine += word + " ";
        }
      });

      if (currentLine.length > 0) {
        lines.push(currentLine.trim());
      }

      console.log("lines", lines);

      for (let i = 0; i < lines.length; i++) {
        const tspan = self.append("tspan").text(lines[i]);
        if (i > 0) {
          tspan.attr("x", -180).attr("dy", "1.2em");
        }
      }
      self.attr("y", -6 * (lines.length - 1));
    });
  // Append lines for min and max values
  g.selectAll(".line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("class", "line")
    .attr("x1", (d) => xScale(d.min))
    .attr("x2", (d) => xScale(d.max))
    .attr("y1", (d) => yScale(d.name) + yScale.bandwidth() / 2)
    .attr("y2", (d) => yScale(d.name) + yScale.bandwidth() / 2)
    .attr("stroke", "grey")
    .attr("stroke-width", 2);

  const tooltip = select(chartWrapper.value)
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.7)")
    .style("color", "#fff")
    .style("padding", "5px 10px")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  function showTooltip(event, d) {
    tooltip.transition().duration(200).style("opacity", 1);
    tooltip
      .html(`${d}`)
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 20 + "px");
  }

  function hideTooltip() {
    tooltip.transition().duration(500).style("opacity", 0);
  }

  // Append circles for min values
  g.selectAll(".min-circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "min-circle")
    .attr("cx", (d) => xScale(d.min))
    .attr("cy", (d) => yScale(d.name) + yScale.bandwidth() / 2)
    .attr("r", circleRadius)
    .attr("fill", "#f44336")
    .on("mouseover", function (event, d) {
      showTooltip(event, `Min: ${d.min}`);
    })
    .on("mouseout", hideTooltip);

  // Append circles for max values
  g.selectAll(".max-circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "max-circle")
    .attr("cx", (d) => xScale(d.max))
    .attr("cy", (d) => yScale(d.name) + yScale.bandwidth() / 2)
    .attr("r", circleRadius)
    .attr("fill", "#409343")
    .on("mouseover", function (event, d) {
      showTooltip(event, `Max: ${d.max}`);
    })
    .on("mouseout", hideTooltip);

  // Append images for score values
  g.selectAll(".score-image")
    .data(dataset)
    .enter()
    .append("foreignObject")
    .attr("x", (d) => xScale(d.score) - circleRadius * 3)
    .attr(
      "y",
      (d) => yScale(d.name) + yScale.bandwidth() / 2 - circleRadius * 3
    )
    .attr("width", circleRadius * 6)
    .attr("height", circleRadius * 6)
    .append("xhtml:div")
    .style("width", `${circleRadius * 6}px`)
    .style("height", `${circleRadius * 6}px`)
    .style("border", "4px solid rgb(239,202,83)")
    .style("border-radius", "50%")
    .style("overflow", "hidden")
    .append("img")
    .style("object-fit", "cover")
    .attr("src", entityImage)
    .style("width", "100%")
    .style("height", "100%")
    .on("mouseover", function (event, d) {
      showTooltip(event, `Score: ${d.score}`);
    })
    .on("mouseout", hideTooltip);

  // Append circles for score values
  // g.selectAll(".circle")
  //   .data(dataset)
  //   .enter()
  //   .append("circle")
  //   .attr("class", "circle")
  //   .attr("cx", (d) => xScale(d.score))
  //   .attr("cy", (d) => yScale(d.name) + yScale.bandwidth() / 2)
  //   .attr("r", circleRadius * 3)
  //   .attr("fill", "transparent")
  //   .on("mouseover", function (event, d) {
  //     showTooltip(event, `Score: ${d.score}`);
  //   })
  //   .on("mouseout", hideTooltip);

  // Append foreignObject for buttons
  g.selectAll(".button")
    .data(dataset)
    .enter()
    .append("foreignObject")
    .attr("x", width + 70)
    .attr("y", (d) => yScale(d.name) + yScale.bandwidth() / 2 - 25)
    .attr("width", 130)
    .attr("height", 52)
    .append("xhtml:div")
    .html(
      (d) =>
        `<button class="footprint-range-chart__button" onclick="window.location.href='/resultados/topic=${d.name}&deputy=${entityName}'">Consultar</button>`
    );
};

const cleanChart = () => {
  select(rangeChartGroup.value).selectAll("*").remove();
};

watch(
  () => dataset,
  (newData) => {
    cleanChart();
    drawChart();
  }
);

watch(
  () => defaultWidth,
  (newWidth) => {
    cleanChart();
    availableWidth.value = newWidth;
    drawChart();
  }
);
</script>

<style lang="scss" scoped>
.footprint-scatter-chart-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

:depp(.tooltip) {
  position: absolute;
  text-align: center;
  width: auto;
  height: auto;
  padding: 5px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}

:deep(.footprint-range-chart__button) {
  text-transform: uppercase;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 28px;
  border: solid 4px #1d1d1b;
  font-family: "Fjalla One", sans-serif;
  background-color: #fff;
}
</style>
