import React from "react";
import ModalWrapper from "./ModalWrapper";
import Table from "../../components/table/Table";

const AssetsDetailsAssociatedModal = ({ onclose }) => {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg">
          Associate Asset - undefined
        </h2>
        <div>
            <Table/>
        </div>
        <div className="flex justify-center my-5">
          <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300">
            Done
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AssetsDetailsAssociatedModal;
