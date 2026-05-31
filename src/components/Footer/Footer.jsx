import { Link } from "react-router-dom";
import { FaDumbbell, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaDumbbell className="text-red-600 text-2xl" />
            <span className="font-heading text-2xl tracking-widest text-red-600">IRON<span className="text-white">FIT</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate fitness destination. Train harder, live stronger with IronFit.
          </p>
          <div className="flex gap-4 mt-5">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Icon className="text-white text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg tracking-wider text-white mb-4">QUICK LINKS</h4>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/trainers", label: "Trainers" },
              { to: "/add-trainer", label: "Add Trainer" },
              { to: "/my-bookings", label: "My Bookings" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-400 hover:text-red-500 text-sm transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="font-heading text-lg tracking-wider text-white mb-4">PROGRAMS</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {["Strength Training", "Cardio Blast", "Yoga & Flexibility", "HIIT Workout", "Nutrition Plan", "Personal Training"].map((p) => (
              <li key={p} className="hover:text-red-500 cursor-pointer transition-colors">→ {p}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg tracking-wider text-white mb-4">CONTACT US</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📍 123 Fitness Street, Dhaka</li>
            <li>📞 +880 1700-000000</li>
            <li>✉️ info@ironfit.com</li>
            <li>🕐 Mon–Sat: 6AM – 10PM</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} IronFit. All rights reserved. Built with 💪
      </div>
    </footer>
  );
};

export default Footer;
