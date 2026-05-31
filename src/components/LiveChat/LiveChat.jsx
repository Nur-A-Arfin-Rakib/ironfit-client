import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaDumbbell } from "react-icons/fa";

const botResponses = [
  "Hi! Welcome to IronFit support! How can I help you today? 💪",
  "I'd be happy to help you find the perfect trainer for your goals!",
  "You can book a session by visiting a trainer's profile and selecting your preferred day and time.",
  "Our trainers specialize in HIIT, Cardio, Yoga, Strength Training, Boxing, and more!",
  "For membership plans, check out our Starter ($29), Pro ($59), and Elite ($99) options.",
  "Feel free to ask me anything about IronFit! I'm here to help.",
];

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! 👋 I'm the IronFit assistant. How can I help you today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <FaTimes className="text-white text-xl" /> : <FaComments className="text-white text-xl" />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a]"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#111] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaDumbbell className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold">IronFit Support</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-red-100 text-xs">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto text-white/70 hover:text-white">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${msg.sender === "user" ? "bg-red-600 text-white rounded-l-2xl rounded-tr-2xl" : "bg-[#1a1a1a] text-gray-200 rounded-r-2xl rounded-tl-2xl"} px-4 py-2`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-red-200" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] rounded-r-2xl rounded-tl-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-[#1a1a1a] border border-gray-700 focus:border-red-600 text-white px-3 py-2 rounded-xl outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors"
            >
              <FaPaperPlane className="text-white text-sm" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
