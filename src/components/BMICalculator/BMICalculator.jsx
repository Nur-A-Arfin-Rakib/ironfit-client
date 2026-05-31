import { useState } from "react";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const result = (w / (h * h)).toFixed(1);
    setBmi(result);

    if (result < 18.5) setCategory({ label: "Underweight", color: "text-blue-400" });
    else if (result < 25) setCategory({ label: "Normal weight", color: "text-green-400" });
    else if (result < 30) setCategory({ label: "Overweight", color: "text-yellow-400" });
    else setCategory({ label: "Obese", color: "text-red-500" });
  };

  const getBarWidth = () => {
    if (!bmi) return 0;
    return Math.min((bmi / 40) * 100, 100);
  };

  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Info */}
          <div>
            <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">HEALTH TOOL</p>
            <h2 className="font-heading text-5xl text-white tracking-wider mb-6">BMI CALCULATOR</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Body Mass Index (BMI) is a simple calculation using a person's height and weight. 
              Know your BMI and take the first step towards your fitness goals.
            </p>

            {/* BMI Scale Info */}
            <div className="space-y-2">
              {[
                { range: "< 18.5", label: "Underweight", color: "bg-blue-400" },
                { range: "18.5 – 24.9", label: "Normal weight", color: "bg-green-400" },
                { range: "25 – 29.9", label: "Overweight", color: "bg-yellow-400" },
                { range: "≥ 30", label: "Obese", color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-gray-400 text-sm">{item.range} — {item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="space-y-5 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors tracking-wider"
            >
              CALCULATE BMI
            </button>

            {bmi && (
              <div className="mt-6 p-5 bg-[#1a1a1a] rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Your BMI</span>
                  <span className="font-heading text-3xl text-white">{bmi}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-700"
                    style={{ width: `${getBarWidth()}%` }}
                  />
                </div>
                <div className={`text-center font-bold text-lg ${category.color}`}>
                  {category.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
