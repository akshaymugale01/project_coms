import React from "react";
import { useSelector } from "react-redux";
import ModalWrapper from "../../../containers/modals/ModalWrapper";

const AddSubSubGroupMeterCategoryTypeModal = ({ onclose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col">
        <h2 className="border-b border-gray-400  pb-2 flex justify-center font-semibold text-xl w-full">
          Add Meter Category Type
        </h2>
        <div className="grid grid-cols-1 my-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600 font-medium">
              Meter Category Type
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Meter Category Type "
              className="border rounded-md md:w-96 border-gray-500 p-2 px-2"
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 text-sm text-gray-600 font-medium">
              Sub Meter Category Type
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Sub Meter Category Type"
              className="border rounded-md md:w-96 border-gray-500 p-2 px-2"
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 text-sm text-gray-600 font-medium">
              Sub Sub Meter Category Type
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Sub sub Meter Category Type"
              className="border rounded-md md:w-96 border-gray-500 p-2 px-2"
            />
          </div>
        </div>
        <div className="flex justify-center border-t border-gray-500 w-full">
          <div className="w-96 my-3">
            <button
              className="border-2 border-gray-500 text-white rounded-md px-4 p-1 w-full"
              style={{ background: themeColor }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddSubSubGroupMeterCategoryTypeModal;
