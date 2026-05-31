import { useState, useEffect } from "react";
import { FaBell, FaTimes, FaCheck, FaDumbbell, FaCalendarAlt, FaStar } from "react-icons/fa";

const defaultNotifications = [
  { id: 1, type: "booking", message: "Your session with Coach Alex is confirmed for Monday at 6:00 AM", time: "2 min ago", read: false },
  { id: 2, type: "review", message: "Someone left a review on your trainer profile", time: "1 hour ago", read: false },
  { id: 3, type: "reminder", message: "Don't forget your HIIT session today at 6:00 PM!", time: "3 hours ago", read: true },
  { id: 4, type: "booking", message: "New booking received for your trainer Arfin_Rakib", time: "Yesterday", read: true },
  { id: 5, type: "system", message: "Welcome to IronFit! Complete your profile to get started", time: "2 days ago", read: true },
];

const typeIcon = {
  booking: FaCalendarAlt,
  review: FaStar,
  reminder: FaDumbbell,
  system: FaBell,
};

const typeColor = {
  booking: "text-blue-400 bg-blue-400/10",
  review: "text-yellow-400 bg-yellow-400/10",
  reminder: "text-red-400 bg-red-400/10",
  system: "text-gray-400 bg-gray-400/10",
};

const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState(defaultNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markRead = (id) => setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const deleteNotif = (id) => setNotifications(notifications.filter((n) => n.id !== id));

  return (
    <div className="absolute right-0 top-12 w-80 bg-[#111] border border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="font-heading text-white tracking-wider">NOTIFICATIONS</span>
          {unread > 0 && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAllRead} className="text-gray-500 hover:text-red-500 text-xs transition-colors">
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaBell className="text-3xl mx-auto mb-2 text-gray-700" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const Icon = typeIcon[notif.type] || FaBell;
            return (
              <div
                key={notif.id}
                className={`flex gap-3 p-3 border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors ${!notif.read ? "bg-red-600/5" : ""}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${typeColor[notif.type]}`}>
                  <Icon className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${notif.read ? "text-gray-400" : "text-white"}`}>
                    {notif.message}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{notif.time}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {!notif.read && (
                    <button onClick={() => markRead(notif.id)} className="text-gray-600 hover:text-green-400 transition-colors">
                      <FaCheck className="text-xs" />
                    </button>
                  )}
                  <button onClick={() => deleteNotif(notif.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
