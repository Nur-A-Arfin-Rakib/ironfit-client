const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-red-600 font-heading text-xl tracking-widest">
          IRONFIT
        </div>
      </div>
    </div>
  );
};

export default Spinner;
