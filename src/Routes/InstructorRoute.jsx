import useAuth from "../Hooks/useAuth";
import useInstructor from "../Hooks/useInstructor";
import { Navigate, useLocation } from "react-router";
import Spinner from "../Pages/Spinner/Spinner";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <Spinner />;
  }

  if (user && isInstructor) {
    return children;
  }

  return (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default InstructorRoute;
