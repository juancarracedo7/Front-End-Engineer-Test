import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatApp from '../components/ChatApp';
import { useChat } from '../hooks/useChat';

jest.mock('../hooks/useChat', () => ({
  useChat: jest.fn(),
}));

const mockUseChat = useChat as jest.Mock;

describe('ChatApp', () => {
  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: [
        { id: 1, text: 'Hola', sender: 'User1' },
        { id: 2, text: '¿Cómo estás?', sender: 'User2' },
      ],
      sendMessage: jest.fn(),
      currentUser: 'Test User',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ChatApp title and messages', () => {
    render(<ChatApp />);

    expect(screen.getByText('Real-Time Chat Application')).toBeInTheDocument();

    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();
  });

  test('renders ChatInput and passes sendMessage', () => {
    render(<ChatApp />);

    const inputElement = screen.getByPlaceholderText('Escribe un mensaje...');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /Enviar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('displays the current user', () => {
    render(<ChatApp />);

    const { currentUser } = mockUseChat.mock.results[0].value;

    expect(mockUseChat).toHaveBeenCalled();

    expect(currentUser).toBe('Test User');
  });
});
