import style from "./RadialChartComponent.module.scss";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEffect, useRef, useState } from "react";

interface ScoreData {
  name: string;
  value: number;
}

interface RadialChartComponentProps {
  scoreData: ScoreData[];
}

/**
 * Will display a radial chart with the score of the user
 * @param {Object} props component props
 * @param {Object[]} props.scoreData - The data to display on the graph
 * @param {string} props.scoreData[].name - The name of the score
 * @param {number} props.scoreData[].value - The percentage score
 * @return {JSX.Element}
 */
export const RadialChartComponent = ({ scoreData }: RadialChartComponentProps) => {
  const [data, setData] = useState<ScoreData[]>([]);
  const svgRef = useRef<HTMLDivElement | null>(null);
  const totalAchievement = 100;
  const inner = [{ name: "Achieved", value: 20 }];
  const COLORS = ["#FF0101", "rgba(0,0,0,1)"];

  useEffect(() => {
    if (scoreData.length > 0) {
      const remaining = { name: "remaining", value: totalAchievement - scoreData[0].value };
      setData([...scoreData, remaining]);
    }
  }, [scoreData]);

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

          <Pie
            blendStroke
            data={inner}
            innerRadius={0}
            outerRadius={75}
            dataKey="value"
            fill={"#fff"}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/** Created by carlos on 16/12/2022 */
