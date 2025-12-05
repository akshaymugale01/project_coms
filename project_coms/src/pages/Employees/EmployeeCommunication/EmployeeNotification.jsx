import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';

const EmployeeNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notification data (replace with actual data or API fetch)
  const notifications = [
    {
      id: 1,
      type: 'Poll',
      title: 'New Poll Created',
      description: 'A new poll has been created on "Topic A".',
      dateTime: 'Just now',
      sender: 'User123',
      recipient: 'Group A',
      status: 'unread',
      actions: ['View Poll']
    },
    {
      id: 2,
      type: 'Forum',
      title: 'Forum Thread Update',
      description: 'There\'s a new reply in the thread "Discussion Topic".',
      dateTime: '2 min ago',
      sender: 'System',
      recipient: 'Employee B',
      status: 'unread',
      actions: ['View Thread']
    },
    {
      id: 3,
      type: 'Chat Bot',
      title: 'Chat Bot Interaction',
      description: 'You have a new message from the chat bot.',
      dateTime: '1 hr ago',
      sender: 'Chat Bot',
      recipient: 'You',
      status: 'read',
      actions: ['Open Chat']
    },
    {
      id: 4,
      type: 'Group',
      title: 'Group Invitation',
      description: 'You\'ve been invited to join the group "Project Team".',
      dateTime: '4 hr ago',
      sender: 'User456',
      recipient: 'You',
      status: 'read',
      actions: ['Join Group']
    },
    {
        id: 5,
        type: 'Group',
        title: 'Group Invitation',
        description: 'You\'ve been invited to join the group "Project Team".',
        dateTime: '4 hr ago',
        sender: 'User456',
        recipient: 'You',
        status: 'read',
        actions: ['Join Group']
      },
      {
        id: 6,
        type: 'Group',
        title: 'Group Invitation',
        description: 'You\'ve been invited to join the group "Project Team".',
        dateTime: '4 hr ago',
        sender: 'User456',
        recipient: 'You',
        status: 'read',
        actions: ['Join Group']
      },

    // Add more notifications as needed
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="relative focus:outline-none">
        <IoIosNotificationsOutline size={35} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-black ">
            <p className="text-sm text-gray-600">{notifications.length} new notifications</p>
          </div>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="p-2 border-b border-gray-200">
                <div className="flex items-center ">
                  <div className="ml-3 flex flex-wrap">
                    <div className='flex gap-3'>
                        <p className="text-md font-normal ">{notification.type}</p>
                        <p className="text-md font-normal mr-3">{notification.title}</p>
                    </div>
                    <div className='flex gap-3'>
                        <p className="text-sm font-normal mr-3">{notification.sender}</p>
                        <p className="text-sm font-normal mr-3">{notification.dateTime}</p>
                    </div>
                    <div className='flex my-1'>
                        <button type='submit' className='border-2 border-gray-500 p-1 px-3 text-xs  rounded-md'>{notification.actions}</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-2">
            <button className="w-full text-sm text-blue-500">
              See all incoming activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeNotification;