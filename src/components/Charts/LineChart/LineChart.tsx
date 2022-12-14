import style from "./LineChart.module.scss";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  Legend,
  LegendProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {AverageDay, StoreActionsEnum} from "../../../utils/types/types";
import {useUserContext} from "../../../utils/context/Context";
import {useStore} from "../../../utils/hooks/useStore";
import {Loader} from "../../Loader/Loader";

/**
 * @component Line chart component
 * Renders a line chart with the user's average data.
 * Data can be passed as props or fetched from the store.
 * Data needs to be properly formatted.
 * @param {Object} props component props
 * @param {{day: string, sessionLength: number }[] | undefined} props.graphData - The data to display on the graph
 * @return {JSX.Element}
 * @example
 * <LineChartComponent graphData={data} />
 */

const LineChartComponent = ({ graphData }: { graphData?: AverageDay[] }) => {
  const { user } = useUserContext();
  const [data, setData] = useState<AverageDay[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  //If graphData is provided as a prop, use that data
  graphData && useEffect(() => graphData && setData(graphData), [graphData]);

  //If graphData is not provided as a prop, fetch data from the store
  const { averageSessions, isLoading, error } = useStore(userId as string, StoreActionsEnum.AVERAGE, 'format');
  if (!graphData) {
    useEffect(() => {
      user && setUserId(user.id || "");
      averageSessions && setData(averageSessions as AverageDay[]);
    }, [user, averageSessions]);
  }

  const chartRef = useRef<HTMLDivElement | null>(null);
  const [margin, setMargin] = useState({ top: 70, right: 0, left: 0, bottom: 30 });
  const height = 263;
  const [isResizing, setIsResizing] = useState(false);

  const handleMarginLeft = () => {
    if (chartRef?.current?.offsetWidth) {
      const width = chartRef.current.offsetWidth;
      setMargin({ ...margin, left: -width / 7 + 10, right: -width / 7 + 20 });
    }
  };

  useEffect(() => {
    //Prevent unnecessary CPU usage by not updating margin on every pixel of the resize
    const handleResize = () => !isResizing && setIsResizing(true);
    /** Update the left margin of the chart depending on chart width */
    handleMarginLeft();
    window.addEventListener("resize", handleResize);
    if (isResizing) {
      setTimeout(() => {
        setIsResizing(false);
        handleMarginLeft();
      }, 50);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [chartRef, isResizing]);

  /**
   * Custom Recharts Tooltip, display the exact value of the point in a div with a custom style
   * @param {Object} TooltipProps - The props of the tooltip
   * @param {Array} TooltipProps.payload - The data of the point
   * @param {number} TooltipProps.payload[0].value - The value of the point
   * @param {string} TooltipProps.payload[0].day - The day of the point
   * @param {boolean} TooltipProps.active - The state of the tooltip
   * @return {JSX.Element | null}
   */
  const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.tooltip}>
          <p className={style.value}>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  /**
   * Custom Recharts Legend, update the left position of the legend depending on the chart width
   * @param {Array?} payload
   * @param {{top?: number, left?: number, bottom?: number, right?: number} | undefined} margin
   * @return {JSX.Element | null}
   */
  const CustomLegend = ({ payload, margin }: LegendProps) => {
    return payload && payload.length ? (
      <p style={{ left: `${margin?.left ? 35 - margin.left : 35}px` }} className={style.custom_legend}>
        {payload[0].value}
      </p>
    ) : null;
  };

  /**
   * Return custom ticks for the XAxis, for convenience the date will contain last sunday to fill the line
   * But we only want to display the 7 day of the week, so we recalculate the ticks position depending on chart width
   * @param {Object} props
   * @param {number} props.y y axis tick position
   * @param {number} props.x x axis tick position
   * @param {Array} props.payload payload of the tick
   * @return {null | JSX.Element}
   */
  const CustomizedAxisTick = ({ x, y, payload }: any) => {
    const p = 20;
    const spacing = chartRef.current ? ((chartRef.current.clientWidth - p * 2) / 6) * (payload.index - 1) + p : x;
    return payload.index % 8 === 0 ? null : (
      <g transform={`translate(${spacing},${y})`}>
        <text className={style.axis} x={0} y={0} textAnchor="middle" fill="#666">
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div ref={chartRef} className={style.LineChart}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        data?.length > 0 && (
          <ResponsiveContainer className={style.test} height={height} width="99%">
            <LineChart height={height} data={data} margin={margin}>
              <defs>
                <linearGradient id="lineGradient">
                  <stop offset="40%" stopColor="#ffffff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
                </linearGradient>
              </defs>
              <YAxis
                width={0}
                tickFormatter={() => ""}
                tickSize={0}
                axisLine={false}
                domain={[
                  Math.floor(Math.min(...data.map((d) => d.sessionLength))),
                  Math.ceil(Math.max(...data.map((d) => d.sessionLength))),
                ]}
              />
              <XAxis tickMargin={30} axisLine={false} tickSize={0} dataKey="day" tick={<CustomizedAxisTick />} />
              <Tooltip cursor={false} wrapperStyle={{ outline: "none" }} content={<CustomTooltip />} separator="" />
              <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="url(#lineGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#ffffff",
                  stroke: "rgba(255, 255, 255, 0.2)",
                  strokeWidth: 10,
                }}
              />
              <Legend
                verticalAlign={"top"}
                content={<CustomLegend />}
                payload={[{ value: "Dur??e moyenne des sessions" }]}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      )}
    </div>
  );
};

LineChartComponent.propTypes = {
  graphData: PropTypes.arrayOf(
    PropTypes.exact({
      day: PropTypes.string.isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ),
};

export default LineChartComponent;
/** Created by carlos on 07/12/2022 */
