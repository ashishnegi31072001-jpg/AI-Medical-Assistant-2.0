import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SecurityIcon from "@mui/icons-material/Security";

function BrandSection() {
  return (
    <div
      className="
      hidden
      lg:flex
      w-1/2
      flex-col
      justify-center
      px-20
      bg-gradient-to-br
      from-slate-900
      via-slate-950
      to-blue-950
      "
    >

      <div className="flex items-center gap-5">

        <div className="rounded-3xl bg-blue-600 p-4">

          <LocalHospitalIcon
            sx={{
              color: "white",
              fontSize: 45,
            }}
          />

        </div>

        <h1 className="text-6xl font-bold">
          MedAssist AI
        </h1>

      </div>

      <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">

        Your intelligent healthcare companion powered by Artificial Intelligence.

      </p>

      <div className="mt-16 space-y-8 text-lg">

        <div className="flex items-center gap-4">

          <FavoriteIcon className="text-blue-500" />

          <span>Track your symptoms</span>

        </div>

        <div className="flex items-center gap-4">

          <PsychologyIcon className="text-blue-500" />

          <span>AI Powered Consultations</span>

        </div>

        <div className="flex items-center gap-4">

          <SecurityIcon className="text-blue-500" />

          <span>Secure Medical Records</span>

        </div>

      </div>

    </div>
  );
}

export default BrandSection;