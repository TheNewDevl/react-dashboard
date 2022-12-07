import Header from "./components/Header/Header";
import VerticalLayout from "./components/VerticalLayout/VerticalLayput";
import Main from "./Layout/Main/Main";
import GraphsContainer from "./Layout/GraphsContainer/GraphsContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <VerticalLayout />
      <Main>
        <h1>
          Bonjour <span>Thomas</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <GraphsContainer />
      </Main>
    </div>
  );
}

export default App;
