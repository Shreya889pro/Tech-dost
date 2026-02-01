"use client";

import { useState, useRef, useEffect } from "react";
import { getBotResponse } from "@/lib/chatLogic";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  badge?: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Namaste! 🙏 Main aapka Tech Dost hoon! Career guidance, learning support, ya kuch bhi puchho - I'm here to help! 💪✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(async () => {
      const response = await getBotResponse(input, userPoints, badges);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: "bot",
        timestamp: new Date(),
        badge: response.badge,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // Update points and badges
      if (response.points) {
        setUserPoints((prev) => prev + (response.points ?? 0));
      }
      if (response.badge && !badges.includes(response.badge)) {
        setBadges((prev) => [...prev, response.badge as string]);
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tech Dost 🚀</h1>
            <p className="text-sm opacity-90">Aapka Career Buddy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-semibold">⭐ {userPoints} Points</span>
            </div>
            {badges.length > 0 && (
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="font-semibold">🏆 {badges.length} Badges</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white text-gray-800 shadow-lg"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                {message.badge && (
                  <div className="mt-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    🎉 New Badge: {message.badge}
                  </div>
                )}
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Apna sawaal yahan type karo... 💬"
            className="flex-1 bg-white/90 text-gray-800 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            Send 🚀
          </button>
        </div>
      </div>
    </div>
  );
}