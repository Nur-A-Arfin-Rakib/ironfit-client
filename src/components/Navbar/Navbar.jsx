import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FaDumbbell, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/trainers", label: "Trainers" },
    ...(user
      ? [
          { to: "/add-trainer", label: "Add Trainer" },
          { to: "/my-trainers", label: "My Trainers" },
          { to: "/my-bookings", label: "My Bookings" },
        ]
      : []),
  ];

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? "bg-[#0a0a0a]/95 border-b border-gray-800" : "bg-white border-b border-gray-200"} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaDumbbell className="text-red-600 text-2xl" />
          <span className="font-heading text-2xl tracking-widest text-red-600">IRON<span className={isDark ? "text-white" : "text-gray-900"}>FIT</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? "text-red-600" : isDark ? "text-gray-300 hover:text-red-500" : "text-gray-600 hover:text-red-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/placeholder/avatar.png"}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full border-2 border-red-600 object-cover"
                  onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
              </label>
              <ul tabIndex={0} className={`dropdown-content menu p-3 shadow-xl rounded-xl w-52 z-50 ${isDark ? "bg-[#111] border border-gray-700" : "bg-white border border-gray-200"}`}>
                <li className="px-3 py-2 text-sm font-semibold text-red-600 border-b border-gray-700 mb-1">
                  {user.displayName || "User"}
                </li>
                <li>
                  <button onClick={handleLogout} className="text-sm hover:bg-red-600/10 hover:text-red-500 rounded-lg">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-red-600" /> : <FaBars className={isDark ? "text-white" : "text-gray-900"} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-3 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-semibold py-2 border-b border-gray-800 ${isActive ? "text-red-600" : isDark ? "text-gray-300" : "text-gray-600"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
