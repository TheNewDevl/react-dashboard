import { useContext } from "react";
import { UserContext } from "../utils/context/Context";
import { IdSelector } from "../Pages/IdSelector/IdSelector";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <IdSelector />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
/** Created by carlos on 26/12/2022 */
