import style from "./Profil.module.scss";
import Main from "../../Layout/Main/Main";
import LineChartComponent from "../../components/Charts/LineChart/LineChart";
import { KeyDataCard } from "../../components/KeyDataCard/KeyDataCard";
import { RadarChartComponent } from "../../components/Charts/RadarChart/RadarChartComponent";
import { BarChartComponent } from "../../components/Charts/BarChartComponent/BarChartComponent";
import { RadialChartComponent } from "../../components/Charts/RadialChartComponent/RadialChartComponent";
import { useStore } from "../../utils/hooks/useStore";
import { StoreActionsEnum } from "../../utils/types/types";
import { useUserContext } from "../../utils/context/Context";
import { Loader } from "../../components/Loader/Loader";

interface ProfilProps {}

export const Profil = ({}: ProfilProps) => {
  //Retrieve user context
  const { user } = useUserContext();
  //Use store to fetch data
  const { error, isLoading, ...data } = useStore(user?.id as string, StoreActionsEnum.ALL);
  const { perfData, averageSessions, activityData } = data;

  const Graphs = () => {
    if (error) {
      return <p>{error}</p>;
    } else if (activityData && perfData && averageSessions && user?.dayScore && user.keyData) {
      return (
        <div className={style.content_wrapper}>
          <div className={style.graph_container}>
            <div className={style.graph_full_width}>
              <BarChartComponent activityData={activityData} />
            </div>
            <div className={style.graph_flex}>
              <RadarChartComponent perfData={perfData} />
              <LineChartComponent graphData={averageSessions} />
              <RadialChartComponent scoreData={user.dayScore} />
            </div>
          </div>
          <div className={style.key_data_wrapper}>
            {user.keyData.map((data, index) => {
              const value = Object.values(data)[0];
              const title = Object.keys(data)[0];
              return <KeyDataCard key={index} image={`/${title}.png`} title={title} value={value} />;
            })}
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <Main>
      <h1>
        Bonjour <span>{user?.firstName && user.firstName}</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      {isLoading ? <Loader /> : <Graphs />}
    </Main>
  );
};

/** Created by carlos on 14/12/2022 */
