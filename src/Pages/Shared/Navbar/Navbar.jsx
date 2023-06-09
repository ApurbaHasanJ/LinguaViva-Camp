import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import Swal from "sweetalert2";

const Navbar = ({ bgClassName, textClassName }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  // Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Successfully!!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setIsNavbarVisible(isScrollingUp || currentScrollPos < 1);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`navbar h-8 border-b fixed top-0 left-0 z-50 transition-opacity duration-300 ${
        isNavbarVisible ? "opacity-100" : "opacity-0"
      } ${bgClassName} `}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className={`btn btn-ghost btn-circle ${textClassName} flex gap-3`}
          >
            <HiMenuAlt2 className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li>
              <NavLink to='/all-classes'>Classes</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="#">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <h2 className={`font-extrabold text-2xl ${textClassName}`}>LVC</h2>
      </div>
      <div className="navbar-end mr-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0}>
              <div className="w-8 rounded-full">
                {user?.photoURL ? (
                  <div className="h-8 w-8 rounded-full overflow-hidden border-sky-400  p-[1px] border-2">
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      title={user?.displayName}
                      className="w-full  object-cover rounded-full h-full"
                    />
                  </div>
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </div>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="inline-flex items-center">
            <button className="lg:px-6  px-2 py-1  lg:text-base text-xs hover:shadow-2xl bg-sky-400 hover:bg-sky-500 text-white rounded-full">
              Login
            </button>
          </Link>
        )}
        {/* {
          user? <FaUserCircle className="text-2xl"/> : <Link to='/login'>
          <button className="lg:px-6  px-2 py-1  lg:text-base text-xs hover:shadow-2xl bg-sky-400 hover:bg-sky-500 text-white rounded-full">Login</button>
        </Link>
        } */}
      </div>
    </div>
  );
};

export default Navbar;
