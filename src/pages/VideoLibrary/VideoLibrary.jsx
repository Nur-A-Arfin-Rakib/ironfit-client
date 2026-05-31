import { useState } from "react";
import { FaPlay, FaClock, FaFire, FaSearch, FaYoutube } from "react-icons/fa";

const videos = [
  { id: "BTENKdRVS2U", title: "20 Min Full Body HIIT Workout", category: "HIIT", duration: "20 min", level: "Intermediate", trainer: "Coach Alex", views: "2.3M" },
  { id: "UItWltVZgDQ", title: "30 Min Cardio Blast", category: "Cardio", duration: "30 min", level: "Beginner", trainer: "Sarah K.", views: "1.8M" },
  { id: "qULTwquOuT4", title: "Yoga for Beginners - Full Body", category: "Yoga", duration: "45 min", level: "Beginner", trainer: "Lisa M.", views: "3.1M" },
  { id: "oAPCPjnU1wA", title: "Strength Training for Mass", category: "Strength", duration: "40 min", level: "Advanced", trainer: "Mike R.", views: "987K" },
  { id: "ml6cT4AZdqI", title: "Boxing Fitness Workout", category: "Boxing", duration: "25 min", level: "Intermediate", trainer: "Jake T.", views: "1.2M" },
  { id: "2pLT-olgUJs", title: "Healthy Meal Prep for Muscle", category: "Nutrition", duration: "15 min", level: "Beginner", trainer: "Maria S.", views: "654K" },
  { id: "vc1E5CfRfos", title: "Core & Abs Workout - 6 Pack", category: "Strength", duration: "20 min", level: "Intermediate", trainer: "Mike R.", views: "2.7M" },
  { id: "RqcOCBb4arc", title: "Morning Yoga Flow", category: "Yoga", duration: "30 min", level: "Beginner", trainer: "Lisa M.", views: "1.5M" },
  { id: "gC_L9qAHVJ8", title: "Fat Burning Cardio Dance", category: "Cardio", duration: "35 min", level: "Beginner", trainer: "Maria S.", views: "4.2M" },
];

const categories = ["All", "HIIT", "Cardio", "Yoga", "Strength", "Boxing", "Nutrition"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const levelColor = {
  Beginner: "text-green-400 bg-green-400/10",
  Intermediate: "text-yellow-400 bg-yellow-400/10",
  Advanced: "text-red-400 bg-red-400/10",
};

const VideoLibrary = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState(null);

  const filtered = videos.filter((v) => {
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    const matchLevel = activeLevel === "All" || v.level === activeLevel;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.trainer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">LEARN & TRAIN</p>
          <h1 className="font-heading text-5xl text-white tracking-wider mb-4">VIDEO LIBRARY</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Expert-led workout videos, tutorials, and nutrition guides — all free.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search videos or trainers..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-gray-800 focus:border-red-600 text-white pl-11 pr-4 py-3 rounded-xl outline-none transition-colors" />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeCategory === cat ? "bg-red-600 text-white" : "bg-[#111] border border-gray-800 text-gray-400 hover:border-red-600"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {levels.map((lvl) => (
            <button key={lvl} onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeLevel === lvl ? "bg-gray-700 text-white" : "bg-[#111] border border-gray-800 text-gray-500"}`}>
              {lvl}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} videos found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <div key={video.id} className="bg-[#111] border border-gray-800 hover:border-red-600/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl group">
              <div className="relative aspect-video bg-black">
                {playingId === video.id ? (
                  <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} title={video.title}
                    className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <>
                    <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`; }} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button onClick={() => setPlayingId(video.id)}
                        className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-red-600/50">
                        <FaPlay className="text-white text-xl ml-1" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">{video.category}</div>
                    <div className="absolute top-3 right-3"><FaYoutube className="text-red-500 text-2xl" /></div>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">{video.trainer}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelColor[video.level]}`}>{video.level}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-xs">
                  <div className="flex items-center gap-1"><FaClock className="text-red-500" /><span>{video.duration}</span></div>
                  <div className="flex items-center gap-1"><FaFire className="text-red-500" /><span>{video.views} views</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;
