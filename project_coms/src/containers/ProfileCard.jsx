import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { ImEarth } from 'react-icons/im';

const ProfileCard = ({ profile, user, toggleQRVisibility, handlePhoneCopy, handleEmailCopy, handleWebCopy }) => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="bg-white rounded-full z-10 h-20 w-20 absolute left-1/2 transform -translate-x-1/2 -translate-y-10 shadow-custom-all-sides">
        <img src={profile} alt="Profile" className="rounded-full" />
      </div>
      <div
        className="bg-custom-gradient relative shadow-custom-all-sides h-48 w-80 rounded-md cursor-pointer mt-10"
        onClick={toggleQRVisibility}
      >
        <div className="flex flex-col justify-center my-2">
          <p className="text-center font-bold text-white mt-10 text-lg">
            {user.firstname} {user.lastname}
          </p>
          <p className="text-center font-medium text-white">Profession</p>
        </div>
        <div>
          <p className="text-center text-xs text-white">testing description of card</p>
        </div>
        <div className="mt-5 flex justify-center gap-1 md:gap-2">
          <button
            className="bg-white p-2 flex justify-center items-center gap-2 rounded-l-md font-medium"
            onClick={handlePhoneCopy}
          >
            <FaPhoneAlt /> Phone
          </button>
          <button
            className="bg-white p-2 flex justify-center items-center gap-2 font-medium"
            onClick={handleEmailCopy}
          >
            <MdEmail size={20} /> Email
          </button>
          <button
            className="bg-white p-2 flex justify-center items-center gap-2 font-medium rounded-r-md"
            onClick={handleWebCopy}
          >
            <ImEarth /> Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
