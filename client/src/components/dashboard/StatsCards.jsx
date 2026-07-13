import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const stats = [
  {
    title: "Heart Rate",
    value: "72 BPM",
    color: "bg-red-500",
    icon: <FavoriteIcon />,
  },
  {
    title: "Blood Group",
    value: "O+",
    color: "bg-blue-500",
    icon: <BloodtypeIcon />,
  },
  {
    title: "Health Score",
    value: "96%",
    color: "bg-green-500",
    icon: <MonitorHeartIcon />,
  },
  {
    title: "Daily Steps",
    value: "8,540",
    color: "bg-purple-500",
    icon: <DirectionsRunIcon />,
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg"
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </div>

            <div className={`${item.color} p-4 rounded-xl`}>
              {item.icon}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;