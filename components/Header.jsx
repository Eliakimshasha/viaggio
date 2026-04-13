"use client";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { IoIosClose } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { useParams, usePathname, useRouter } from "next/navigation";
import logo from "../public/assets/images/logo.png";
import Image from "next/image";

const Header = () => {
  const param = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const dropdownRef = useRef(null);
  const path = usePathname();
  const route = useRouter();
  const { id } = param;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const navigateToContact = () => {
    route.push("/contact");
    setIsMenuOpen(false);
  };

  const navigateToLogin = () => {
    route.push("/authentication/login");
    setIsProfileDropdownOpen(false);
    setIsLoggedIn(true);
    setIsProfileDropdownOpen(false);
  };

  const navigateToDashboard = () => {
    route.push("/dashboard");
    setIsProfileDropdownOpen(false);
  };

  const handleLogin = () => {
    // Mock login - in real app, this would be your login logic
    setIsLoggedIn(true);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    // Mock logout - in real app, this would be your logout logic
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Travel Style", link: "/travel-style" },
    { name: "Destinations", link: "/destinations" },
    { name: "Mt.Kilimanjaro", link: "/kilimanjaro" },
    { name: "Day Trips", link: "/daytrips" },
    { name: "Experiences", link: "/experiences" },
  ];

  const handleNavigation = () => {
    route.push("/");
  };

  // Check if this is the Lemosho route for special styling
  const isLemoshoRoute = id === "lemosho-route";

  return (
    <>
      <header
        className={`${
          path.startsWith("/escapeDsm")
            ? "bg-white"
            : path.startsWith("/routes")
            ? "bg-gray-50"
            : "bg-[#fff9f5]"
        } z-50 fixed top-0 left-0 w-full`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between pl-4 items-center h-20">
            {/* Logo */}
            <div className=" cursor-pointer" onClick={() => handleNavigation()}>
              <Image src={logo} alt="logo" className="h-16 w-auto" />
            </div>

            {/* Center Navigation - Desktop */}
            <nav
              className={`hidden md:flex items-center space-x-12 transition-all duration-300 ${
                !isMenuOpen
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-8 pointer-events-none"
              }`}
            >
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={`text-gray-700 hover:text-gray-900 transition-all duration-200 font-normal text-base transform ${
                    !isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right side - Desktop CTA + Profile + Hamburger */}
            <div className="flex items-center space-x-4 pr-5">
              {/* Desktop CTA */}
              <div
                className="md:flex items-center space-x-6 transition-all duration-300 opacity-100 transform translate-x-0"
                style={{
                  transitionDelay: isMenuOpen ? "300ms" : "0ms",
                }}
              >
                <button
                  className={`${
                    path.startsWith("/escapeDsm")
                      ? "bg-[#946626] hover:bg-[#7a4f1f]"
                      : isLemoshoRoute
                      ? "bg-[#946626] hover:bg-[#7a4f1f]"
                      : "bg-[#946626] hover:bg-[#7a4f1f]"
                  } text-white px-3 md:px-6 py-2 rounded-full transition-colors duration-200 font-medium text-sm`}
                  // onClick={navigateToContact}
                >
                  Host with us
                </button>
              </div>

              {/* Profile and Menu Container */}
              <div
                className={`flex items-center ${
                  path.startsWith("/escapeDsm")
                    ? "bg-white"
                    : isLemoshoRoute
                    ? "bg-transparent"
                    : "bg-[#ede5d9]"
                } space-x-4 px-4 py-[6px]  pb-0 border border-gray-400 rounded-full`}
              >
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <IoPersonCircleOutline className="text-2xl cursor-pointer" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute -right-22 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {!isLoggedIn ? (
                        // Not logged in - show login option
                        <div className="px-4 py-2 ">
                          <button
                            onClick={navigateToLogin}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center space-x-2"
                          >
                            <User size={16} />
                            <span>Login</span>
                          </button>
                        </div>
                      ) : (
                        // Logged in - show profile and logout options
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm text-gray-500">
                              Welcome back!
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              Eliakim Williams
                            </p>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={navigateToDashboard}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                            >
                              <Settings size={16} />
                              <span>Dashboard</span>
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                            >
                              <LogOut size={16} />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-[1px] h-4 bg-gray-500"></div>

                {/* Hamburger menu button */}
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  {isMenuOpen ? (
                    <CiMenuFries size={18} />
                  ) : (
                    <CiMenuFries size={19} color="black" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-[#fff9f5] bg-opacity-50 transition-opacity duration-300 z-40 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        />

        {/* Mobile Menu Sidebar */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                 <div className=" cursor-pointer" onClick={() => handleNavigation()}>
              <Image src={logo} alt="logo" className="h-16 w-auto" />
            </div>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <IoIosClose size={24} />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="flex-1 px-6 py-4">
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className={`block text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-normal py-4 px-4 rounded-lg transform ${
                      isMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                    }}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div
              className={`p-6 border-t space-y-4 transform transition-all duration-300 ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen ? "600ms" : "0ms",
              }}
            >
              <button
                className="w-full bg-[#946626] hover:bg-[#7a4f1f] text-white px-6 py-3 rounded-full transition-colors duration-200 font-medium"
                onClick={navigateToContact}
              >
                Host with us
              </button>

              {/* Mobile Profile Actions */}
              <div className="pt-4  border-t border-gray-200">
                {!isLoggedIn ? (
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User size={16} />
                    <span>Login</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="text-center pb-2">
                      <p className="text-sm text-gray-500">Welcome back!</p>
                      <p className="text-sm font-medium text-gray-900">
                        Eliakim Williams
                      </p>
                    </div>
                    <button
                      onClick={navigateToDashboard}
                      className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Settings size={16} />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
