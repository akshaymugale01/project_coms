import React, { useState } from 'react';

const MeetingDropdownButton = ({ isLoading, GenerateMeet, TeamGenerateMeet }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('#dropdownButton') && !event.target.closest('#dropdownMenu')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className=" relative z-20">
      <button
        id="dropdownButton"
        className={`upload-audio ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        disabled={isLoading}
        style={{
          position: 'absolute',
          right: '10px',
          top: '60%',
          transform: 'translateY(-50%)',
          padding: '5px 10px',
          backgroundColor: isLoading ? '#d3d3d3' : '',
        }}
      >
        <b>Generate Link</b>
      </button>
      {isOpen && (
        <div
          id="dropdownMenu"
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            type="button"
            onClick={GenerateMeet}
          >
            Zoom Meet
          </button>
          <button
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            type="button"
            onClick={TeamGenerateMeet}
          >
            Teams Meet
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingDropdownButton;
