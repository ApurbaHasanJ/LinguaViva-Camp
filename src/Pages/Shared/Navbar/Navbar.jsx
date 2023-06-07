import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ bgClassName, textClassName }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Instructors</Link>
            </li>
            <li>
              <Link>Classes</Link>
            </li>
            <li>
              <Link>Dashboard</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <h2 className={`font-extrabold ${textClassName}`}>LVC</h2>
      </div>
      <div className="navbar-end ">
        <Link to='/login'>
          <button className="lg:px-6  px-2 py-1  lg:text-base text-xs hover:shadow-2xl bg-sky-400 hover:bg-sky-500 text-white rounded-full">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
