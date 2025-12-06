import React, { useState } from 'react';
import EmployeeCharBar from './EmployeeChatBar';
const initialChats = [
  {
    id: 1,
    name: 'Frances Guerrero',
    image: '/profile1.jpg',
    status: 'online',
    messages: [
      { id: 1, sender: 'Frances Guerrero', text: 'Frances sent a photo.', time: 'Just now' }
    ]
  },
  {
    id: 2,
    name: 'Carolyn Ortiz',
    image: '/profile2.jpg',
    status: 'online',
    messages: [
      { id: 1, sender: 'Carolyn Ortiz', text: 'You missed a call from 👍', time: '1min' }
    ]
  },
  {
    id: 3,
    name: 'Billy Vasquez',
    image: '/profile3.jpg',
    status: 'offline',
    messages: [
      { id: 1, sender: 'Billy Vasquez', text: 'Day sweetness 😊', time: '2min' }
    ]
  },
  {
    id: 4,
    name: 'Dennis Ortiz',
    image: '/profile4.jpg',
    status: 'offline',
    messages: [
      { id: 1, sender: 'Dennis Ortiz', text: 'Ortiz: I\'m adding John', time: '10min' }
    ]
  },
  {
    id: 5,
    name: 'Knight, Billy, Bryan',
    image: '/profile5.jpg',
    status: 'offline',
    messages: [
      { id: 1, sender: 'Billy', text: 'Thank you!', time: '1 day' }
    ]
  },
  {
    id: 6,
    name: 'Knight, Billy, Bryan',
    image: '/profile6.jpg',
    status: 'offline',
    messages: [
      { id: 1, sender: 'Billy', text: 'Thank you!', time: '1 day' }
    ]
  }
];

const EmployeeChatBot = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (message) => {
    const newMessage = {
      id: activeChat.messages.length + 1,
      sender: 'Me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updatedChats = chats.map(chat =>
      chat.id === activeChat.id
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );
    setChats(updatedChats);
    setActiveChat({ ...activeChat, messages: [...activeChat.messages, newMessage] });
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex  h-screen">
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold"> chats</h2>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-gray-500">{filteredChats.length}</span>
            <button className="text-blue-500"><i className="fas fa-edit"></i></button>
          </div>
        </div>
        <div className="p-4">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md focus:outline-none"
            placeholder="Search for chats"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredChats.map(chat => (
            <li
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer ${activeChat.id === chat.id ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <img className="w-10 h-10 rounded-full mr-3" src={chat.image} alt={chat.name} />
              <div className="flex-grow">
                <h3 className="text-gray-800 font-bold">{chat.name}</h3>
                <p className="text-gray-600 text-sm">{chat.messages[chat.messages.length - 1].text}</p>
              </div>
              {chat.status === 'online' && <span className="w-3 h-3 bg-green-500 rounded-full"></span>}
              {chat.status === 'offline' && <span className="w-3 h-3 bg-red-500 rounded-full"></span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-3" src={activeChat.image} alt={activeChat.name} />
            <div>
              <h3 className="text-gray-800 font-bold">{activeChat.name}</h3>
              <p className={`text-sm ${activeChat.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                {activeChat.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-500"><i className="fas fa-phone"></i></button>
            <button className="text-blue-500"><i className="fas fa-video"></i></button>
            <button className="text-blue-500"><i className="fas fa-ellipsis-h"></i></button>
          </div>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {activeChat.messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'Me' ? 'justify-end' : ''} mb-4`}>
              <div className={`p-4 rounded-lg ${msg.sender === 'Me' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p>{msg.text}</p>
                <span className="block text-xs mt-2">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-10">
          <EmployeeCharBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
export default EmployeeChatBot