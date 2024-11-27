import React from "react";
import ModalWrapper from "./ModalWrapper";
import { IoAddCircle } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuClock } from "react-icons/lu";

const MeetingSummaryModal = ({
  onclose,
  meetingTitle,
  meetingDate,
  startTime,
  endTime,
  summaryData
}) => {
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
            <p className="flex gap-2 items-center"> <LuClock />{endTime}</p>
          </div>
          <div>
            <textarea rows={8} cols={75} className="p-2 border-gray-200 rounded-md border-2" readOnly value={summaryData} />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default MeetingSummaryModal;
