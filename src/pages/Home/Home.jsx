import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import MembershipPlans from "../../components/MembershipPlans/MembershipPlans";
import BMICalculator from "../../components/BMICalculator/BMICalculator";
import ClassSchedule from "../../components/ClassSchedule/ClassSchedule";
import Testimonials from "../../components/Testimonials/Testimonials";
import Gallery from "../../components/Gallery/Gallery";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredTrainers, setFeaturedTrainers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/trainers?limit=6`)
      .then((res) => setFeaturedTrainers(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <Banner />

      {/* Featured Trainers */}
      {featuredTrainers.length > 0 && (
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">OUR EXPERTS</p>
              <h2 className="font-heading text-5xl text-white tracking-wider mb-4">FEATURED TRAINERS</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Train with the best. Our certified coaches bring years of experience and proven results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {featuredTrainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/trainers"
                className="inline-flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300"
              >
                View All Trainers
              </Link>
            </div>
          </div>
        </section>
      )}

      <MembershipPlans />
      <ClassSchedule />
      <BMICalculator />
      <Gallery />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl md:text-7xl text-white tracking-wider mb-6">
            START YOUR JOURNEY TODAY
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Join IronFit and take the first step towards the body and life you deserve.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-red-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            GET STARTED FREE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
