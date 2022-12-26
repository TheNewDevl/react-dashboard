import { Route, Routes } from "react-router-dom";
import { Profil } from "../Pages/Profil/Profil";
import ProtectedRoute from "./ProtectedRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/:id" element={<Profil />} />
      </Route>
    </Routes>
  );
};
