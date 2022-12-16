import style from "./Profil.module.scss";
import Main from "../../Layout/Main/Main";
import LineChartComponent from "../../components/LineChart/LineChart";
import { useParams } from "react-router-dom";
import { KeyDataCard } from "../../components/KeyDataCard/KeyDataCard";
import {
  mockKeyData,
  mockPerfData,
  mockSessions,
  mockSessionsActivity,
} from "../../mocks/mockData";
import { RadarChartComponent } from "../../components/RadarChart/RadarChartComponent";
import { BarChartComponent } from "../../components/BarChartComponent/BarChartComponent";

interface ProfilProps {}

export const Profil = ({}: ProfilProps) => {
  //Get the id from the url
  const { id } = useParams();

  return (
    <Main>
      <h1>
        Bonjour <span>Thomas</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className={style.content_wrapper}>
        <div className={style.graph_container}>
          <div className={style.graph_full_width}>
            <BarChartComponent activityData={mockSessionsActivity} />
          </div>
          <div className={style.graph_flex}>
            <RadarChartComponent perfData={mockPerfData} />
            <LineChartComponent graphData={mockSessions} />
            <LineChartComponent graphData={mockSessions} />
          </div>
        </div>

        <div className={style.key_data_wrapper}>
          {mockKeyData.map((data, index) => {
            const value = Object.values(data)[0];
            const title = Object.keys(data)[0];
            return <KeyDataCard key={index} image={`./${title}.png`} title={title} value={value} />;
          })}
        </div>
      </div>
    </Main>
  );
};

/** Created by carlos on 14/12/2022 */
//
