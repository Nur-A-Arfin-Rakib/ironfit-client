import { useEffect, useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import { FaDumbbell, FaCalendarAlt, FaStar, FaDollarSign, FaUsers, FaFire, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ trainers: 0, bookings: 0, reviews: 0, revenue: 0 });
  const [bookings, setBookings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, trainersRes] = await Promise.all([
          axiosSecure.get(`/bookings?email=${user?.email}`),
          axiosSecure.get(`/trainers?email=${user?.email}`),
        ]);
        setBookings(bookingsRes.data);
        setTrainers(trainersRes.data);
        setStats({
          trainers: trainersRes.data.length,
          bookings: bookingsRes.data.length,
          reviews: trainersRes.data.reduce((sum, t) => sum + (t.reviewCount || 0), 0),
          revenue: bookingsRes.data.reduce((sum, b) => sum + (b.hourlyRate || 0), 0),
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (user) fetchData();
  }, [user]);

  if (loading) return <Spinner />;

  const statCards = [
    { icon: FaDumbbell, label: "My Trainers", value: stats.trainers, color: "text-red-500", bg: "bg-red-500/10" },
    { icon: FaCalendarAlt, label: "My Bookings", value: stats.bookings, color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: FaStar, label: "Total Reviews", value: stats.reviews, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { icon: FaDollarSign, label: "Total Spent", value: `$${stats.revenue}`, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <img
            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt={user?.displayName}
            className="w-16 h-16 rounded-full border-2 border-red-600 object-cover"
            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
          />
          <div>
            <h1 className="font-heading text-3xl text-white tracking-wider">
              WELCOME BACK, <span className="text-red-600">{user?.displayName?.split(" ")[0]?.toUpperCase()}</span>
            </h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-[#111] border border-gray-800 rounded-2xl p-5 hover:border-red-600/50 transition-colors">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`${color} text-xl`} />
              </div>
              <div className="font-heading text-3xl text-white tracking-wider">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl text-white tracking-wider">RECENT BOOKINGS</h2>
              <Link to="/my-bookings" className="text-red-500 text-sm hover:text-red-400">View all →</Link>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaCalendarAlt className="text-4xl mx-auto mb-2 text-gray-700" />
                <p>No bookings yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 4).map((b) => (
                  <div key={b._id} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl">
                    <img
                      src={b.trainerImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={b.trainerName}
                      className="w-10 h-10 rounded-xl object-cover"
                      onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{b.trainerName}</div>
                      <div className="text-gray-400 text-xs">{b.day} • {b.time}</div>
                    </div>
                    <div className="text-red-400 font-bold text-sm">${b.hourlyRate}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Trainers */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl text-white tracking-wider">MY TRAINERS</h2>
              <Link to="/my-trainers" className="text-red-500 text-sm hover:text-red-400">View all →</Link>
            </div>
            {trainers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaDumbbell className="text-4xl mx-auto mb-2 text-gray-700" />
                <p>No trainers added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trainers.slice(0, 4).map((t) => (
                  <div key={t._id} className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl">
                    <img
                      src={t.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={t.name}
                      className="w-10 h-10 rounded-xl object-cover"
                      onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{t.name}</div>
                      <div className="text-red-500 text-xs">{t.specialization}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-white text-sm">{t.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { to: "/add-trainer", icon: FaDumbbell, label: "Add Trainer", color: "bg-red-600 hover:bg-red-700" },
            { to: "/trainers", icon: FaUsers, label: "Find Trainers", color: "bg-gray-700 hover:bg-gray-600" },
            { to: "/videos", icon: FaFire, label: "Watch Videos", color: "bg-gray-700 hover:bg-gray-600" },
            { to: "/leaderboard", icon: FaTrophy, label: "Leaderboard", color: "bg-gray-700 hover:bg-gray-600" },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link
              key={to}
              to={to}
              className={`${color} text-white font-bold py-4 rounded-xl flex flex-col items-center gap-2 transition-colors`}
            >
              <Icon className="text-2xl" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
