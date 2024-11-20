import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatWindow from '../components/ChatWindow';

describe('ChatWindow', () => {
  const mockMessages = [
    { id: 1, text: 'Hola', sender: 'User1' },
    { id: 2, text: '¿Cómo estás?', sender: 'User2' },
  ];

  test('renders "..." when there are no messages', () => {
    render(<ChatWindow messages={[]} currentUser="Test User" />);

    expect(screen.getByText('...')).toBeInTheDocument();
  });

  test('renders all messages correctly', () => {
    render(<ChatWindow messages={mockMessages} currentUser="Test User" />);

    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();

    expect(screen.getByText('User1:')).toBeInTheDocument();
    expect(screen.getByText('User2:')).toBeInTheDocument();
  });

  test('displays the correct number of messages', () => {
    render(<ChatWindow messages={mockMessages} currentUser="Test User" />);

    const messageElements = screen.getAllByRole('article');
    expect(messageElements).toHaveLength(2);
  });
});
