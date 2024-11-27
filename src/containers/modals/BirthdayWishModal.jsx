import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";

const BirthdayWishModal = ({ onclose, confirmDelete }) => {
  const themeColor = useSelector((state)=> state.theme.color)
  return (
    <ModalWrapper onclose={onclose} style={{background: themeColor}}>
      <div className="flex flex-col gap-4 z-10 w-full">
        <h1 className="font-medium text-center text-xl text-white">
          Do you want to Delete Birthday?
        </h1>
        <div style={{ display: "flex", justifyContent: "flex-end" }} className="gap-4">
          <button
            onClick={confirmDelete}
            className="font-medium text-white bg-green-400 px-4 rounded-full"
          >
            Yes
          </button>
          <button
           
            onClick={onclose}
            className="font-medium text-white bg-red-400 px-4 rounded-full"
          >
            No
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BirthdayWishModal;
