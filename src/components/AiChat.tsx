import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Bot, X, Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}
interface AIChatWidgetProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ onSendMessage, messages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggleChat}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Toggle AI Chat"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-40 border border-gray-200">
          <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex items-center shadow-md">
            <Bot className="mr-3" size={24} />
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end max-w-xs ${
                    msg.sender === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  <div
                    className={` p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 w-full px-4 py-2 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
