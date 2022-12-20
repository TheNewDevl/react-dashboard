import Header from "./components/Header/Header";
import VerticalLayout from "./components/VerticalLayout/VerticalLayput";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profil } from "./Pages/Profil/Profil";
import { IdSelector } from "./Pages/IdSelector/IdSelector";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <VerticalLayout />
      <Routes>
        <Route path="/:id" element={<Profil />} />
        <Route path="/" element={<IdSelector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
