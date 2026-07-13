import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DescriptionIcon from "@mui/icons-material/Description";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "AI Chat",
      path: "/chat",
      icon: <ChatIcon />,
    },
    {
      name: "Symptoms",
      path: "/symptoms",
      icon: <FavoriteIcon />,
    },
    {
      name: "Medical Reports",
      path: "/report",
      icon: <DescriptionIcon />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <PersonIcon />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-8 flex items-center gap-3 border-b border-slate-800">

        <div className="bg-blue-600 p-3 rounded-xl">
          <LocalHospitalIcon
            sx={{ color: "white", fontSize: 32 }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">
            MedAssist AI
          </h1>

          <p className="text-sm text-slate-400">
            Healthcare Assistant
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <LogoutIcon />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;