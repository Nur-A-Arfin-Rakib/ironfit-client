import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaDumbbell, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 💪");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid email or password!");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left Side */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div className="relative text-center">
          <FaDumbbell className="text-red-600 text-6xl mx-auto mb-4" />
          <h2 className="font-heading text-6xl text-white tracking-widest">IRON<span className="text-red-600">FIT</span></h2>
          <p className="text-gray-300 mt-3">Train Hard. Live Strong.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <FaDumbbell className="text-red-600 text-3xl mx-auto mb-3 lg:hidden" />
            <h1 className="font-heading text-3xl text-white tracking-wider">SIGN IN</h1>
            <p className="text-gray-400 mt-1">Welcome back to IronFit</p>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 bg-[#111] border border-gray-700 hover:border-red-600 text-white py-3 rounded-xl transition-colors mb-6 font-semibold"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-gray-800" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-800" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#111] border border-gray-700 focus:border-red-600 text-white px-4 py-3 rounded-xl outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#111] border border-gray-700 focus:border-red-600 text-white px-4 py-3 pr-12 rounded-xl outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors tracking-wider text-lg mt-2"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-500 hover:text-red-400 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
