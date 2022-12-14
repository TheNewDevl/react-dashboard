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
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ActivityData, StoreActionsEnum} from "../../../utils/types/types";
import {useStore} from "../../../utils/hooks/useStore";
import {useUserContext} from "../../../utils/context/Context";
import {Loader} from "../../Loader/Loader";

interface BarChartComponentProps {
  activityData?: ActivityData[];
}

/**
 * @component Bar chart component
 * Renders a bar chart with the user's activity data.
 * Data can be passed as props or fetched from the store
 * Data needs to be properly formatted
 * @param {Object} props component props
 * @param {{day: number, kilogram: number, calories: number}[]} props.activityData - The data to display on the graph
 * @return {JSX.Element}
 * @example
 * <BarChartComponent activityData={activityData} />
 */
export const BarChartComponent = ({ activityData }: BarChartComponentProps) => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const margin = { top: 24, right: 30, left: 40, bottom: 24 };
  const ticksStyle = { fontSize: "14px", fontWeight: 500, fill: "#9B9EAC" };

  //If activityData is provided as a prop, use that data
  activityData && useEffect(() => activityData && setData(activityData), [activityData]);
  const { activityData: aData, isLoading, error } = useStore(userId as string, StoreActionsEnum.ACTIVITY, 'format');

  //If activityData is not provided as a prop, fetch data from the store
  const { user } = useUserContext();
  if (!activityData) {
    useEffect(() => {
      user && setUserId(user.id || "");
      aData && setData(aData as ActivityData[]);
    }, [user, aData]);
  }

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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        data?.length > 0 && (
          <>
            <p className={style.name}>Activit?? quotidienne</p>
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
                  dataKey={data[0] && Object.keys(data[0]).length >= 3 ? Object.keys(data[0])[1] : ""}
                  fill="#282D30"
                />
                <Bar
                  radius={[3, 3, 0, 0]}
                  yAxisId="left"
                  dataKey={data[0] && Object.keys(data[0]).length >= 3 ? Object.keys(data[0])[2] : ""}
                  fill="#E60000"
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        )
      )}
    </div>
  );
};

BarChartComponent.propTypes = {
  activityData: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      "Poids (kg)": PropTypes.number.isRequired,
      "Calories brul??es (kCal)": PropTypes.number.isRequired,
    })
  ),
};
/** Created by carlos on 16/12/2022 */
