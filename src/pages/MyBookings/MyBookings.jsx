import { useEffect, useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaClock, FaTrash, FaDumbbell } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    axiosSecure
      .get(`/bookings?email=${user?.email}`)
      .then((res) => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, cancel it!",
      background: "#111",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${id}`);
          toast.success("Booking cancelled!");
          fetchBookings();
        } catch {
          toast.error("Failed to cancel!");
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-heading text-4xl text-white tracking-wider">MY BOOKINGS</h1>
          <p className="text-gray-400 mt-1">{bookings.length} session{bookings.length !== 1 ? "s" : ""} booked</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <FaDumbbell className="text-6xl text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-6">No bookings yet</p>
            <a href="/trainers" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Find a Trainer
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-[#111] border border-gray-800 hover:border-red-600/50 rounded-2xl p-5 flex items-center gap-5 transition-colors">
                <img
                  src={booking.trainerImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={booking.trainerName}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-700 flex-shrink-0"
                  onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{booking.trainerName}</h3>
                  <p className="text-red-500 text-sm mb-2">{booking.specialization}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-red-500" />
                      <span>{booking.day}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-red-500" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="text-red-400 font-semibold">
                      ${booking.hourlyRate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-600/20 border border-green-600/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="w-10 h-10 bg-red-600/10 hover:bg-red-600 border border-red-600/30 text-red-500 hover:text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
