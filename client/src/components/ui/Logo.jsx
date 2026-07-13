import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Logo() {
  return (
    <div className="flex items-center gap-4">

      <div className="bg-blue-600 rounded-2xl p-3">

        <LocalHospitalIcon
          sx={{
            color: "white",
            fontSize: 34,
          }}
        />

      </div>

      <h1 className="text-4xl font-bold text-blue-500">
        MedAssist AI
      </h1>

    </div>
  );
}

export default Logo;