import { useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {

  const [cookies] = useCookies('token');

  // Now you can access the token from cookie
  
  const token = cookies;
  console.log(token);
  const { user } = useSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/" />;
}
