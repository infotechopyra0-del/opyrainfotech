'use client'

import { useState } from 'react'

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Opyra Infotech. How can we help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const quickReplies = [
    { text: "💻 Web Development", message: "I'm interested in web development services" },
    { text: "🛒 E-commerce", message: "I need e-commerce solutions" },
    { text: "📱 Mobile Apps", message: "I want to build a mobile app" },
    { text: "🏢 ERP/CRM", message: "I need ERP or CRM systems" },
    { text: "📈 Digital Marketing", message: "I'm looking for digital marketing services" },
    { text: "💬 Talk to Human", message: "I want to speak with a human representative" }
  ]

  const handleQuickReply = (reply: { text: string, message: string }) => {
    // Redirect to WhatsApp with the selected message
    const whatsappUrl = `https://wa.me/916390057777?text=${encodeURIComponent(reply.message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleDirectChat = () => {
    const whatsappUrl = `https://wa.me/916390057777?text=Hi, I would like to chat with Opyra Infotech team.`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-16'}`}>
        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 mb-4 overflow-hidden">
            {/* Header */}
            <div className="bg-green-500 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-500 text-lg">💬</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Opyra Infotech</h3>
                  <p className="text-green-100 text-xs">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className={`max-w-xs ${message.sender === 'bot' ? 'mr-auto' : 'ml-auto'}`}>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'bot' 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-green-500 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-3">Choose a topic to get started:</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors text-left border border-gray-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleDirectChat}
                className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>💬</span>
                Start Chat on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'rotate-180' : 'animate-pulse'
          }`}
        >
          <span className="text-white text-2xl">
            {isOpen ? '↓' : '💬'}
          </span>
        </button>

        {/* Notification Dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        )}
      </div>
    </>
  )
}