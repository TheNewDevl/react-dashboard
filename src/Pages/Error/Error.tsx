import Main from "../../Layout/Main/Main";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

/**
 * @component Error page component
 * Page displayed when the user tries to access a page that does not exist
 * It displays a button to redirect to the home page
 * @return {JSX.Element}
 * @example
 * <Error />
 */
export const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "SportSee - Error";
  }, []);

  return (
    <Main>
      <p>Oups, cette page n&apos;existe pas.</p>
      <Button onClick={() => navigate("/")} text={"Retour à l'accueil"} />
    </Main>
  );
};

/** Created by carlos on 27/12/2022 */
