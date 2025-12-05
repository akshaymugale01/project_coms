import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";

const EmployeeCreateSchedule = ({
  closeModal,
  todayDate,
  selectedDate,
  setSelectedDate,
  selectedToDate,
  setSelectedToDate,
  selectedWeekdays,
  weekdaysMap,
  handleWeekdaySelection,
  workinghours,
  handleWorkingHoursChange,
  startTime,
  handleStartTimeChange,
  endTime,
  handleEndTimeChange,
  formatTime,
  selectedTimes,
  handleButtonClick,
  slotDurations,
  slotDuration,
  setSlotDuration,
  timeSlots,
  handleSlotDurationChange,
  handleTimeSlotSelection,
  selectedTimeSlots,
  AddWorkSchedule,
  loading,
  customStylesSlotDuration,
  handleToDateChange,
}) => {
  const screenWidth = window.innerWidth;

  return (
    <div>
      {/* <button className="close" onClick={closeModal}>
        &times;
      </button> */}
      <h2 className="text-xl text-semibold text-white font-medium">
        Working Days Setup
      </h2>
      <hr></hr>
      <div className=" my-5">
        <div className="flex justify-between gap-4">
          <div className="flex-col gap-2 flex w-full">
            <span className="font-medium text-white">FROM DATE</span>

            <input
              type="date"
              className="p-1 rounded-md w-full"
              min={todayDate}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </div>
          <div className="flex-col gap-2 flex w-full">
            <span className="font-medium text-white">TO DATE</span>

            <input
              type="date"
              className="p-1 rounded-md"
              min={todayDate}
              value={selectedToDate}
              onChange={(event) => handleToDateChange(event)}
            />
          </div>
        </div>

        {/* className=' ml-1 mt-4' */}
        <div className="my-4">
          <div className="flex gap-2 items-center">
            <span className="font-medium text-white">SELECT WORKING DAYS</span>
            <div className="flex items-center" style={{ color: "#cdcdcd" }}>
              <span
                style={{
                  display: "flex",
                  color: "#ededed",
                  marginRight: 14,
                  fontFamily:
                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                }}
              >
                [ &nbsp;
                <p
                  className="mr-2 mb-2 "
                  style={{
                    width: 10,
                    height: 10,
                    paddingBottom: 4,
                    marginTop: 7,
                    backgroundColor: "#0A9F6A",
                  }}
                ></p>
                Selected
              </span>
              <span
                style={{
                  display: "flex",
                  color: "#ededed",
                  fontFamily:
                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                }}
              >
                <p
                  className="mr-2 mb-2 "
                  style={{
                    width: 10,
                    height: 10,
                    paddingBottom: 4,
                    marginTop: 7,
                    backgroundColor: "#fff",
                  }}
                ></p>
                Deselected]
              </span>
            </div>
          </div>

          <div className="flex gap-4 my-2">
            {weekdaysMap.map((weekdayObj) => (
              <button
                // style={{
                //   width:
                //     screenWidth >= 1200 && screenWidth <= 1440 ? "10%" : "",
                //   marginBottom: 4,
                // }}
                key={weekdayObj.day}
                className={` rounded-md p-2 px-4  shadow-custom-all-sides font-medium ${
                  selectedWeekdays?.includes(weekdayObj.index)
                    ? "bg-green-400 text-white "
                    : "bg-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleWeekdaySelection(weekdayObj.day);
                }}
              >
                <a>{weekdayObj.day}</a>
              </button>
            ))}
          </div>
        </div>

        <div className="font-medium text-white border-b border-white w-full">
          SUGGESTED WORKING TIME
        </div>

        <div
          id="showCustom"
          className="flex justify-between gap-4 my-2 items-center"
        >
          <div className="w-full">
            <span className=" text-white font-medium">Start Time</span>
            <div className="">
              <input
                // class="border-0"
                id="startDate"
                className="p-1 rounded-md w-full"
                onchange="showDateCustom()"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                style={{ border: "1px solid gray" }}
              />
            </div>
          </div>

          <div className="w-full">
            <span className=" text-white font-medium">End Time</span>
            <div class="">
              <input
                // class="border-0"
                id="endDate"
                onchange="showDateCustom()"
                className="p-1 rounded-md w-full"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                style={{ border: "1px solid gray" }}
              />
            </div>
          </div>
        </div>

        {/* <div className='row schedule-fields ml-1'> */}
        {/* {startTime && endTime && ( */}
        <div className="flex justify-between gap-4 items-center">
          <h2 className="font-medium text-white w-full">
            NORMAL WORKING HOURS :{" "}
          </h2>
          <input
            className="p-1 rounded-md border-white text-white w-full"
            type="text"
            placeholder="Ex:8 hours"
            // style={{
            //   borderRadius: 4,
            //   border: "1px solid gray",
            //   backgroundColor: "#fff",
            // }}
            value={workinghours}
            // onChange={(e) => setWorkinghours(e.target.value)}
            onChange={handleWorkingHoursChange}
            disabled
          />
        </div>
        {/* </div> */}

        <div className="my-2">
          <div className="">
            <span className="font-medium text-white mb-2">
              SELECT SLOT DURATION
            </span>
            <Select
              className=""
              value={slotDurations.find(
                (option) => option.value === slotDuration
              )}
              // onChange={(option) => setSlotDuration(option.value)}
              options={slotDurations}
              onChange={handleSlotDurationChange}
              styles={customStylesSlotDuration}
            />
          </div>
          <div className="my-4 flex items-center gap-2">
            <span className="text-white font-medium">SELECT TIME SLOT</span>
            <div className="flex ">
              <span
                style={{
                  display: "flex",
                  color: "#ededed",
                  marginRight: 14,
                  fontFamily:
                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                }}
              >
                [ &nbsp;
                <p
                  className="mr-2 mb-2 "
                  style={{
                    width: 10,
                    height: 10,
                    paddingBottom: 4,
                    marginTop: 7,
                    backgroundColor: "#0A9F6A",
                  }}
                ></p>
                Selected
              </span>
              <span
                style={{
                  display: "flex",
                  color: "#ededed",
                  fontFamily:
                    "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,Courier New, monospace",
                }}
              >
                <p
                  className="mr-2 mb-2 "
                  style={{
                    width: 10,
                    height: 10,
                    paddingBottom: 4,
                    marginTop: 7,
                    backgroundColor: "#fff",
                  }}
                ></p>
                Deselected]
              </span>
            </div>
            <br></br>
          </div>

          {/* <div className="ml-4">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="btn mr-2 mb-2 btn-unselected" style={{ width: '15%' }}>
                        <a>{`${slot.start} - ${slot.end}`}</a>
                      </div>
                    ))}
                  </div> */}

          <div className="grid grid-cols-6 gap-2 w-full">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`rounded-md p-1 px-4 cursor-pointer shadow-custom-all-sides font-medium ${
                  selectedTimeSlots[`${slot.start} - ${slot.end}`]
                  ? "bg-green-400 text-white"
                  : "bg-white"
                }`}
                onClick={() => handleTimeSlotSelection(slot)}
              >
                <a className="flex w-full ">
                  <p>{`${slot.start}`}</p> - <p>{`${slot.end}`}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
     <div className="flex justify-end gap-4">

      <button className="p-1 px-4 font-medium bg-white rounded-full hover:bg-gray-200 transition-all duration-300" onClick={() => AddWorkSchedule()}>
        Save
      </button>
      <button className="p-1 px-4 font-medium bg-red-400 hover:bg-red-500 text-white rounded-full transition-all duration-300" onClick={closeModal}>Cancel</button>
    </div>
     </div>
  );
};

export default EmployeeCreateSchedule;
