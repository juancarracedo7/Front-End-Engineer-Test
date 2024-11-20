import { useEffect, useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    let user = localStorage.getItem('chatUser');
    if (!user) {
      user = `User-${Math.floor(Math.random() * 10000)}`; 
      localStorage.setItem('chatUser', user);
    }
    setCurrentUser(user);

    // Cargar mensajes almacenados en el localStorage
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Establecer conexión WebSocket
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data); // Parsear mensaje recibido
      setMessages((prev) => {
        const updatedMessages = [...prev, message];
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Guardar mensajes en localStorage
        return updatedMessages;
      });
    };

    ws.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    ws.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    setSocket(ws);

    // Limpiar conexión al desmontar
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = { id: Date.now(), text, sender: currentUser };
      socket.send(JSON.stringify(message)); // Enviar mensaje al servidor
    } else {
      console.error('El WebSocket no está conectado');
    }
  };

  return { messages, sendMessage, currentUser };
};
