import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-4">
      <div>
        <FaDumbbell className="text-red-600 text-8xl mx-auto mb-6 opacity-30" />
        <h1 className="font-heading text-9xl text-red-600 tracking-widest">404</h1>
        <h2 className="font-heading text-3xl text-white tracking-wider mb-4">PAGE NOT FOUND</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like this page skipped leg day and went missing. Let's get you back on track.
        </p>
        <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-colors tracking-wider">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
