import Header from "./components/Header/Header";
import VerticalLayout from "./components/VerticalLayout/VerticalLayput";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/Router";
import { UserProvider } from "./utils/context/Context";

/**
 * @component App - Main component of the app.
 * @return {JSX.Element}
 */
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <VerticalLayout />
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
