# Real-Time Chat Application

Este proyecto es una aplicación de chat en tiempo real desarrollada con React, TypeScript, custom hooks, WebSockets, y pruebas unitarias con Jest y React Testing Library.

## 🎯 Objetivo

La aplicación permite a los usuarios comunicarse en tiempo real mediante WebSockets. Es un proyecto diseñado para demostrar habilidades avanzadas en:

- **React y TypeScript**: Componentes funcionales y tipados.
- **Gestión de estado**: Custom hooks (useChat).
- **Pruebas unitarias**: Cobertura con Jest y React Testing Library.
- **Comunicación en tiempo real**: WebSockets.

## ✨ Características principales

- 🚀 **Enviar mensajes**: Escribe y envía mensajes fácilmente desde la interfaz.
- 💬 **Recibir mensajes en tiempo real**: Los mensajes de otros usuarios aparecen instantáneamente.
- 💾 **Persistencia local**: Historial de mensajes almacenado en localStorage.
- 🎨 **Interfaz moderna**: Diseño responsivo con degradados atractivos.

## 🛠️ Requisitos del proyecto

### Componentes

- **ChatApp**: El componente principal que encapsula toda la lógica.
- **ChatWindow**: Muestra la lista de mensajes.
- **ChatMessage**: Renderiza un mensaje individual.
- **ChatInput**: Campo de entrada para enviar mensajes.

### Hook personalizado

- **useChat**:
  - Maneja el estado de los mensajes.
  - Gestiona la conexión WebSocket.
  - Persiste datos localmente y establece un identificador único para el usuario.

## 📂 Estructura del proyecto

/src
├── components
│   ├── ChatApp.tsx       # Componente principal
│   ├── ChatWindow.tsx    # Lista de mensajes
│   ├── ChatMessage.tsx   # Mensaje individual
│   ├── ChatInput.tsx     # Entrada de mensajes
├── hooks
│   └── useChat.ts        # Hook personalizado
├── tests
│   ├── ChatApp.test.tsx       # Pruebas para ChatApp
│   ├── ChatWindow.test.tsx    # Pruebas para ChatWindow
│   ├── ChatMessage.test.tsx   # Pruebas para ChatMessage
│   ├── ChatInput.test.tsx     # Pruebas para ChatInput
│   └── useChat.test.ts        # Pruebas para el hook useChat
├── styles
│   ├── ChatApp.css       # Estilos para ChatApp
│   ├── ChatWindow.css    # Estilos para ChatWindow
│   ├── ChatMessage.css   # Estilos para ChatMessage
│   ├── ChatInput.css     # Estilos para ChatInput
├── App.tsx               # Punto de entrada del frontend
├── index.tsx             # Renderización inicial
└── README.md             # Documentación del proyecto


## 🚀 Cómo correr la aplicación

### Pre-requisitos

- Node.js 
- npm o yarn

### Instalación

1-Clona el repositorio:
git clone https://github.com/tu-usuario/real-time-chat.git
cd real-time-chat

2-Instala las dependencias:
npm install

3-Configura el servidor backend:
git clone https://github.com/YaVendio/frontend-prueba.git
cd frontend-prueba
npm install
npm start

4-Inicia la aplicación:
npm start

5-Abre tu navegador en: [http://localhost:3000](http://localhost:3000).

## 🧪 Cómo correr las pruebas

Ejecuta todas las pruebas unitarias con:
npm test


Incluye:

- Pruebas de componentes (ChatApp, ChatWindow, ChatMessage, ChatInput).
- Pruebas del custom hook (useChat).

## 📈 Principales decisiones técnicas

- **WebSockets**: Comunicación en tiempo real entre cliente y servidor.
- **Custom Hook**: useChat administra el estado local y la conexión WebSocket.
- **Persistencia local**: Uso de localStorage para mantener el historial.
- **Pruebas unitarias**:
  - Mocking de funciones (e.g., WebSocket, localStorage).
  - Simulación de interacción con la interfaz (render, fireEvent).

## 🤔 Desafíos enfrentados y soluciones

- **Simulación de WebSocket en pruebas**:
  - Se utilizó un mock para replicar la funcionalidad del servidor.
- **Persistencia de mensajes**:
  - Los mensajes se almacenan en localStorage para mantener el historial tras recargar.
- **Compatibilidad del backend**:
  - Aseguramos que el backend maneje los mensajes en tiempo real correctamente.
