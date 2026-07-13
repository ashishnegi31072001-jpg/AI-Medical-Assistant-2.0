import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useAuth } from "../../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 shadow-xl">

      <div className="flex items-center gap-3 mb-4">

        <WavingHandIcon sx={{ fontSize: 38 }} />

        <h1 className="text-3xl font-bold">
          Welcome Back, {user?.name}
          <p className="mt-2 text-lg">
            {user?.email}
                    </p>
        </h1>

      </div>

      <p className="text-lg opacity-90">
        Ready to monitor your health today?
      </p>

    </div>
  );
}

export default WelcomeCard;