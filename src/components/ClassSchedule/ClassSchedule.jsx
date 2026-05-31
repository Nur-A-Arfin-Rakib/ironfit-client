const schedule = [
  {
    day: "MON",
    classes: [
      { time: "6:00 AM", name: "Morning HIIT", trainer: "Coach Alex", duration: "45 min", spots: 8 },
      { time: "10:00 AM", name: "Yoga Flow", trainer: "Sarah K.", duration: "60 min", spots: 12 },
      { time: "6:00 PM", name: "Strength Training", trainer: "Mike R.", duration: "60 min", spots: 6 },
    ],
  },
  {
    day: "TUE",
    classes: [
      { time: "7:00 AM", name: "Cardio Blast", trainer: "Coach Alex", duration: "45 min", spots: 10 },
      { time: "12:00 PM", name: "Core & Abs", trainer: "Lisa M.", duration: "30 min", spots: 15 },
      { time: "7:00 PM", name: "Boxing Fitness", trainer: "Jake T.", duration: "60 min", spots: 8 },
    ],
  },
  {
    day: "WED",
    classes: [
      { time: "6:00 AM", name: "Morning HIIT", trainer: "Coach Alex", duration: "45 min", spots: 8 },
      { time: "11:00 AM", name: "Pilates", trainer: "Sarah K.", duration: "60 min", spots: 10 },
      { time: "6:00 PM", name: "Powerlifting", trainer: "Mike R.", duration: "75 min", spots: 6 },
    ],
  },
  {
    day: "THU",
    classes: [
      { time: "7:00 AM", name: "Functional Fit", trainer: "Lisa M.", duration: "45 min", spots: 12 },
      { time: "12:00 PM", name: "Yoga Flow", trainer: "Sarah K.", duration: "60 min", spots: 12 },
      { time: "7:00 PM", name: "Cardio Blast", trainer: "Jake T.", duration: "45 min", spots: 10 },
    ],
  },
  {
    day: "FRI",
    classes: [
      { time: "6:00 AM", name: "Morning HIIT", trainer: "Coach Alex", duration: "45 min", spots: 8 },
      { time: "10:00 AM", name: "Zumba Dance", trainer: "Maria S.", duration: "60 min", spots: 20 },
      { time: "6:00 PM", name: "Strength Training", trainer: "Mike R.", duration: "60 min", spots: 6 },
    ],
  },
  {
    day: "SAT",
    classes: [
      { time: "8:00 AM", name: "Weekend Warriors", trainer: "Coach Alex", duration: "90 min", spots: 15 },
      { time: "11:00 AM", name: "Yoga & Meditation", trainer: "Sarah K.", duration: "75 min", spots: 12 },
    ],
  },
];

const ClassSchedule = () => {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2">TIMETABLE</p>
          <h2 className="font-heading text-5xl text-white tracking-wider mb-4">CLASS SCHEDULE</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Find the perfect class for your schedule. New classes added every week.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-w-max md:min-w-0">
            {schedule.map((day) => (
              <div key={day.day} className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden min-w-[200px] md:min-w-0">
                <div className="bg-red-600 py-3 text-center">
                  <span className="font-heading text-xl tracking-widest text-white">{day.day}</span>
                </div>
                <div className="p-3 space-y-3">
                  {day.classes.map((cls, i) => (
                    <div key={i} className="bg-[#1a1a1a] rounded-xl p-3 hover:bg-red-600/10 transition-colors cursor-pointer">
                      <div className="text-red-500 text-xs font-bold mb-1">{cls.time}</div>
                      <div className="text-white text-sm font-semibold">{cls.name}</div>
                      <div className="text-gray-400 text-xs">{cls.trainer}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-500 text-xs">{cls.duration}</span>
                        <span className="text-green-400 text-xs">{cls.spots} spots</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
