import "./Header.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/context/Context";
import { useContext } from "react";

/**
 * @return {JSX.Element}
 * @constructor
 */
const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Accueil</Link>
          </li>
          <li>
            <Link to={`/user/${user?.id}`}>Profil</Link>
          </li>
          <li>
            <a href="#">Réglage</a>
          </li>
          <li>
            <a href="#">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
/** Created by carlos on 30/11/2022 */
