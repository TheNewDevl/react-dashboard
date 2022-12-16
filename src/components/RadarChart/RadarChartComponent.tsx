import style from "./RadarChart.module.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

interface perfData {
  value: number;
  category: string;
}

interface RadarChartProps {
  perfData: perfData[];
}

/**
 * @param {Object} props  react props
 * @param {Array} props.perfData  the array of performance data
 * @param {number} props.perfData[].value  the value of the performance data
 * @param {string} props.perfData[].category  the category of the performance data
 * @return {JSX.Element}
 */
export const RadarChartComponent = ({ perfData }: RadarChartProps) => {
  const [data, setData] = useState<perfData[]>([]);

  useEffect(() => {
    setData(perfData);
  }, [perfData]);

  return (
    <div className={style.RadarChart}>
      <ResponsiveContainer height={263} width="99%">
        <RadarChart
          margin={{ top: 10, right: 25, left: 25, bottom: 10 }}
          data={data}
          style={{ backgroundColor: "#282D30" }}
        >
          <PolarGrid radialLines={false} stroke="#fff" />
          <PolarRadiusAxis tickCount={5} stroke={"none"} />
          <PolarAngleAxis
            fontWeight={500}
            fontSize={12}
            tickLine={false}
            tickSize={13}
            dataKey="category"
            stroke="#fff"
          />
          <Radar name="Mike" dataKey="value" fill="#FF0000" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

RadarChartComponent.propTypes = {
  perfData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

/** Created by carlos on 16/12/2022 */
