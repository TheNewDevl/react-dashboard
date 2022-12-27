import { Route, Routes } from "react-router-dom";
import { Profil } from "../Pages/Profil/Profil";
import ProtectedRoute from "./ProtectedRoutes";
import { RadarChartComponent } from "../components/Charts/RadarChart/RadarChartComponent";
import Main from "../Layout/Main/Main";
import LineChartComponent from "../components/Charts/LineChart/LineChart";
import { BarChartComponent } from "../components/Charts/BarChartComponent/BarChartComponent";
import { RadialChartComponent } from "../components/Charts/RadialChartComponent/RadialChartComponent";
import { Error } from "../Pages/Error/Error";
import { Accueil } from "../Pages/Accueil/Accueil";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/:id" element={<Profil />} />
        <Route path="/:id/performance" element={<Main children={<RadarChartComponent />} />} />
        <Route path="/:id/activity" element={<Main children={<BarChartComponent />} />} />
        <Route path="/:id/average" element={<Main children={<LineChartComponent />} />} />
        <Route path="/:id/score" element={<Main children={<RadialChartComponent />} />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
