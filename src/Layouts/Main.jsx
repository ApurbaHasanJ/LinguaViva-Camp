import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
// import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;