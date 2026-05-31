import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import { FaTrophy, FaMedal, FaStar, FaDumbbell } from "react-icons/fa";

const Leaderboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/trainers`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setTrainers(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const top3 = trainers.slice(0, 3);
  const rest = trainers.slice(3);

  const medalColor = ["text-yellow-400", "text-gray-300", "text-orange-400"];
  const medalBg = ["bg-yellow-400/10 border-yellow-400/30", "bg-gray-400/10 border-gray-400/30", "bg-orange-400/10 border-orange-400/30"];
  const rankLabel = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">HALL OF FAME</p>
          <h1 className="font-heading text-5xl text-white tracking-wider mb-4">LEADERBOARD</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Our top-rated trainers ranked by member reviews and ratings.</p>
        </div>

        {trainers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FaTrophy className="text-6xl mx-auto mb-4 text-gray-700" />
            <p className="text-xl">No trainers yet</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {top3.map((trainer, i) => (
                <div key={trainer._id} className={`border ${medalBg[i]} rounded-2xl p-5 text-center ${i === 0 ? "transform -translate-y-4" : ""}`}>
                  <div className="text-3xl mb-2">{rankLabel[i]}</div>
                  <img
                    src={trainer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-full border-2 border-current mx-auto mb-3 object-cover"
                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                  />
                  <h3 className="text-white font-semibold text-sm mb-1">{trainer.name}</h3>
                  <p className={`text-xs ${medalColor[i]} mb-2`}>{trainer.specialization}</p>
                  <div className="flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-white font-bold">{trainer.rating || "4.9"}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{trainer.reviewCount || 0} reviews</div>
                </div>
              ))}
            </div>

            {/* Rest of the list */}
            {rest.length > 0 && (
              <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
                {rest.map((trainer, i) => (
                  <div key={trainer._id} className="flex items-center gap-4 p-4 border-b border-gray-800 last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <div className="w-8 text-center font-heading text-xl text-gray-500">{i + 4}</div>
                    <img
                      src={trainer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={trainer.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-700"
                      onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold">{trainer.name}</div>
                      <div className="text-red-500 text-xs">{trainer.specialization}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-white font-bold">{trainer.rating || "4.9"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <FaDumbbell className="text-red-500" />
                        <span>{trainer.experience}yr</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
