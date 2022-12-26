import Header from "./components/Header/Header";
import VerticalLayout from "./components/VerticalLayout/VerticalLayput";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <VerticalLayout />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
