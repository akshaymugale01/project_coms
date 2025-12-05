import React from "react";
import { useSelector } from "react-redux";

const BoardDueDateModal = ({
  closeProjectDateModal,
  dueDateUpdate,
  project,
  handleDueDateChangeUpdate,
  handleUpdateDate,
}) => {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div
        style={{ background: themeColor }}
        className="bg-white overflow-auto max-h-[70%] w-[25rem]  md:w-auto  p-4  flex flex-col rounded-md gap-2"
      >
        <h3 className="text-xl font-medium mb-2 text-white">
          Update Timeline of Project/Board
        </h3>

        <h4 className="text-white font-medium text-lg">{project.board_name}</h4>
        <div className="">
          <div className="text-white font-medium flex flex-col gap-2">
            Set Project Timeline :
            <input
              min={new Date().toISOString().split("T")[0]}
              type="date"
              value={dueDateUpdate}
              onChange={handleDueDateChangeUpdate}
              className="p-1 text-black rounded-md"
            />
          </div>
        </div>

        <div
          className="my-2 gap-2"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={(e) => {
              handleUpdateDate(project.id, e);
              e.stopPropagation();
            }}
            className="bg-white rounded-full px-4 p-1 font-medium"
          >
            Save
          </button>
          <button
            className="bg-red-400 text-white rounded-full px-4 p-1 font-medium"
            onClick={closeProjectDateModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDueDateModal;
