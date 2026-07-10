import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SecurityIcon from "@mui/icons-material/Security";

function BrandSection() {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 flex-col justify-center px-16">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-blue-600 p-4 rounded-2xl">

          <LocalHospitalIcon sx={{ fontSize: 40, color: "white" }} />

        </div>

        <h1 className="text-5xl font-bold text-white">

          MedAssist AI

        </h1>

      </div>

      <p className="text-slate-300 text-xl leading-9">

        Your intelligent healthcare companion powered by Artificial
        Intelligence.

      </p>

      <div className="mt-16 space-y-8">

        <div className="flex gap-4">

          <FavoriteIcon className="text-blue-500" />

          <span>Track your symptoms</span>

        </div>

        <div className="flex gap-4">

          <PsychologyIcon className="text-blue-500" />

          <span>AI powered consultations</span>

        </div>

        <div className="flex gap-4">

          <SecurityIcon className="text-blue-500" />

          <span>Secure medical records</span>

        </div>

      </div>

    </div>
  );
}

export default BrandSection;