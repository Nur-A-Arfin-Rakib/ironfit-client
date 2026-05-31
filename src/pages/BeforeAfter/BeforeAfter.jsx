import { useState } from "react";
import { FaPlus, FaTrophy, FaFire } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const defaultTransformations = [
  {
    id: 1,
    name: "Rahim Ahmed",
    duration: "4 months",
    weightLost: "18kg",
    beforeImage: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
    story: "I was overweight and lacked confidence. IronFit changed everything. My trainer was incredible!",
    program: "HIIT + Nutrition",
  },
  {
    id: 2,
    name: "Priya Sharma",
    duration: "6 months",
    weightLost: "12kg",
    beforeImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b6?w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80",
    story: "From zero fitness to running 5k every day. The yoga and cardio combo worked wonders for me.",
    program: "Yoga + Cardio",
  },
  {
    id: 3,
    name: "Karim Hassan",
    duration: "3 months",
    weightLost: "10kg",
    beforeImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
    story: "Strength training completely transformed my body. I gained muscle and lost fat simultaneously.",
    program: "Strength Training",
  },
];

const BeforeAfter = () => {
  const { user } = useAuth();
  const [transformations] = useState(defaultTransformations);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">REAL RESULTS</p>
          <h1 className="font-heading text-5xl text-white tracking-wider mb-4">TRANSFORMATION STORIES</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real people, real results. Get inspired by the IronFit community.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: "500+", label: "Transformations" },
            { value: "15kg", label: "Avg Weight Lost" },
            { value: "94%", label: "Success Rate" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-red-600/10 border border-red-600/30 rounded-2xl p-5 text-center">
              <div className="font-heading text-4xl text-red-500 tracking-wider">{value}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {transformations.map((t) => (
            <div
              key={t.id}
              className="bg-[#111] border border-gray-800 hover:border-red-600/50 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-600/5"
              onClick={() => setSelected(t)}
            >
              {/* Before/After Images */}
              <div className="grid grid-cols-2 h-48">
                <div className="relative">
                  <img src={t.beforeImage} alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
                </div>
                <div className="relative">
                  <img src={t.afterImage} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">AFTER</div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{t.name}</h3>
                  <FaTrophy className="text-yellow-400" />
                </div>
                <div className="flex gap-3 mb-3">
                  <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded-full">{t.duration}</span>
                  <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">-{t.weightLost}</span>
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-full">{t.program}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{t.story}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        {user && (
          <div className="text-center bg-[#111] border border-gray-800 rounded-2xl p-8">
            <FaFire className="text-red-600 text-4xl mx-auto mb-3" />
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">SHARE YOUR STORY</h3>
            <p className="text-gray-400 mb-5">Inspire others with your transformation journey!</p>
            <button
              onClick={() => toast.success("Feature coming soon! 🚀")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 mx-auto"
            >
              <FaPlus /> Submit My Story
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#111] border border-gray-800 rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-3 mb-5 h-48">
              <div className="relative rounded-xl overflow-hidden">
                <img src={selected.beforeImage} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">BEFORE</div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img src={selected.afterImage} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">AFTER</div>
              </div>
            </div>
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">{selected.name}</h3>
            <div className="flex gap-2 mb-4">
              <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded-full">{selected.duration}</span>
              <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">-{selected.weightLost}</span>
              <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-full">{selected.program}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{selected.story}</p>
            <button onClick={() => setSelected(null)} className="mt-5 w-full border border-gray-700 text-gray-400 hover:border-red-600 hover:text-white py-2 rounded-xl transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfter;
