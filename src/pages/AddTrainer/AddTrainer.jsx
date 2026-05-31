import { useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaDumbbell } from "react-icons/fa";

const specializations = ["Strength Training", "Cardio", "Yoga", "HIIT", "Boxing", "Powerlifting", "Nutrition", "CrossFit", "Pilates", "Zumba"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddTrainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [form, setForm] = useState({
    name: "", image: "", specialization: "", experience: "", location: "",
    hourlyRate: "", bio: "", email: user?.email || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDays.length === 0) return toast.error("Select at least one available day!");
    setLoading(true);
    try {
      await axiosSecure.post("/trainers", { ...form, availableDays: selectedDays });
      toast.success("Trainer added successfully! 💪");
      navigate("/my-trainers");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add trainer!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <FaDumbbell className="text-red-600 text-4xl mx-auto mb-3" />
          <h1 className="font-heading text-4xl text-white tracking-wider">ADD TRAINER</h1>
          <p className="text-gray-400 mt-2">Add a new fitness trainer to the IronFit platform</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: "name", label: "Full Name", placeholder: "John Doe", required: true },
              { name: "image", label: "Profile Image URL", placeholder: "https://...", required: false },
              { name: "experience", label: "Experience (years)", placeholder: "5", required: true, type: "number" },
              { name: "location", label: "Location", placeholder: "Dhaka, Bangladesh", required: false },
              { name: "hourlyRate", label: "Session Rate ($)", placeholder: "50", required: true, type: "number" },
              { name: "email", label: "Email", placeholder: "trainer@email.com", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-gray-400 text-sm mb-2 block">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Specialization */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Specialization *</label>
            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
            >
              <option value="">Select specialization</option>
              {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Available Days */}
          <div>
            <label className="text-gray-400 text-sm mb-3 block">Available Days *</label>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    selectedDays.includes(day)
                      ? "bg-red-600 text-white"
                      : "bg-[#1a1a1a] border border-gray-700 text-gray-400 hover:border-red-600"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Bio / About</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Describe the trainer's background, achievements..."
              rows={4}
              className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors tracking-wider text-lg"
          >
            {loading ? "Adding..." : "ADD TRAINER"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;
