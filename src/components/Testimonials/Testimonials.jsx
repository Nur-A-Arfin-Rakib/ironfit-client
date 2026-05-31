import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Uddin",
    role: "Lost 20kg in 4 months",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "IronFit completely changed my life. The trainers are professional, the facilities are world-class, and the community keeps you motivated every single day.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Gained muscle & confidence",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I was skeptical at first, but after 3 months with my personal trainer at IronFit, I've never felt stronger or more confident. Best investment I've ever made!",
    rating: 5,
  },
  {
    name: "Karim Hassan",
    role: "Marathon runner",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    text: "The cardio programs here are incredible. My endurance has improved massively and I completed my first marathon thanks to the coaching at IronFit.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Yoga enthusiast",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "The yoga and flexibility classes are exceptional. Sarah is an amazing instructor and the studio is so peaceful. I come here 5 days a week now!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">SUCCESS STORIES</p>
          <h2 className="font-heading text-5xl text-white tracking-wider mb-4">WHAT MEMBERS SAY</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real results from real people. Join thousands who have transformed their lives at IronFit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] border border-gray-800 hover:border-red-600/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/5"
            >
              <FaQuoteLeft className="text-red-600/30 text-4xl mb-4" />
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">{t.text}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-red-600 object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-red-500 text-xs">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <FaStar key={j} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
