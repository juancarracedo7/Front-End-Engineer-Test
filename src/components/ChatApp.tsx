import React from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';
import '../styles/ChatApp.css';

const ChatApp: React.FC = () => {
  const { messages, sendMessage, currentUser } = useChat();

  return (
    <div className="container">
      <h1>Real-Time Chat Application</h1>
      <ChatWindow messages={messages} currentUser={currentUser} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default ChatApp;
