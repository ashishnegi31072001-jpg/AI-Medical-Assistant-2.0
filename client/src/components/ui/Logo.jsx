import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-blue-600 p-3">
        <LocalHospitalIcon className="text-white" />
      </div>

      <h1 className="text-3xl font-bold text-blue-500">
        MedAssist AI
      </h1>
    </div>
  );
}

export default Logo;