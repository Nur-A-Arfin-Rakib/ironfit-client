const images = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", label: "Main Gym Floor" },
  { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80", label: "Weight Room" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", label: "Cardio Zone" },
  { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80", label: "Boxing Ring" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", label: "Yoga Studio" },
  { src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80", label: "Personal Training" },
];

const Gallery = () => {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">FACILITIES</p>
          <h2 className="font-heading text-5xl text-white tracking-wider mb-4">OUR GYM GALLERY</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            State-of-the-art equipment, premium facilities, and an environment built for champions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${i === 0 || i === 3 ? "md:row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: i === 0 || i === 3 ? "400px" : "200px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">{img.label}</span>
              </div>
              <div className="absolute inset-0 border-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
