import { renderHook, act } from '@testing-library/react';
import { useChat } from '../hooks/useChat';

describe('useChat', () => {
  let originalWebSocket: typeof WebSocket;
  let mockWebSocket: any;
  let mockLocalStorage: Record<string, string>;

  beforeEach(() => {
    originalWebSocket = global.WebSocket;
    mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN,
      onmessage: jest.fn(),
    };
    global.WebSocket = jest.fn(() => mockWebSocket) as unknown as typeof WebSocket;

    mockLocalStorage = {};
    jest.spyOn(global, 'localStorage', 'get').mockImplementation(() => ({
      length: 0,
      clear: jest.fn(),
      key: jest.fn(),
      getItem: jest.fn((key) => mockLocalStorage[key] || null),
      setItem: jest.fn((key, value) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete mockLocalStorage[key];
      }),
    }));
  });

  afterEach(() => {
    global.WebSocket = originalWebSocket;
    jest.clearAllMocks();
  });

  test('initializes with empty messages and a user', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.currentUser).toMatch(/User-\d+/);
  });

  test('sends a message and updates the local state', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Local Test Message');
    });

    act(() => {
      mockWebSocket.onmessage({
        data: JSON.stringify({
          id: Date.now(),
          text: 'Local Test Message',
          sender: result.current.currentUser,
        }),
      });
    });

    expect(result.current.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Local Test Message',
          sender: result.current.currentUser,
        }),
      ])
    );
  });

  test('receives a message from the WebSocket server', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      mockWebSocket.onmessage({
        data: JSON.stringify({
          id: 1,
          text: 'Message from server',
          sender: 'Server',
        }),
      });
    });

    expect(result.current.messages).toEqual([
      {
        id: 1,
        text: 'Message from server',
        sender: 'Server',
      },
    ]);
  });

  test('cleans up WebSocket on unmount', () => {
    const { unmount } = renderHook(() => useChat());

    unmount(); 

    expect(mockWebSocket.close).toHaveBeenCalledTimes(1); 
  });
});
