import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaDumbbell, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { register, googleLogin, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const error = validatePassword(form.password);
    if (error) return toast.error(error);
    setLoading(true);
    try {
      await register(form.email, form.password);
      await updateUserProfile(form.name, form.photo);
      toast.success("Account created! Welcome to IronFit 💪");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Registered with Google!");
      navigate("/");
    } catch {
      toast.error("Google registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div className="relative text-center px-8">
          <h2 className="font-heading text-5xl text-white tracking-widest mb-4">JOIN THE IRON FAMILY</h2>
          <p className="text-gray-300">Start your transformation journey today with expert coaches and premium facilities.</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <FaDumbbell className="text-red-600 text-3xl mx-auto mb-3" />
            <h1 className="font-heading text-3xl text-white tracking-wider">CREATE ACCOUNT</h1>
            <p className="text-gray-400 mt-1">Join IronFit today</p>
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 bg-[#111] border border-gray-700 hover:border-red-600 text-white py-3 rounded-xl transition-colors mb-6 font-semibold">
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-gray-800" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-800" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
              { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              { name: "photo", label: "Photo URL (optional)", type: "url", placeholder: "https://..." },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-gray-400 text-sm mb-2 block">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required={f.name !== "photo"}
                  className="w-full bg-[#111] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars, uppercase & lowercase"
                  required
                  className="w-full bg-[#111] border border-gray-700 focus:border-red-600 text-white px-4 py-3 pr-12 rounded-xl outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors tracking-wider text-lg mt-2">
              {loading ? "Creating..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
