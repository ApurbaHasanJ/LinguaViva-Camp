import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const withOutBgColor = location.pathname === "/";
  
  return (
    <div>
      {withOutBgColor ? (
        <Navbar bgClassName="bg-none" textClassName="text-white" />
      ) : (
        <Navbar bgClassName="bg-sky-50" textClassName="text-black" />
      )}
      <div className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
