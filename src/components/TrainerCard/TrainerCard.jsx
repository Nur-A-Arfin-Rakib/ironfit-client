import { Link } from "react-router-dom";
import { FaStar, FaDumbbell, FaMapMarkerAlt } from "react-icons/fa";

const TrainerCard = ({ trainer }) => {
  const { _id, name, image, specialization, experience, location, hourlyRate, rating, reviewCount } = trainer;

  return (
    <div className="bg-[#111] border border-gray-800 hover:border-red-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
        {/* Specialization Badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {specialization}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading text-xl text-white tracking-wider mb-1">{name}</h3>

        <div className="flex items-center gap-1 mb-3">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-white text-sm font-semibold">{rating || "4.9"}</span>
          <span className="text-gray-500 text-sm">({reviewCount || 0} reviews)</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FaDumbbell className="text-red-500" />
            <span>{experience} yrs exp</span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-red-500 font-bold text-lg">${hourlyRate}</span>
            <span className="text-gray-500 text-sm">/session</span>
          </div>
          <Link
            to={`/trainers/${_id}`}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
