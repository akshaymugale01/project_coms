import React from "react";
import { deleteVibeUserBoard } from "../../api";
import ModalWrapper from "./ModalWrapper";
import { useSelector } from "react-redux";

const BoardDeleteModal = ({ boardId, onCancel }) => {
  const confirmDelete = async (event, boardId) => {
    event.stopPropagation();

    try {
      const deleteBoardResp = await deleteVibeUserBoard(boardId);
      if (deleteBoardResp.success) {
        console.log("Board deleted successfully.");
        window.location.reload();
      } else {
        console.error("Failed to delete board.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black backdrop-blur-sm bg-opacity-5 z-20">
      <div
        className="bg-white overflow-auto max-h-[70%] shadow-custom-all-sides  md:w-auto w-96 p-4 px-8 flex flex-col rounded-md gap-5"
        style={{ background: themeColor }}
      >
        <p className="text-white font-medium">
          Are you sure you want to delete this board?
        </p>
        <div  className="flex gap-2">
          {" "}
          <button
            className="bg-white px-2 rounded-full  "
            style={{ width: "50%" }}
            onClick={(event) => confirmDelete(event, boardId)}
          >
            Confirm
          </button>
          <button
          className="bg-red-400 px-2 rounded-full text-white"
            style={{
              width: "50%",
             
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDeleteModal;
