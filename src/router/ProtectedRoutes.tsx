import { useContext } from "react";
import { UserContext } from "../utils/context/Context";
import { IdSelector } from "../Pages/IdSelector/IdSelector";
import { Outlet } from "react-router-dom";

/**
 * @component ProtectedRoutes component
 * If user context is not set, display the IdSelector component, else it returns the selected route
 * @return {JSX.Element}
 * @example
 *  <Route element={<ProtectedRoute />}>
 *         <Route path="/" element={<Accueil />} />
 *  </Route>
 */
const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <IdSelector />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
/** Created by carlos on 26/12/2022 */
