import style from "./Profil.module.scss";
import Main from "../../Layout/Main/Main";
import LineChartComponent from "../../components/LineChart/LineChart";
import { useParams } from "react-router-dom";
import { KeyDataCard } from "../../components/KeyDataCard/KeyDataCard";
import { RadarChartComponent } from "../../components/RadarChart/RadarChartComponent";
import { BarChartComponent } from "../../components/BarChartComponent/BarChartComponent";
import { RadialChartComponent } from "../../components/RadialChartComponent/RadialChartComponent";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";

interface ProfilProps {}

export const Profil = ({}: ProfilProps) => {
  //Get the id from the url
  const { id } = useParams();
  const { averageSessions, perfData, activityData, user } = useStore(id);

  useEffect(() => {}, [activityData]);

  return (
    <Main>
      <h1>
        Bonjour <span>{user && user.firstName && user.firstName}</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className={style.content_wrapper}>
        <div className={style.graph_container}>
          <div className={style.graph_full_width}>
            {activityData && <BarChartComponent activityData={activityData} />}
          </div>
          <div className={style.graph_flex}>
            {perfData && <RadarChartComponent perfData={perfData} />}
            {averageSessions && <LineChartComponent graphData={averageSessions} />}
            {user && user.dayScore && <RadialChartComponent scoreData={user.dayScore} />}
          </div>
        </div>

        <div className={style.key_data_wrapper}>
          {user &&
            user.keyData &&
            user.keyData.map((data, index) => {
              const value = Object.values(data)[0];
              const title = Object.keys(data)[0];
              return (
                <KeyDataCard key={index} image={`./${title}.png`} title={title} value={value} />
              );
            })}
        </div>
      </div>
    </Main>
  );
};

/** Created by carlos on 14/12/2022 */
//
