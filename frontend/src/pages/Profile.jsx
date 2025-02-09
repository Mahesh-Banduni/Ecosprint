import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import ProfileSettings from "../components/profile/ProfileSettings";
import MyOrders from "../components/profile/MyOrders";
import Addresses from "../components/profile/Addresses";
import useProfile from "../hooks/useProfile";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
  //const { profile, loading, error } = useSelector(state => state.profile);
  const navigate = useNavigate();
  const { handleLogout } = Header;
  const user=useProfile;
  const [activeTab, setActiveTab] = useState("Profile Settings");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Profile Settings":
        return <ProfileSettings user={user} />;
      case "Your Orders":
        return <MyOrders user={user} />;
      case "Saved Addresses":
        return <Addresses user={user} />;
      default:
        return <ProfileSettings user={user} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 bg-gray-800 text-white flex items-center gap-2"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <Menu />
        Hello, user
      </button>

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`absolute md:relative md:w-1/4 bg-gray-700 text-white p-6 transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-3/4 h-full fixed top-0 left-0 md:h-auto`}
      >
        <h2 className="text-lg sm:text-2xl flex flex-col font-bold mb-4 mt-1 md:overflow-visible">Hello</h2>
        <div className="flex flex-col md:block md:space-x-0 overflow-x-auto md:overflow-visible">
          <h2 className="text-lg sm:text-2xl font-bold mb-4 md:overflow-visible">Your Account</h2>
          <div className="flex flex-col gap-2">
            {["Profile Settings", "Your Orders", "Saved Addresses"].map((tab) => (
              <NavLink
                key={tab}
                className={`p-2 cursor-pointer rounded-lg hover:bg-gray-500 transition text-sm md:text-base ${
                  activeTab === tab ? "bg-gray-500" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }}
              >
                {tab}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className="p-2 cursor-pointer rounded-lg hover:bg-gray-500 transition text-sm md:text-base"
            >
              Your Cart
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => {
                handleLogout();
              }}
              className="p-2 cursor-pointer rounded-lg hover:bg-gray-500 transition text-sm md:text-base"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="w-full md:w-3/4 p-4 md:p-6">{renderContent()}</div>
    </div>
  );
};

export default Profile;