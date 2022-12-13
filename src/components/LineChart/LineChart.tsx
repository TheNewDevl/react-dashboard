import "./LineChart.scss";
import { useEffect, useRef, useState } from "react";
import { mockSessions } from "../../mocks/mockData";
import { axisBottom, curveCardinal, line, scaleLinear, select } from "d3";

interface Data {
  day: number;
  sessionLength: number;
}

const LineChart = () => {
  const [data, setData] = useState(mockSessions);
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = { top: 78, right: 0, bottom: 60, left: 0 };

  const mapDays: { [key: number]: string } = {
    1: "L",
    2: "M",
    3: "M",
    4: "J",
    5: "V",
    6: "S",
    7: "D",
  };

  useEffect(() => {
    //D3 select SVG
    const svg = select(svgRef.current);

    //Tooltip that will display the exact value of the point
    const ToolTip = select("#lineChartContainer")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /**
     * Hide or display a point circle
     * @param {boolean} toDisplay if true, display the tooltip, else hide it
     * @param {{day: number, sessionLength: number}} value use to retrieve the correct circle
     */
    const setCircleOpacity = (toDisplay: boolean, value: Data) => {
      svg
        .selectAll("circle")
        .nodes()
        .forEach((node) => {
          const circle = select(node);
          if (circle.attr("data-day") === `${value.day}`) {
            circle.style("opacity", toDisplay ? "1" : "0");
          }
        });
    };
    const handleSVG = () => {
      //Clean the svg before rendering
      svg.selectAll("*").remove();

      // Dimensions
      const chartWidth =
        parseInt(select("#lineChartContainer").style("width")) - margin.left - margin.right;
      const chartHeight =
        parseInt(select("#lineChartContainer").style("height")) - margin.top - margin.bottom;

      //Apply the dimensions to the svg
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

      /**
       * Display the tooltip setting opacity, position and text
       * @param {{day: number, sessionLength: number}} value
       */
      const toolTipDisplay = (value: Data) => {
        let xPos = xScale(data.indexOf(value));
        const tooltipWidth = +ToolTip.style("width").slice(0, -2);
        const totalWidth = chartWidth + margin.left + margin.right;
        ToolTip.style("opacity", "1")
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("left", () =>
            xPos + tooltipWidth > totalWidth ? `${xPos - tooltipWidth}px` : `${xPos}px`
          )
          .style("top", `${yScale(value.sessionLength) - 50}px`)
          .text(value.sessionLength + " min");
      };

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

      //Handle Rectangle day delimiter
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("rect")
        .attr("class", "delimiter-rect")
        .attr("x", (value, index) => xScale(index))
        .attr("y", 0)
        .attr("height", chartHeight + margin.bottom + margin.top)
        .on("mouseenter", (event, value) => {
          //Display delimiter rect
          select(event.currentTarget).style("opacity", "0.1");
          //Display tooltip
          toolTipDisplay(value);
          //Display circle
          setCircleOpacity(true, value);
        })
        .on("mouseout", (event, value) => {
          //Hide delimiter rect
          select(event.currentTarget).style("opacity", "0").transition();
          //Hide tooltip
          ToolTip.style("opacity", 0);
          //Hide circle
          setCircleOpacity(false, value);
        });

      //Set the path line
      svg
        .selectAll("path")
        .attr("class", "line")
        .data([data])
        .join("path")
        .attr("d", (value) => pathLine(value.map((value) => value.sessionLength)))
        .attr("fill", "none")
        .attr("stroke", "url(#gradient)");

      //Handle circle Points
      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "point-circle")
        .attr("cx", (value, index) => xScale(index))
        .attr("cy", (value) => yScale(value.sessionLength))
        .attr("r", 3)
        .attr("data-day", (value) => value.day)
        .on("mouseover", (event, value) => {
          select(event.target).transition().duration(200).style("opacity", "1");
          toolTipDisplay(value);
        })
        .on("mouseout", (event) => {
          select(event.target).transition().duration(200).style("opacity", "0");
          ToolTip.style("opacity", 0);
        });

      //Append bottom axis
      svg
        .append("g")
        .attr("class", "lineChartAxis")
        .attr("transform", `translate(0, ${chartHeight + margin.top + margin.bottom / 2})`)
        .call(
          axisBottom(
            scaleLinear()
              .domain([0, data.length - 1])
              .range([20, chartWidth - 20])
          )
            .ticks(data.length)
            .tickFormat((v, i) => (data[i] ? mapDays[data[i].day] : ""))
            .tickSizeInner(0)
        );
    };
    handleSVG();
    window.addEventListener("resize", handleSVG);

    return () => {
      svg.selectAll("*").remove();
      ToolTip.remove();
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
