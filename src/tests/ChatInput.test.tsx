import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '../components/ChatInput';

describe('ChatInput', () => {
  test('renders input and button', () => {
    render(<ChatInput onSend={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Escribe un mensaje...');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /Enviar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onSend with the correct input value', () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const inputElement = screen.getByPlaceholderText('Escribe un mensaje...');
    const buttonElement = screen.getByRole('button', { name: /Enviar/i });

    fireEvent.change(inputElement, { target: { value: 'Hola mundo' } });
    expect(inputElement).toHaveValue('Hola mundo');

    fireEvent.click(buttonElement);

    expect(mockOnSend).toHaveBeenCalledWith('Hola mundo');

    expect(inputElement).toHaveValue('');
  });

  test('does not call onSend if input is empty', () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const buttonElement = screen.getByRole('button', { name: /Enviar/i });

    fireEvent.click(buttonElement);

    expect(mockOnSend).not.toHaveBeenCalled();
  });
});
