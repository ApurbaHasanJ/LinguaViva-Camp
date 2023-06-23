import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Instructors from "../Pages/Instructors/Instructors";
import AddClass from "../Pages/Dashboard/AddAClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/profile",
        element: <PrivateRoutes><Profile /></PrivateRoutes>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      // admin routes
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      // Instructor routes
      {
        path: "/dashboard/my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      // student Classes
      {
        path: "/dashboard/selected-classes",
        element: <SelectedClasses />,
      },
      {
        path: "/dashboard/enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);

export default router;
