import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { FaStar, FaDumbbell, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

const TrainerDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booking, setBooking] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/trainers/${id}`)
      .then((res) => { setTrainer(res.data); setLoading(false); })
      .catch(() => setLoading(false));

    axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, [id]);

  const handleBook = async () => {
    if (!selectedDay || !selectedTime) return toast.error("Please select day and time!");
    setBooking(true);
    try {
      await axiosSecure.post("/bookings", {
        trainerId: id,
        trainerName: trainer.name,
        trainerImage: trainer.image,
        specialization: trainer.specialization,
        userEmail: user.email,
        userName: user.displayName,
        day: selectedDay,
        time: selectedTime,
        hourlyRate: trainer.hourlyRate,
      });
      toast.success("Session booked successfully! 💪");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!");
    }
    setBooking(false);
  };

  const handleReview = async () => {
    if (!reviewText) return toast.error("Please write a review!");
    try {
      await axiosSecure.post("/reviews", {
        trainerId: id,
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        rating,
        text: reviewText,
      });
      toast.success("Review submitted!");
      setReviewText("");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to submit review!");
    }
  };

  if (loading) return <Spinner />;
  if (!trainer) return <div className="text-center py-20 text-gray-400">Trainer not found.</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Trainer Profile */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={trainer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={trainer.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="font-heading text-4xl text-white tracking-wider">{trainer.name}</h1>
              <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">{trainer.specialization}</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: FaDumbbell, label: "Experience", value: `${trainer.experience} years` },
                { icon: FaMapMarkerAlt, label: "Location", value: trainer.location || "Dhaka" },
                { icon: FaStar, label: "Rating", value: `${trainer.rating || 4.9}/5` },
                { icon: FaClock, label: "Rate", value: `$${trainer.hourlyRate}/session` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <Icon className="text-red-500 text-xl mx-auto mb-2" />
                  <div className="text-gray-400 text-xs mb-1">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                </div>
              ))}
            </div>

            {trainer.bio && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">About</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{trainer.bio}</p>
              </div>
            )}

            {trainer.availableDays?.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Available Days</h3>
                <div className="flex flex-wrap gap-2">
                  {trainer.availableDays.map((d) => (
                    <span key={d} className="bg-red-600/20 border border-red-600/30 text-red-400 text-xs px-3 py-1 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-heading text-2xl text-white tracking-wider mb-6">BOOK A SESSION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-gray-400 text-sm mb-2 flex items-center gap-2"><FaCalendarAlt className="text-red-500" /> Select Day</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
              >
                <option value="">Choose a day</option>
                {(trainer.availableDays?.length > 0 ? trainer.availableDays : days).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 flex items-center gap-2"><FaClock className="text-red-500" /> Select Time</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none"
              >
                <option value="">Choose a time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleBook}
            disabled={booking}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors tracking-wider text-lg"
          >
            {booking ? "Booking..." : `BOOK NOW — $${trainer.hourlyRate}`}
          </button>
        </div>

        {/* Reviews */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">
          <h2 className="font-heading text-2xl text-white tracking-wider mb-6">REVIEWS ({reviews.length})</h2>

          {/* Add Review */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6">
            <div className="flex gap-2 mb-3">
              {[1,2,3,4,5].map((s) => (
                <button key={s} onClick={() => setRating(s)}>
                  <FaStar className={s <= rating ? "text-yellow-400" : "text-gray-600"} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              rows={3}
              className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none resize-none mb-3"
            />
            <button onClick={handleReview} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-xl transition-colors">
              Submit Review
            </button>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="flex gap-4 border-b border-gray-800 pb-4">
                <img
                  src={r.userImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={r.userName}
                  className="w-10 h-10 rounded-full border border-red-600 object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{r.userName}</span>
                    <div className="flex gap-1">
                      {[...Array(r.rating)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
