import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScheduleDetails } from "../../../api";

const SoftServiceScheduleDetails = () => {
    const {sId, activityId } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  useEffect(() => {
    const fetchTaskDetails = async () => {
      const detailsResp = await getScheduleDetails(sId, activityId);
      console.log(detailsResp.data);
      setTaskDetails(detailsResp.data);
    };
    fetchTaskDetails();
  }, [sId, activityId]);
  if (taskDetails.length === 0)  {
    return (
      <div className="flex  justify-center items-center w-full h-screen p-2">
        <p>No details available</p>
      </div>
    );
  }
  const { soft_service_name, checklist_name, created_at } = taskDetails[0];
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short", // or 'long' for full month names
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: '2-digit'
      hour12: true,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="flex justify-between bg-gray-400 rounded p-2 w-full mx-20 text-white">
        <div className="grid grid-cols-2">
          <p className="font-medium">Soft service Name :</p>
          <p>{soft_service_name}</p>
        </div>
        <p>{dateFormat(created_at)}</p>
        <div className="grid grid-cols-2">
          <p className="font-medium">Checklist Name :</p>
          <p>{checklist_name}</p>
        </div>
      </div>
      <div className="w-full my-2">
       
        {taskDetails.map((task, index) => (
          <div key={task.id}>
            {/* {index === 0 ? null : ( */}
              <>
              <div className="my-4 flex flex-col bg-gray-100 shadow-custom-all-sides p-2 rounded-md gap-2">

                <div className="flex gap-4 items-center">
                  <p className="font-medium">Question :</p>
                  <p>{task.question_name}</p>
                </div>
                <div className="flex gap-4 items-center bg-green-200 p-2 rounded-md">
                  <p className="font-medium">Answer :</p>
                  <p>{task.value}</p>
              </div>
                </div>
              </>
            {/* )} */}
          </div>
        ))}
      </div>
    </div>

  )
}

export default SoftServiceScheduleDetails