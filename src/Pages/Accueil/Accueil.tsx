import Main from "../../Layout/Main/Main";
import { useUserContext } from "../../utils/context/Context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import {useEffect} from "react";

/**
 * @component Home page component
 * Page not totally implemented. It displays the user's name and a button to redirect to the user's page
 * @return {JSX.Element}
 * @example
 * <Accueil />
 */
export const Accueil = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `SportSee - ${user?.firstName}`;
  }, []);

  return (
    <Main>
      <h1>Accueil</h1>
      <p>{user?.firstName}, cette page est en cours de construction.</p>
      <Button onClick={() => navigate(`/user/${user?.id}`)} text="Profil" />
    </Main>
  );
};

/** Created by carlos on 27/12/2022 */
