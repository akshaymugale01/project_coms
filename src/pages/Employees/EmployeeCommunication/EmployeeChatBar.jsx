import React, { useState } from 'react';
import { PiPaperPlaneTilt } from "react-icons/pi";
import { GrAttachment } from "react-icons/gr";
const EmployeeCharBar = ({ onSendMessage }) => {

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 border-t bg-white">
      <input
        type="text"
        className="flex-grow px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md focus:outline-none"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button
        className="ml-2 p-2 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={() => alert('Attach a file')}
      >
        <GrAttachment />
      </button>
      <button
        className="ml-2 p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
        onClick={handleSendMessage}
      >
        <PiPaperPlaneTilt />
      </button>
    </div>
  );
};

export default EmployeeCharBar