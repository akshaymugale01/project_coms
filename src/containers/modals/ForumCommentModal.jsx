import React from "react";
import ModalWrapper from "./ModalWrapper";
import image from "/profile.png";
import { MdNumbers, MdPhotoSizeSelectActual } from "react-icons/md";
import { HiGif } from "react-icons/hi2";
const ForumCommentsModal = ({ onclose} ) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col w-96 justify-center">
      <div className=' rounded-md my-3 '>
        <div className='flex gap-2 mx-3 my-5'>
          <img src={image} className="w-10 h-10 " alt="forum-profile" />
          <div className="flex-1 flex flex-col">
          <textarea
            placeholder="Add a comment..."
            className="border p-2 border-gray-500 rounded-md w-full"
            rows="1"
          />
          <div className="flex justify-between my-3">
            <div className="flex gap-2">
              <MdPhotoSizeSelectActual size={20}/>
              <HiGif size={20}/>
              <MdNumbers size={20}/>
            </div>
            <div>
              <button className="border-2 border-black rounded-md p-1 px-4">comment</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </ModalWrapper>
  );
};
export default ForumCommentsModal