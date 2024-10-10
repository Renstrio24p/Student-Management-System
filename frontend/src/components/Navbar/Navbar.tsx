import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../../constants/NavLinks";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../auth/Zustand";

type Props = {};

export default function Navbar({}: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control the mobile menu

  const { isAuthenticated, logout } = useAuthStore(); // Get auth state and logout function

  const links = navLinks.map(link => (
    <NavLink
      key={link.navTitle}
      to={link.path}
      className={({ isActive }) =>
        isActive ? "active text-white" : "text-gray-500"
      }>
      {link.navTitle}
    </NavLink>
  ));

  const locateTo = (path: string) => {
    return navigate(path);
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  // Reset isOpen state when screen size changes to medium and above
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from Zustand
    navigate("/choice-user"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-between py-3 px-5 md:px-11 bg-gray-800 z-[999] transition-all duration-500 ease fixed w-full top-0">
      <div className="flex gap-4 md:gap-6 items-center">
        <img
          className="bg-white rounded-full w-[60px] h-[60px]"
          src="/bg1.png"
          alt="logo image"
        />
        <h1 className="text-white text-lg md:text-xl">
          Student Management System
        </h1>
      </div>
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <i className="bx bx-x text-white" style={{ fontSize: "24px" }}></i> // Close icon
          ) : (
            <i
              className="bx bx-menu text-white"
              style={{ fontSize: "24px" }}></i> // Menu icon
          )}
        </button>
      </div>
      {/* Navigation Links */}
      <nav
        className={`md:flex md:items-center md:gap-6 ${
          isOpen
            ? "absolute top-full left-0 w-full bg-gray-800 z-10 p-3 md:p-0"
            : "hidden md:flex"
        }`}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
          {links}
        </div>
        {/* Buttons added to the mobile menu */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          {!isAuthenticated ? (
            <>
              <button
                className="btn bg-orange-300 hover:bg-orange-200"
                onClick={() => locateTo("/choice-user")}>
                Login
              </button>
              <button
                className="btn border border-orange-300 text-orange-300 hover:bg-orange-200 hover:text-black"
                onClick={() => locateTo("/guest")}>
                Guest
              </button>
            </>
          ) : (
            <button
              className="btn bg-red-500 hover:bg-red-400 text-white"
              onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
