import { useEffect, useState } from "react";
import axios from "axios";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import Spinner from "../../components/Spinner/Spinner";
import { FaSearch, FaFilter } from "react-icons/fa";

const specializations = ["All", "Strength Training", "Cardio", "Yoga", "HIIT", "Boxing", "Powerlifting", "Nutrition"];

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/trainers`)
      .then((res) => { setTrainers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = trainers.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.specialization === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">EXPERT COACHES</p>
          <h1 className="font-heading text-5xl text-white tracking-wider mb-4">OUR TRAINERS</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Find your perfect trainer and start your transformation today.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-gray-800 focus:border-red-600 text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specializations.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  filter === s ? "bg-red-600 text-white" : "bg-[#111] border border-gray-800 text-gray-400 hover:border-red-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FaFilter className="text-5xl mx-auto mb-4 text-gray-700" />
            <p className="text-xl">No trainers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trainer) => (
              <TrainerCard key={trainer._id} trainer={trainer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
