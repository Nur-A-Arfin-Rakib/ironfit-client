import { useEffect, useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaDumbbell } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyTrainers = () => {
  const { user } = useAuth();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = () => {
    axiosSecure
      .get(`/trainers?email=${user?.email}`)
      .then((res) => { setTrainers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchTrainers(); }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Trainer?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, delete!",
      background: "#111",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/trainers/${id}`);
          toast.success("Trainer deleted!");
          fetchTrainers();
        } catch {
          toast.error("Failed to delete!");
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-4xl text-white tracking-wider">MY TRAINERS</h1>
            <p className="text-gray-400 mt-1">{trainers.length} trainer{trainers.length !== 1 ? "s" : ""} posted</p>
          </div>
          <Link to="/add-trainer" className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
            <FaDumbbell /> Add New
          </Link>
        </div>

        {trainers.length === 0 ? (
          <div className="text-center py-20">
            <FaDumbbell className="text-6xl text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-6">No trainers added yet</p>
            <Link to="/add-trainer" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Add Your First Trainer
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {trainers.map((trainer) => (
              <div key={trainer._id} className="bg-[#111] border border-gray-800 hover:border-red-600/50 rounded-2xl p-5 flex items-center gap-5 transition-colors">
                <img
                  src={trainer.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-700"
                  onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{trainer.name}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-400">
                    <span className="text-red-500">{trainer.specialization}</span>
                    <span>• {trainer.experience} yrs exp</span>
                    <span>• ${trainer.hourlyRate}/session</span>
                    {trainer.location && <span>• {trainer.location}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(trainer._id)}
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

export default MyTrainers;
