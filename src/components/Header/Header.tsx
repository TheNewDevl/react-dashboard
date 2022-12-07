import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="./logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="src/components/Header/Header#">Accueil</a>
          </li>
          <li>
            <a href="src/components/Header/Header#">Profil</a>
          </li>
          <li>
            <a href="src/components/Header/Header#">Réglage</a>
          </li>
          <li>
            <a href="src/components/Header/Header#">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
/** Created by carlos on 30/11/2022 */
