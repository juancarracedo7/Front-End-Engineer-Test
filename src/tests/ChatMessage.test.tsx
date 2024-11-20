import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatMessage from '../components/ChatMessage';

describe('ChatMessage', () => {
  const mockMessage = { id: 1, text: 'Hola, ¿cómo estás?', sender: 'Test User' };

  test('renders message with correct text and sender', () => {
    render(<ChatMessage message={mockMessage} currentUser="Test User" />);

    expect(screen.getByText('Hola, ¿cómo estás?')).toBeInTheDocument();

    expect(screen.getByText('Test User:')).toBeInTheDocument();
  });

  test('applies sender class when message is from the current user', () => {
    render(<ChatMessage message={mockMessage} currentUser="Test User" />);

    const messageElement = screen.getByRole('article', { name: 'Hola, ¿cómo estás?' });
    expect(messageElement).toHaveClass('sender');
  });

  test('applies receiver class when message is not from the current user', () => {
    render(<ChatMessage message={mockMessage} currentUser="Another User" />);

    const messageElement = screen.getByRole('article', { name: 'Hola, ¿cómo estás?' });
    expect(messageElement).toHaveClass('receiver');
  });
});
