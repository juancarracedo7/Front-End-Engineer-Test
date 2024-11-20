import React from 'react';
import '../styles/ChatMessage.css';

interface ChatMessageProps {
  message: { id: number; text: string; sender: string };
  currentUser: string; 
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isSender = message.sender === currentUser;
  return (
    <div className={`message ${isSender ? 'sender' : 'receiver'}`}
    role='article'
    aria-label={message.text}>
      <strong>{message.sender}:</strong> {message.text}
    </div>
  );
};

export default ChatMessage;
