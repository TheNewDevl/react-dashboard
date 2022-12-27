import Main from "../../Layout/Main/Main";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

interface ErrorProps {}

export const Error = ({}: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <Main>
      <p>Oups, cette page n'existe pas.</p>
      <Button onClick={() => navigate("/")} text={"Retour à l'accueil"} />
    </Main>
  );
};

/** Created by carlos on 27/12/2022 */
