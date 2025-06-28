import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'admin',
      time: '10:00 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

     const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Auto-reply after 1 second
    setTimeout(() => {
      const replies = [
        "Thanks for your message! We'll get back to you shortly.",
        "I understand your concern. Let me check that for you.",
        "That's a great question! Here's what I can tell you...",
        "We appreciate your feedback!",
        "Our team is currently looking into this matter."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const adminMessage = {
        id: messages.length + 2,
        text: randomReply,
        sender: 'admin',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, adminMessage]);
    }, 1000);
  };

  return (
    <div className="">
        <Navbar role={role} handleLogout={handleLogout} /> 
    <section className="bg-gray-100 py-8 px-6 md:px-10 lg:px-32 text-gray-800">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Live Chat Periplus</h1>
      
      <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-md overflow-hidden">
        {/* Chat header */}
        <div className="bg-red-600 text-white p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Admin" 
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold">Tanya Periplus</h2>
            <p className="text-xs opacity-80">Typically replies within a few minutes</p>
          </div>
          <div className="ml-auto bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs">
            Online
          </div>
        </div>
        
        {/* Messages area */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'admin' && (
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              <div 
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'}`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-red-200' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
              {message.sender === 'user' && (
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full ml-2 self-end"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
      
      <div className="max-w-2xl mx-auto mt-4 text-center text-sm text-gray-600">
        <p>Our support team is available Monday–Friday, 9AM–5PM.</p>
        <p className="mt-1">For urgent matters, please email us at <a className="text-red-500 underline" href="mailto:periplus.com">periplus.com</a></p>
      </div>
    </section>
      <Footer></Footer>
    </div>
  );
}