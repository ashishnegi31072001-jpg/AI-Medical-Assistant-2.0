import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function QuickActions() {
  const actions = [
    {
      title: "AI Consultation",
      icon: <ChatIcon sx={{ fontSize: 35 }} />,
    },
    {
      title: "Track Symptoms",
      icon: <FavoriteIcon sx={{ fontSize: 35 }} />,
    },
    {
      title: "Profile",
      icon: <PersonIcon sx={{ fontSize: 35 }} />,
    },
    {
      title: "Appointments",
      icon: <CalendarMonthIcon sx={{ fontSize: 35 }} />,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-slate-800 rounded-xl p-6 hover:bg-blue-600 transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-3">
              {action.icon}

              <span>{action.title}</span>
            </div>
          </button>
        ))}

      </div>

    </div>
  );
}

export default QuickActions;