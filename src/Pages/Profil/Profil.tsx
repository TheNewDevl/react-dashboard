import Style from "./Profil.module.scss";
import Main from "../../Layout/Main/Main";
import GraphsContainer from "../../Layout/GraphsContainer/GraphsContainer";
import LineChart from "../../components/LineChart/LineChart";
import { useParams } from "react-router-dom";

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
      <GraphsContainer>
        <LineChart />
      </GraphsContainer>
      div
    </Main>
  );
};

/** Created by carlos on 14/12/2022 */
