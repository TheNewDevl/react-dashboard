import "./Header.scss";

/**
 * @return {JSX.Element}
 * @constructor
 */
const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="./logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Accueil</a>
          </li>
          <li>
            <a href="#">Profil</a>
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
