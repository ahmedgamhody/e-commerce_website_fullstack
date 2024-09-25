import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../context/CurrentUser";

function RequierBack() {
  const user = useContext(AuthUser);

  return user.user.username ? <Navigate to="/" replace={true} /> : <Outlet />;
}

export default RequierBack;
