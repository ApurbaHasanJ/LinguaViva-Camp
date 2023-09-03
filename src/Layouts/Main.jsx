import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const [showNavbarBg, setShowNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setShowNavbarBg(top >= window.innerHeight);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (location.pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location.pathname]);

  const navbarBgClassName = location.pathname === "/" ? (showNavbarBg ? "bg-sky-100 " : "bg-none ") : "bg-sky-100";
  const navbarTextClassName = location.pathname === "/" ? (showNavbarBg ? "text-black " : "text-white ") : "text-black ";

  return (
    <div>
      <Navbar bgClassName={navbarBgClassName} textClassName={navbarTextClassName} />
      <div className="min-h-[100vh] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
