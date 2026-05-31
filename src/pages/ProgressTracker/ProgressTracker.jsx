import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaFire, FaDumbbell, FaWeight, FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";

const WorkoutLog = () => {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("ironfit-logs");
    return saved ? JSON.parse(saved) : [];
  });
  const [weights, setWeights] = useState(() => {
    const saved = localStorage.getItem("ironfit-weights");
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ exercise: "", sets: "", reps: "", weight: "", date: new Date().toISOString().split("T")[0] });
  const [weightForm, setWeightForm] = useState({ weight: "", date: new Date().toISOString().split("T")[0] });
  const [activeTab, setActiveTab] = useState("workout");

  useEffect(() => {
    localStorage.setItem("ironfit-logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("ironfit-weights", JSON.stringify(weights));
  }, [weights]);

  const addLog = () => {
    if (!form.exercise || !form.sets || !form.reps) return toast.error("Fill all required fields!");
    setLogs([{ ...form, id: Date.now() }, ...logs]);
    setForm({ exercise: "", sets: "", reps: "", weight: "", date: new Date().toISOString().split("T")[0] });
    toast.success("Workout logged! 💪");
  };

  const addWeight = () => {
    if (!weightForm.weight) return toast.error("Enter your weight!");
    setWeights([{ ...weightForm, id: Date.now() }, ...weights]);
    setWeightForm({ weight: "", date: new Date().toISOString().split("T")[0] });
    toast.success("Weight logged!");
  };

  const totalSets = logs.reduce((sum, l) => sum + parseInt(l.sets || 0), 0);
  const totalReps = logs.reduce((sum, l) => sum + parseInt(l.reps || 0) * parseInt(l.sets || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">TRACK YOUR GAINS</p>
          <h1 className="font-heading text-5xl text-white tracking-wider mb-4">PROGRESS TRACKER</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FaDumbbell, label: "Total Workouts", value: logs.length, color: "text-red-500" },
            { icon: FaFire, label: "Total Sets", value: totalSets, color: "text-orange-400" },
            { icon: FaTrophy, label: "Total Reps", value: totalReps, color: "text-yellow-400" },
            { icon: FaWeight, label: "Weight Logs", value: weights.length, color: "text-blue-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-[#111] border border-gray-800 rounded-2xl p-4 text-center">
              <Icon className={`${color} text-2xl mx-auto mb-2`} />
              <div className="font-heading text-2xl text-white">{value}</div>
              <div className="text-gray-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["workout", "weight"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-colors ${
                activeTab === tab ? "bg-red-600 text-white" : "bg-[#111] border border-gray-800 text-gray-400"
              }`}
            >
              {tab === "workout" ? "Workout Log" : "Weight Log"}
            </button>
          ))}
        </div>

        {activeTab === "workout" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Workout */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <h2 className="font-heading text-xl text-white tracking-wider mb-5">LOG WORKOUT</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Exercise *</label>
                  <input
                    type="text"
                    value={form.exercise}
                    onChange={(e) => setForm({ ...form, exercise: e.target.value })}
                    placeholder="e.g. Bench Press"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["sets", "reps", "weight"].map((field) => (
                    <div key={field}>
                      <label className="text-gray-400 text-sm mb-2 block capitalize">{field} {field === "weight" ? "(kg)" : "*"}</label>
                      <input
                        type="number"
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        placeholder="0"
                        className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-3 py-3 rounded-xl outline-none"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>
                <button onClick={addLog} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <FaPlus /> LOG WORKOUT
                </button>
              </div>
            </div>

            {/* Workout History */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <h2 className="font-heading text-xl text-white tracking-wider mb-5">HISTORY</h2>
              {logs.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <FaDumbbell className="text-4xl mx-auto mb-2 text-gray-700" />
                  <p>No workouts logged yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3">
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{log.exercise}</div>
                        <div className="text-gray-400 text-xs">
                          {log.sets} sets × {log.reps} reps {log.weight && `• ${log.weight}kg`}
                        </div>
                        <div className="text-gray-600 text-xs">{log.date}</div>
                      </div>
                      <button onClick={() => setLogs(logs.filter((l) => l.id !== log.id))} className="text-gray-600 hover:text-red-500 transition-colors">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "weight" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Weight */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <h2 className="font-heading text-xl text-white tracking-wider mb-5">LOG WEIGHT</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Weight (kg) *</label>
                  <input
                    type="number"
                    value={weightForm.weight}
                    onChange={(e) => setWeightForm({ ...weightForm, weight: e.target.value })}
                    placeholder="e.g. 75"
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Date</label>
                  <input
                    type="date"
                    value={weightForm.date}
                    onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
                  />
                </div>
                <button onClick={addWeight} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <FaPlus /> LOG WEIGHT
                </button>
              </div>
            </div>

            {/* Weight History */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
              <h2 className="font-heading text-xl text-white tracking-wider mb-5">WEIGHT HISTORY</h2>
              {weights.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <FaWeight className="text-4xl mx-auto mb-2 text-gray-700" />
                  <p>No weight logged yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {weights.map((w, i) => (
                    <div key={w.id} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3">
                      <div className="flex-1">
                        <div className="text-white font-semibold">{w.weight} kg</div>
                        <div className="text-gray-400 text-xs">{w.date}</div>
                      </div>
                      {i > 0 && (
                        <div className={`text-sm font-bold ${parseFloat(w.weight) < parseFloat(weights[i - 1].weight) ? "text-green-400" : "text-red-400"}`}>
                          {parseFloat(w.weight) < parseFloat(weights[i - 1].weight) ? "↓" : "↑"}
                          {Math.abs(parseFloat(w.weight) - parseFloat(weights[i - 1].weight)).toFixed(1)}kg
                        </div>
                      )}
                      <button onClick={() => setWeights(weights.filter((wt) => wt.id !== w.id))} className="text-gray-600 hover:text-red-500 transition-colors">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;
