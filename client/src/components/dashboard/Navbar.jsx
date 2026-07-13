import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useAuth } from "../../context/AuthContext";

function Navbar({ onClearChat }) {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-2 w-96">
        <SearchIcon className="text-slate-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Clear Chat */}
        <button
          onClick={onClearChat}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
        >
          <DeleteSweepIcon />
          Clear Chat
        </button>

        {/* Notification */}
        <button className="relative">
          <NotificationsIcon />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <AccountCircleIcon sx={{ fontSize: 42 }} />

          <div>
            <p className="font-semibold">
              {user?.name || "User"}
            </p>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;