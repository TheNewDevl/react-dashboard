import "./LineChart.scss";
import { useEffect, useRef, useState } from "react";
import { mockSessions } from "../../mocks/mockData";
import { curveCardinal, line, scaleLinear, select } from "d3";

type LineChartProps = {};

const LineChart = ({}: LineChartProps) => {
  const [data, setData] = useState(mockSessions);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    //D3 select SVG
    const svg = select(svgRef.current);
    const svgWidth = svgRef.current?.clientWidth;
    const svgHeight = svgRef.current?.clientHeight;

    //X and Y scales
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, svgWidth || 300]);
    const yScale = scaleLinear()
      .domain([0, 300])
      .range([svgHeight || 150, 0]);

    //Set line(x,y) path
    const pathLine = line<number>()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    //Draw the line
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => pathLine(value.map((value) => value.sessionLength)))
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "2px");

    return () => {
      svg.selectAll("path").remove();
    };
  }, [data]);

  return (
    <div className="LineChart">
      <p className="legend">Durée moyenne des sessions</p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
/** Created by carlos on 07/12/2022 */
