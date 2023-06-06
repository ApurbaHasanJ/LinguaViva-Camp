import { Link } from "react-router-dom";
import logo from "../../../assets/logo";
import { useState } from "react";

const Navbar = () => {
//   const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//   console.log(user);

  // Handle Logout
//   const handleLogout = () => {
//     logOut()
//       .then()
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   const navItems = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) => (isActive ? "active" : "default")}
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/all-toys"
//           className={({ isActive }) => (isActive ? "active" : "default")}
//         >
//           All Toys
//         </NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/my-toys"
//               className={({ isActive }) => (isActive ? "active" : "default")}
//             >
//               My Toys
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/add-a-toy"
//               className={({ isActive }) => (isActive ? "active" : "default")}
//             >
//               Add A Toy
//             </NavLink>
//           </li>
//         </>
//       )}
//       <li>
//         <NavLink
//           to="/blogs"
//           className={({ isActive }) => (isActive ? "active" : "default")}
//         >
//           Blog
//         </NavLink>
//       </li>
//     </>
//   );

  // user Status
//   const userStatus = (
//     <>
//       <li>
//         <Link to="/all-toys">
//           <HiOutlineShoppingCart className="w-7 h-7 duration-300 text-[#FB7185] hover:text-rose-500" />
//         </Link>
//       </li>
//       {user ? (
//         <li className="dropdown dropdown-end">
//           <label tabIndex={0}>
//             <div className="w-10 rounded-full">
//               {user?.photoURL ? (
//                 <img
//                   src={user?.photoURL}
//                   alt={user?.displayName}
//                   title={user?.displayName}
//                   className="w-full rounded-full h-full"
//                 />
//               ) : (
//                 <FaUser className="text-2xl" />
//               )}
//             </div>
//           </label>
//           <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//             <li>
//               <Link to="/profile" className="justify-between">
//                 Profile
//                 <span className="badge">New</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/settings">Settings</Link>
//             </li>
//             <li>
//               <button onClick={handleLogout}>Logout</button>
//             </li>
//           </ul>
//         </li>
//       ) : (
//         <li className="">
//           <Link to="/login" className="inline-flex items-center">
//             <button className="btn-sec">Log In</button>
//           </Link>
//         </li>
//       )}
//     </>
//   );
  return (
    <div className="my-container relative mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl flex items-center justify-between">
      {/* Logo Section */}
      {/* <Link to="/" className="inline-flex items-center">
        <img src={logo} alt="" className="lg:w-20 md:w-16 w-12" />
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-rose-400">
          Figurio
        </h2>
      </Link> */}

      {/* Nav Items Section */}
      {/* <ul className="items-center mx-auto text-lg font-bold hidden space-x-8 lg:flex">
        {navItems}
      </ul>
      <ul className="lg:flex items-center gap-6  hidden ">{userStatus}</ul> */}

      {/* Mobile Navbar Section */}
       <div className="lg:hidden">
        {/* Dropdown Open Button */}
       <button
          aria-label="Open Menu"
          title="Open Menu"
          onClick={() => setIsMenuOpen(true)}
        >
          {/* <Bars3BottomRightIcon className="w-7 text-rose-400" /> */}
        </button>
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full z-10">
            <div className="p-5 bg-white border rounded shadow-sm">
              {/* Logo & Button section */}
              <div className="flex items-center justify-between px-1 mb-4">
                <div>
                  <Link to="/" className="inline-flex items-center">
                    <img src={logo} alt="" className="lg:w-20 md:w-16 w-12" />
                    <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-rose-400">
                      Figurio
                    </h2>
                  </Link>
                </div>
                {/* Dropdown menu close button */}
                <div>
                  <button
                    aria-label="Close Menu"
                    title="Close Menu"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <XMarkIcon className="w-7 hover:bg-rose-100 hover:rounded-xl text-rose-400" />
                  </button>
                </div>
              </div>
              {/* Mobile Nav Items Section */}
             {/*  <nav>
                <ul className="space-y-4">
                  {navItems}
                  <ul className="flex justify-end items-center gap-7">
                    {userStatus}
                  </ul>
                </ul>
              </nav>*/}
            </div>
          </div>
        )}
      </div> 
    </div>
  );
};

export default Navbar;