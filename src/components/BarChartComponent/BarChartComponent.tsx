import style from "./BarChartComponent.module.scss";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ActivityData } from "../../types/types";

interface BarChartComponentProps {
  activityData: ActivityData[];
}

/**
 * @param {Object} props component props
 * @param {Object[]} props.activityData - The data to display on the graph
 * @param {number} props.activityData[].day - The day of the session
 * @param {number} props.activityData[].kilogram - Bar 1 value
 * @param {number} props.activityData[].calories - Bar 2 value
 * @return {JSX.Element}
 */
export const BarChartComponent = ({ activityData }: BarChartComponentProps) => {
  const [data, setData] = useState<ActivityData[]>([]);
  const margin = { top: 24, right: 30, left: 40, bottom: 24 };
  const ticksStyle = { fontSize: "14px", fontWeight: 500, fill: "#9B9EAC" };

  useEffect(() => {
    setData(activityData);
  }, []);

  /**
   * Custom Recharts Tooltip, display the exact value of the point in a div with a custom style
   * @param {Object} TooltipProps - The props of the tooltip
   * @param {Array} TooltipProps.payload - The data of the point
   * @param {number} TooltipProps.payload[0].value - Kilograms cat
   * @param {number} TooltipProps.payload[1].value - Kilocalories cat
   * @param {boolean} TooltipProps.active - The state of the tooltip
   * @return {JSX.Element | null}
   */
  const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.tooltip}>
          <p className={style.value}>{`${payload[0].value}Kg`}</p>
          <p className={style.value}>{`${payload[1].value}Kcal`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={style.BarChartComponent}>
      <p className={style.name}>Activité quotidienne</p>
      <ResponsiveContainer width="99%" height={320}>
        <BarChart barSize={7} data={data} margin={margin} barGap={8}>
          <CartesianGrid vertical={false} strokeDasharray="2 1" />
          <XAxis
            minTickGap={0}
            tickSize={0}
            tick={ticksStyle}
            tickMargin={16}
            dataKey="day"
            axisLine={{ stroke: "#DEDEDE" }}
          />
          <YAxis tickCount={3} width={0} yAxisId="left" orientation="left" />
          <YAxis
            domain={["dataMin -10", "dataMax + 5"]}
            tickCount={3}
            tickMargin={30}
            tick={ticksStyle}
            tickLine={false}
            axisLine={false}
            orientation="right"
            yAxisId="right"
          />

          <Tooltip wrapperStyle={{ outline: "none" }} content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={ticksStyle}
            height={80}
            verticalAlign="top"
            align="right"
          />

          <Bar
            radius={[3, 3, 0, 0]}
            yAxisId="right"
            dataKey={
              activityData[0] && Object.keys(activityData[0]).length >= 3
                ? Object.keys(activityData[0])[1]
                : ""
            }
            fill="#282D30"
          />
          <Bar
            radius={[3, 3, 0, 0]}
            yAxisId="left"
            dataKey={
              activityData[0] && Object.keys(activityData[0]).length >= 3
                ? Object.keys(activityData[0])[2]
                : ""
            }
            fill="#E60000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChartComponent.propTypes = {
  activityData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      "Poids (kg)": PropTypes.number.isRequired,
      "Calories brulées (kCal)": PropTypes.number.isRequired,
    })
  ).isRequired,
};
/** Created by carlos on 16/12/2022 */
