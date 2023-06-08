import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Spinner from "../Pages/Spinner/Spinner";


const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
        <Spinner/>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};


export default PrivateRoutes;