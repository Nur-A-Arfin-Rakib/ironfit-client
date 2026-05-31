import { Link } from "react-router-dom";
import { FaArrowRight, FaDumbbell, FaFire, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-500 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <FaFire className="animate-pulse" />
            <span>#1 Fitness Platform in Bangladesh</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-6xl md:text-8xl text-white tracking-wider leading-none mb-6">
            FORGE YOUR
            <span className="block text-red-600">IRON</span>
            BODY
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            Train with elite coaches, track your progress, and transform your physique. 
            IronFit is where champions are made.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/trainers"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Find a Trainer <FaArrowRight />
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 border-2 border-gray-600 hover:border-red-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Join IronFit
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { icon: FaUsers, value: "500+", label: "Active Members" },
              { icon: FaDumbbell, value: "50+", label: "Expert Trainers" },
              { icon: FaFire, value: "20+", label: "Programs" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                  <Icon className="text-red-500" />
                </div>
                <div>
                  <div className="font-heading text-2xl text-white tracking-wider">{value}</div>
                  <div className="text-gray-400 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
        <FaDumbbell className="text-red-600 text-[200px] rotate-45" />
      </div>
    </section>
  );
};

export default Banner;
