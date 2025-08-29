import { useState, useEffect, useRef } from 'react';
import { AIChatWidget } from '../components/AiChat';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export const ChatProvider = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I assist you?', sender: 'ai' },
  ]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onopen = () => console.log('WebSocket Connected');
    ws.current.onclose = () => console.log('WebSocket Disconnected');
    ws.current.onmessage = (event) => {
      try {
        const received = JSON.parse(event.data);
        if (received.type === 'chat') {
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.sender === 'ai') {
              const updatedMessages = [...prevMessages];
              updatedMessages[prevMessages.length - 1] = {
                ...lastMessage,
                text: lastMessage.text + received.data,
              };
              return updatedMessages;
            } else {
              return [...prevMessages, { text: received.data, sender: 'ai' }];
            }
          });
        }
      } catch (e) {
        console.error('Error processing message from WebSocket:', e);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessageToBackend = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
      ws.current.send(JSON.stringify({ type: 'chat', data: message }));
    } else {
      console.error('Cannot send message, WebSocket is not open.');
    }
  };
  return <AIChatWidget onSendMessage={sendMessageToBackend} messages={messages} />;
};
