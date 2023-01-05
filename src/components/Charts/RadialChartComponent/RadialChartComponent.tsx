import style from "./RadialChartComponent.module.scss";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../../utils/context/Context";

interface ScoreData {
  name: string;
  value: number;
}

/**
 * @component Radial chart component
 * Renders a radial chart with the user's score data.
 * @important As fetch user route send this data together, data is already in the user store context to prevent unnecessary fetches.
 * @return {JSX.Element}
 * @example
 * <RadialChartComponent />
 */
export const RadialChartComponent = () => {
  const [data, setData] = useState<ScoreData[]>([]);
  const svgRef = useRef<HTMLDivElement | null>(null);
  const totalAchievement = 100;
  const inner = [{ name: "Achieved", value: 20 }];
  const COLORS = ["#FF0101", "rgba(0,0,0,0)"];

  const { user } = useUserContext();

  useEffect(() => {
    if (user && user.dayScore?.length > 0) {
      setData([...user.dayScore, { name: "remaining", value: totalAchievement - user.dayScore[0].value }]);
    }
  }, [user]);

  const Legend = () => {
    if (data && data.length > 0 && data[0].value) {
      return (
        <div className={style.legend}>
          <span>{data[0].value}%</span>
          <span>de votre</span>
          <span>objectif</span>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div ref={svgRef} className={style.RadialChartComponent}>
      <p className={style.title}>Score</p>
      <Legend />
      <ResponsiveContainer width="99%" height={263}>
        <PieChart>
          <Pie
            blendStroke
            startAngle={210}
            endAngle={-150}
            data={data}
            cornerRadius={10}
            innerRadius={75}
            outerRadius={85}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Pie blendStroke data={inner} innerRadius={0} outerRadius={75} dataKey="value" fill={"#fff"} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/** Created by carlos on 16/12/2022 */
