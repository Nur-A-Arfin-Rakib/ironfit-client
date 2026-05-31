import { FaCheck, FaCrown, FaDumbbell, FaBolt } from "react-icons/fa";

const plans = [
  {
    name: "STARTER",
    price: 29,
    icon: FaDumbbell,
    color: "border-gray-700",
    btnColor: "bg-gray-700 hover:bg-gray-600",
    features: [
      "Access to gym floor",
      "2 group classes/week",
      "Locker access",
      "Basic nutrition tips",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "PRO",
    price: 59,
    icon: FaBolt,
    color: "border-red-600",
    btnColor: "bg-red-600 hover:bg-red-700",
    features: [
      "Everything in Starter",
      "Unlimited group classes",
      "1 PT session/month",
      "Advanced nutrition plan",
      "Progress tracking",
      "Priority booking",
    ],
    popular: true,
  },
  {
    name: "ELITE",
    price: 99,
    icon: FaCrown,
    color: "border-yellow-500",
    btnColor: "bg-yellow-500 hover:bg-yellow-600 text-black",
    features: [
      "Everything in Pro",
      "4 PT sessions/month",
      "Custom workout plan",
      "Custom diet plan",
      "Body composition analysis",
      "24/7 gym access",
      "Spa & sauna access",
    ],
    popular: false,
  },
];

const MembershipPlans = () => {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">MEMBERSHIP</p>
          <h2 className="font-heading text-5xl text-white tracking-wider mb-4">CHOOSE YOUR PLAN</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Flexible plans designed to fit your goals and lifestyle. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-[#111] border-2 ${plan.color} rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.popular ? "bg-red-600" : "bg-gray-800"}`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <span className="font-heading text-2xl text-white tracking-wider">{plan.name}</span>
                </div>

                <div className="mb-6">
                  <span className="font-heading text-5xl text-white">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                      <FaCheck className="text-red-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-bold text-white tracking-wider transition-colors ${plan.btnColor}`}>
                  GET STARTED
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
