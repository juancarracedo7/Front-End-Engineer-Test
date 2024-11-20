import React from 'react';
import ChatMessage from './ChatMessage';
import '../styles/ChatWindow.css';

interface ChatWindowProps {
  messages: { id: number; text: string; sender: string }[];
  currentUser: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUser }) => {
  return (
    <div className="chat-window" role="region" aria-label="Chat Messages">
    {messages.length === 0 ? (
      <p className="loading-dots">...</p>
    ) : (
      messages.map((msg) => <ChatMessage key={msg.id} message={msg} currentUser={currentUser} />)
    )}
  </div>
  
  );
};

export default ChatWindow;
