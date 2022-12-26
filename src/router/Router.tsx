import { Route, Routes } from "react-router-dom";
import { Profil } from "../Pages/Profil/Profil";
import { IdSelector } from "../Pages/IdSelector/IdSelector";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/:id" element={<Profil />} />
      <Route path="/" element={<IdSelector />} />
    </Routes>
  );
};
