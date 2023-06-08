import { HiChevronDoubleRight } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaUserCircle, FaUsers } from "react-icons/fa";

import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { AiFillHome } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();

  // const location = useLocation();
  // get redirect path
  // const from = location.state?.from?.pathname || "/";

  const { user, logOut } = useContext(AuthContext);

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
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | LVC</title>
      </Helmet>
      <div>
        <div className="grid navbar bg-sky-50 h-8 border-b grid-cols-3">
          <div>
            <h2 className={"font-extrabold text-2xl ml-6 text-black"}>
              Dashboard
            </h2>
          </div>
          <div className="navbar-center mx-auto">
            <h2 className={"font-extrabold text-2xl text-black"}>LVC</h2>
          </div>
          <div className=" mr-4 ml-auto">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  <div className="w-8 rounded-full">
                    {user?.photoURL ? (
                      <div className="h-8 w-8 rounded-full overflow-hidden border-sky-500  p-[1px] border-2">
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
                <ul className="menu menu-compact z-50 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
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
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className=" mr-auto bg-sky-50 py-2 px-7 drawer-button lg:hidden"
          >
            <HiChevronDoubleRight className="text-2xl " />
          </label>
        </div>
        <div className="drawer-side bg-sky-50">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
          <ul className="menu p-4 w-80 h-full bg-sky-50 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/">
                <AiFillHome /> <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="manage-classes">
                <SiGoogleclassroom />
                <p>Manage Classes</p>
              </Link>
            </li>
            <li>
              <Link to="manage-classes">
                <FaUsers />
                <p>Manage Users</p>
              </Link>
            </li>
            <div className="divider"></div>

            <li>
              <Link>
                <FaChalkboardTeacher /> <p>Instructors</p>
              </Link>
            </li>
            <li>
              <Link>
                <GiTeacher />
                <p>Classes</p>
              </Link>
            </li>

            <li>
              <Link>
                <BsFillInfoSquareFill />
                <p>About</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
