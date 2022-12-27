import style from "./RadarChart.module.scss";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { performanceData, StoreActionsEnum } from "../../../utils/types/types";
import { useStore } from "../../../utils/hooks/useStore";
import { useUserContext } from "../../../utils/context/Context";
import { Loader } from "../../Loader/Loader";

interface RadarChartProps {
  perfData?: performanceData[];
}

/**
 * @param {Object} props  react props
 * @param {Array} props.perfData  the array of performance data
 * @param {number} props.perfData[].value  the value of the performance data
 * @param {string} props.perfData[].category  the category of the performance data
 * @return {JSX.Element}
 */
export const RadarChartComponent = ({ perfData }: RadarChartProps) => {
  const [data, setData] = useState<performanceData[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  //If perfData is provided as a prop, use that data
  perfData && useEffect(() => perfData && setData(perfData), [perfData]);
  const { perfData: pData, isLoading, error } = useStore(userId as string, StoreActionsEnum.PERFORMANCE);

  //If perfData is not provided as a prop, fetch data from the store
  const { user } = useUserContext();
  if (!perfData) {
    useEffect(() => {
      user && setUserId(user.id || "");
      pData && setData(pData);
    }, [user, pData]);
  }

  return (
    <div className={style.RadarChart}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        data?.length > 0 && (
          <ResponsiveContainer height={263} width="99%">
            <RadarChart margin={{ top: 10, right: 50, left: 50, bottom: 10 }} data={data || pData}>
              <PolarGrid radialLines={false} stroke="#fff" />
              <PolarRadiusAxis tickCount={5} stroke={"none"} />
              <PolarAngleAxis
                fontWeight={500}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickSize={10}
                dataKey="category"
                stroke="#fff"
              />
              <Radar dataKey="value" fill="#FF0000" fillOpacity={0.7} />
            </RadarChart>
          </ResponsiveContainer>
        )
      )}
    </div>
  );
};

RadarChartComponent.propTypes = {
  perfData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
};

/** Created by carlos on 16/12/2022 */
