import { useEffect, useState, useRef } from 'react';
import { API_URL_WS } from '../../api';
const useWebSocketServiceForTasks = (task_id) => {
  const [socket, setSocket] = useState(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const socketRef = useRef(null);
  
  const connect = () => {

    console.log(task_id)

    if (task_id){

    
    const newSocket = new WebSocket(`${API_URL_WS}/get_chats_and_activities/?task_id=${task_id}`);

    newSocket.onopen = () => {
      console.log('WebSocket is open now for task.');
      setIsWebSocketOpen(true);
    };

    newSocket.onclose = (event) => {
      console.log(event)
      console.error(`WebSocket closed for task: ${event.code} - ${event.reason}`);
      setIsWebSocketOpen(false);
    };

    newSocket.onerror = (error) => {
      console.error(`WebSocket Error in Task: ${error}`);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle incoming messages here, you can update state or trigger other actions.
      console.log('Received message For Tasks:', data);
    };
    console.log(newSocket)
    socketRef.current = newSocket;
    setSocket(newSocket);
}
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsWebSocketOpen(false);
    }
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    // Connect on component mount
    connect();

    // Disconnect on component unmount
    return () => {
      disconnect();
    };
  }, [task_id]);

  const setOnMessageHandler = (onMessageHandler) => {

    if (socketRef.current) {
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessageHandler(data);
      };
    }
  };

  return { sendMessage, disconnect, setOnMessageHandler, isWebSocketOpen };
};

export default useWebSocketServiceForTasks;
