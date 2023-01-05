import style from "./Profil.module.scss";
import Main from "../../Layout/Main/Main";
import LineChartComponent from "../../components/Charts/LineChart/LineChart";
import {KeyDataCard} from "../../components/KeyDataCard/KeyDataCard";
import {RadarChartComponent} from "../../components/Charts/RadarChart/RadarChartComponent";
import {BarChartComponent} from "../../components/Charts/BarChartComponent/BarChartComponent";
import {RadialChartComponent} from "../../components/Charts/RadialChartComponent/RadialChartComponent";
import {useStore} from "../../utils/hooks/useStore";
import {ActivityData, AverageDay, PerformanceData, StoreActionsEnum} from "../../utils/types/types";
import {useUserContext} from "../../utils/context/Context";
import {Loader} from "../../components/Loader/Loader";
import {useEffect} from "react";

/**
 * @component Profil component
 * Display the user's data and charts
 * Also contain a loader that is displayed while the data is being fetched
 * @return {JSX.Element}
 * @example
 * <Profil />
 */
export const Profil = () => {
  //Retrieve user context
  const { user } = useUserContext();
  useEffect(() => {
    document.title = `Profil de ${user?.firstName}`;
  }, []);

  //Use store to fetch data
  const { error, isLoading, ...data } = useStore(user?.id as string, StoreActionsEnum.ALL, 'format');
  const { perfData, averageSessions, activityData } = data;

  /**
   * If the store returns an error, display it, else display the graphs
   * @return {JSX.Element | null}
   * @example <ErrorOrGraphs />
   */
  const ErrorOrGraphs = () => {
    if (error) {
      return <p>{error}</p>;
    } else if (activityData && perfData && averageSessions && user?.dayScore && user.keyData) {
      return (
        <div className={style.content_wrapper}>
          <div className={style.graph_container}>
            <div className={style.graph_full_width}>
              <BarChartComponent activityData={activityData as ActivityData[]} />
            </div>
            <div className={style.graph_flex}>
              <RadarChartComponent perfData={perfData as PerformanceData[]} />
              <LineChartComponent graphData={averageSessions as AverageDay[]} />
              <RadialChartComponent />
            </div>
          </div>
          <div className={style.key_data_wrapper}>
            {user.keyData.map((data, index) => {
              const title = Object.keys(data)[0];
              const value = data[title];
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
      {isLoading ? <Loader /> : <ErrorOrGraphs />}
    </Main>
  );
};

/** Created by carlos on 14/12/2022 */
