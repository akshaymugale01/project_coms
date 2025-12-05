import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { useSelector } from "react-redux";
import SummaryTaskSelf from "./SummaryTaskSelf";

const MeetingTaskModal = ({
  onclose,
  meetingTitle,
  meetingDate,
  startTime,
  endTime,
  meetingTask,
  themeColor,
}) => {
    const [taskName, setTaskName] = useState("")
    const [taskSelfModal, setTaskSelfModalOpen] =useState(false)
    const openTaskSelf = (item) => {
        setTaskName(item);
        setTaskSelfModalOpen(true);
        // onclose();
      };
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold border-b border-black text-lg">
          AI Meeting Summary
        </h2>
        <div className="flex flex-col">
          <div className="flex gap-4 items-center my-2">
            <p className="font-medium ">Meeting Title :</p>
            <p> {meetingTitle}</p>
          </div>
          <div className="flex gap-4 items-center font-medium">
            <p className="flex gap-2 items-center">
              <FaRegCalendarAlt /> {meetingDate}
            </p>
            <p className="flex gap-2 items-center">
              <LuClock /> {startTime}
            </p>
            {endTime !== null && "-"}
            <p>{endTime}</p>
          </div>
          <div>
            {meetingTask.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center shadow-custom-all-sides rounded-md my-2 p-2 w-[40rem]"
              >
                <div className="">
                  <div className="">
                    <h2 className="font-semibold">Task {index + 1}</h2>
                  </div>

                  <div className="">
                    <span>{item}</span>
                  </div>
                </div>
                <div
                  className=" rounded-md px-3 mx-2 shadow-custom-all-sides"
                  style={{ background: themeColor }}
                >
                  <button
                    className="p-1 text-white"
                    onClick={() => openTaskSelf(item)}
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
       {taskSelfModal && <SummaryTaskSelf onClose={()=> setTaskSelfModalOpen(false)} taskName={taskName} />}
      </div>
    </ModalWrapper>
  );
};

export default MeetingTaskModal;
