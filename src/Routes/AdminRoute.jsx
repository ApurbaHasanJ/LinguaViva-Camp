import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router";
import Spinner from "../Pages/Spinner/Spinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <Spinner/>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;