import { HiChevronDoubleRight } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaUserCircle, FaUsers } from "react-icons/fa";

import { Helmet } from "react-helmet";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { AiFillHome } from "react-icons/ai";
import Footer from "../../Pages/Shared/Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  // TODO: Load data from the server to have dynamic isAdmin based on Data
  const isAdmin = true;
  const isInstructor = false;
  // const isStudent = true;

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
                <ul className="menu menu-compact z-50 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
          </div>
        </div>
      </div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className=" mr-auto bg-sky-50 py-2 px-7 drawer-button lg:hidden"
          >
            <HiChevronDoubleRight className="text-2xl " />
          </label>
          {/* Page content here */}
          <div className="min-h-[100vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
        <div className="drawer-side border-r bg-sky-50">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
          <ul className="menu gap-1 p-3 w-80 h-full bg-sky-50 text-base-content">
            {isAdmin ? (
              <>
                <li>
                  <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/admin-home">
                    <AiFillHome /> <p>Admin Home</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/classes">
                    <SiGoogleclassroom />
                    <p>Manage Classes</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/users">
                    <FaUsers />
                    <p>Manage Users</p>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {isInstructor ? (
                  <>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="instructor-home">
                        <AiFillHome /> <p>Instructor Home</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/my-classes">
                        <FaUsers />
                        <p>My Classes</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/add-class">
                        <SiGoogleclassroom />
                        <p>Add A Class</p>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {" "}
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/student-home">
                        <AiFillHome /> <p>Student Home</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/selected-classes">
                        <FaUsers />
                        <p>Selected Classes</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/enrolled-classes">
                        <SiGoogleclassroom />
                        <p>Enrolled Classes</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/payment">
                        <SiGoogleclassroom />
                        <p>Payment</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/dashboard/payment-history">
                        <SiGoogleclassroom />
                        <p>Payment History</p>
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
            {/* Sidebar content here */}

            <div className="divider"></div>
            <li>
              <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/">
                <AiFillHome /> <p>Home</p>
              </NavLink>
            </li>

            <li>
              <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/instructors">
                <FaChalkboardTeacher /> <p>Instructors</p>
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/all-classes">
                <GiTeacher />
                <p>Classes</p>
              </NavLink>
            </li>

            <li>
              <NavLink className={({isActive})=> (isActive? "active" : "default")} to="/about">
                <BsFillInfoSquareFill />
                <p>About</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
