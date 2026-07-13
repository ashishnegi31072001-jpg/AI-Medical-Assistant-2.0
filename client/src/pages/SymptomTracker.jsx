import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import SymptomForm from "../components/symptoms/SymptomForm";
import SymptomHistory from "../components/symptoms/SymptomHistory";

function SymptomTracker() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <div className="flex-1 overflow-y-auto p-8">

          <h1 className="mb-8 text-4xl font-bold">
            🩺 Symptom Checker
          </h1>

          <div className="grid gap-8 lg:grid-cols-2">

            <SymptomForm />

            <SymptomHistory />

          </div>

        </div>

      </div>

    </div>
  );
}

export default SymptomTracker;