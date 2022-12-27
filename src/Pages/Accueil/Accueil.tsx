import Main from "../../Layout/Main/Main";
import { useUserContext } from "../../utils/context/Context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

interface AccueilProps {}

export const Accueil = ({}: AccueilProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Main>
      <h1>Accueil</h1>
      <p>{user?.firstName}, cette page est en cours de construction.</p>
      <Button onClick={() => navigate(`/${user?.id}`)} text="Profil" />
    </Main>
  );
};

/** Created by carlos on 27/12/2022 */
