import "./LineChart.scss";
import { useEffect, useRef, useState } from "react";
import { mockSessions } from "../../mocks/mockData";
import { curveCardinal, line, scaleLinear, select } from "d3";

type LineChartProps = {};

const LineChart = ({}: LineChartProps) => {
  const [data, setData] = useState(mockSessions);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const handleSVG = () => {
      // Dimensions
      const margin = { top: 78, right: 0, bottom: 60, left: 0 };
      const chartWidth = +select("#lineChartContainer").style("width").slice(0, -2) - margin.left - margin.right;
      const chartHeight = +select("#lineChartContainer").style("height").slice(0, -2) - margin.top - margin.bottom;

      //D3 select SVG
      svg
        .attr("width", chartWidth + margin.left + margin.right)
        .attr("height", chartHeight + margin.top + margin.bottom);

      //X and Y scales
      const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left, chartWidth - margin.right]);
      const yScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.sessionLength))])
        .range([chartHeight + margin.bottom, margin.top]);

      //Set line(x,y) path
      const pathLine = line<number>()
        .x((value, index) => xScale(index))
        .y(yScale)
        .curve(curveCardinal);

      //Set the gradient
      svg
        .append("linearGradient")
        .attr("id", "gradient")
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#ffffff", opacity: "0.4" },
          { offset: "100%", color: "#ffffff", opacity: "1" },
        ])
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-opacity", (d) => d.opacity)
        .attr("stop-color", (d) => d.color);

      //Draw the line
      svg
        .selectAll("path")
        .data([data])
        .join("path")
        .attr("d", (value) => pathLine(value.map((value) => value.sessionLength)))
        .attr("fill", "none")
        .attr("stroke", "url(#gradient)")
        .attr("stroke-width", "2px");
    };
    handleSVG();
    window.addEventListener("resize", handleSVG);

    return () => {
      svg.selectAll("path").remove();
      svg.selectAll("linearGradient").remove();
      window.removeEventListener("resize", handleSVG);
    };
  }, [data]);

  return (
    <div id="lineChartContainer" className="LineChart">
      <p className="legend">Durée moyenne des sessions</p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
/** Created by carlos on 07/12/2022 */
