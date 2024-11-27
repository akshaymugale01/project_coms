import React, { useState, useEffect, useRef } from "react";

import Modal from "react-modal";

// import {
//   getDataFromAPI,
//   postDataToAPI,

// } from "../../../../Api/api_Methods";
// import {

//   GetEmployeeSchedule,
//   CreateEmployeeSchedule,
// } from "../../../../Api/api_Urls";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import EmployeeCreateSchedule from "./EmployeeCreateSchedule";
import { createVibeSchedule, getVibeSchedule, getVibeTodaySlots } from "../../api";
import toast from "react-hot-toast";

// organization[0].name
function Schedule() {
  Modal.setAppElement("#root");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalWidth, setModalWidth] = useState("900px");

  const previousWidth = useRef(window.innerWidth);

  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const currentWidth = window.innerWidth;

    if (currentWidth !== previousWidth.current) {
      if (currentWidth <= 767) {
        setModalWidth("270px");
      } else if (currentWidth <= 1024) {
        setModalWidth("600px");
      } else {
        setModalWidth("920px");
      }

      previousWidth.current = currentWidth;
    }
  };

  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    // GetOrganizations();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  const customStylesSlotDuration = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    // Optionally, you can customize other parts of the select component
    control: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  const customStylesSchedule = {
    overlay: {
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // width: '900px', // Adjust the width as needed
      width: modalWidth,
      // maxHeight: '500px', // Adjust the max height as needed
      height: "620px",
      overflow: "auto",
      color: "#fff",
      //background:'#133953'
      boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.2)",
      borderColor: "#133953",
      background: "#132A3A",
    },
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  var time = [];

  const [selectedTimes, setSelectedTimes] = useState(
    splitTime().reduce((obj, time) => ({ ...obj, [time]: true }), {})
  );

  const [UpdatedselectedTimes, UpdatedsetSelectedTimes] = useState(
    splitTime().reduce((obj, time) => ({ ...obj, [time]: true }), {})
  );

  const handleButtonClick = (time) => {
    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [time]: !prevSelectedTimes[time],
    }));
  };

  function splitTime() {
    const numSlots = 16;
    const timeSlots = [];

    const startTimeStr = "11:00";
    const endTimeStr = "19:00";

    const [startHours, startMinutes] = startTimeStr
      .split(":")
      .map((str) => parseInt(str, 10));
    const [endHours, endMinutes] = endTimeStr
      .split(":")
      .map((str) => parseInt(str, 10));

    const totalMinutes =
      (endHours - startHours) * 60 + (endMinutes - startMinutes);
    const interval = totalMinutes / numSlots;

    for (let i = 0; i < numSlots; i++) {
      const slotStartMinutes = startHours * 60 + startMinutes + i * interval;
      const slotEndMinutes =
        startHours * 60 + startMinutes + (i + 1) * interval;

      const startTimeFormatted = formatTime(slotStartMinutes);
      const endTimeFormatted = formatTime(slotEndMinutes);

      timeSlots.push(`${startTimeFormatted} - ${endTimeFormatted}`);
    }

    return timeSlots;
  }

  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}`;
  }

  const formatTimesch = (time) => {
    if (!time) return "";

    // Check if the time string already contains seconds
    if (time.split(":").length === 2) {
      // If it doesn't contain seconds, append ':00'
      return time + ":00";
    } else {
      // If it already contains seconds, return it as is
      return time;
    }
  };

  const employeeUserId = localStorage.getItem("user_id");

  // const doctor_id = localStorage.getItem("user_id");
  const [range, setRange] = useState([]);

  // useEffect(() => {
  //   if (range.length > 0) {
  //   }
  // }, [range]);

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  // console.log(startDate, endDate);
  const [isLoading, setIsLoading] = useState(false);

  const getDataFromDateRange = async () => {
    try {
      const params = {
        user_id: user_id,
        from_date: startDate,
        to_date: endDate,
      };

      const response = await getVibeTodaySlots(user_id,startDate,endDate);
      if (response.success === true) {
        console.log(response);
        setRange(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    if (startDate && endDate) {
      getDataFromDateRange();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      getDataFromDateRange();
    }
  }, [startDate, endDate]);

  //

  // ------------------------------------------------

  const user_id = localStorage.getItem("VIBEUSERID");
  const [workinghours, setWorkinghours] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endTime, setEndTime] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const slotDurations = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
  ];

  const [slotDuration, setSlotDuration] = useState(30);

  const handleStartTimeChange = (e) => {
    const start = e.target.value;
    setWorkinghours(calculateTimeDifference(start, endTime));
    setStartTime(start);
    if (workinghours) {
      const [hours, minutes] = start.split(":");
      const end = new Date();
      end.setHours(parseInt(hours) + parseInt(workinghours));
      end.setMinutes(parseInt(minutes));
      setEndTime(end.toTimeString().slice(0, 5));
      generateTimeSlots(start, endTime, slotDuration);
    }
    generateTimeSlots(start, endTime, slotDuration);
    // if (endTime) {
    //   const workingHours = calculateTimeDifference(startTime, endTime);
    //   setWorkinghours(workingHours);
    // } else {
    //   setWorkinghours("");
    // }
  };

  // const handleWorkingHoursChange = (e) => {
  //   const hours = e.target.value;
  //   // const hours = parseInt(e.target.value);
  //   if (hours > 24) {
  //     toast.error("Working hours can't be more than 24 hrs", { position: 'top-center', autoClose: 2000 });
  //     return;
  //   }
  //   setWorkinghours(hours);
  //   if (startTime) {
  //     const [startHours, startMinutes] = startTime.split(':');
  //     const end = new Date();
  //     end.setHours(parseInt(startHours) + parseInt(hours));
  //     end.setMinutes(parseInt(startMinutes));
  //     setEndTime(end.toTimeString().slice(0, 5));
  //   }
  //   generateTimeSlots(startTime, endTime, slotDuration);
  // };
  const handleWorkingHoursChange = (e) => {
    const hours = e.target.value;
    if (hours > 24) {
      toast.error("Working hours can't be more than 24 hrs");
      return;
    }
    setWorkinghours(hours);

    // Calculate the end time based on start time and working hours
    if (startTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const endTime = new Date();
      endTime.setHours(startHours);
      endTime.setMinutes(startMinutes);
      endTime.setHours(endTime.getHours() + parseInt(hours));
      const calculatedEndTime = endTime.toTimeString().slice(0, 5);
      setEndTime(calculatedEndTime);
      generateTimeSlots(startTime, endTime, slotDuration);
    }
    generateTimeSlots(startTime, endTime, slotDuration);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    console.log("🚀 ~ handleEndTimeChange ~ e.target.value:", e.target.value);

    setWorkinghours(calculateTimeDifference(startTime, e.target.value));
    generateTimeSlots(startTime, e.target.value, slotDuration);
  };

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const [weekdaysMap, setWeekdaysMap] = useState([
    { day: "Mon", index: 0, isActive: false },
    { day: "Tue", index: 1, isActive: false },
    { day: "Wed", index: 2, isActive: false },
    { day: "Thu", index: 3, isActive: false },
    { day: "Fri", index: 4, isActive: false },
    { day: "Sat", index: 5, isActive: false },
    { day: "Sun", index: 6, isActive: false },
  ]);

  const handleWeekdaySelection = (weekday) => {
    console.log(`Selected day: ${weekday}`);

    // Find the index of the selected day
    const index = weekdaysMap.find((dayObj) => dayObj.day === weekday)?.index;

    if (index !== undefined) {
      // Toggle the isActive status of the selected day
      const updatedWeekdaysMap = weekdaysMap.map((dayObj) =>
        dayObj.index === index
          ? { ...dayObj, isActive: !dayObj.isActive }
          : dayObj
      );

      // Update the weekdaysMap with the modified isActive status
      setWeekdaysMap(updatedWeekdaysMap);

      // Update the selected weekdays list
      setSelectedWeekdays((prevSelectedWeekdays) =>
        prevSelectedWeekdays.includes(index)
          ? prevSelectedWeekdays.filter((day) => day !== index)
          : [...prevSelectedWeekdays, index]
      );
    }
  };

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (startTime && endTime && slotDuration) {
      generateTimeSlots(startTime, endTime, slotDuration);
    }
  }, [startTime, endTime, slotDuration]);

  const [selectedTimeSlots, setSelectedTimeSlots] = useState(() =>
    timeSlots.reduce((obj, slot) => {
      const slotKey = `${slot.start} - ${slot.end}`;
      return { ...obj, [slotKey]: true };
    }, {})
  );

  const generateTimeSlots = (start, end, duration) => {
    console.log("🚀 ~ generateTimeSlots ~ duration:", duration);
    console.log("🚀 ~ generateTimeSlots ~ end:", end);
    console.log("🚀 ~ generateTimeSlots ~ start:", start);

    const slots = [];
    const [startHours, startMinutes] = start.split(":").map(Number);

    console.log(`Hours: ${startHours}, Minutes: ${startMinutes}`);
    console.log("🚀 ~ generateTimeSlots ~ typeof end:", typeof end);
    console.log("🚀 ~ generateTimeSlots ~ end:", end);

    let endHours, endMinutes;

    if (typeof end === "string") {
      // [endHours, endMinutes] = end.split(':').map(Number);
      // console.log(`Hours: ${endHours}, Minutes: ${endMinutes}`);

      const timeParts = end.split(":");
      if (timeParts.length === 2) {
        [endHours, endMinutes] = timeParts.map(Number);
        console.log(`Hours: ${endHours}, Minutes: ${endMinutes}`);
      } else {
        console.log(
          "Invalid end time format, setting working hours to an empty string"
        );
        setTimeSlots([]);
        setWorkinghours("");
        return;
      }
    } else if (end instanceof Date) {
      console.log("🚀 ~ generateTimeSlots ~ else if:");
      endHours = end.getHours();
      endMinutes = end.getMinutes();
    } else {
      console.error("Invalid end time format");
      return;
    }

    let startTime = new Date();
    startTime.setHours(startHours, startMinutes, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    console.log("🚀 ~ generateTimeSlots ~ startTime:", startTime);
    console.log("🚀 ~ generateTimeSlots ~ endTime:", endTime);

    while (startTime < endTime) {
      console.log("🚀 ~ generateTimeSlots ~ while:");

      const slotStart = new Date(startTime);
      startTime.setMinutes(startTime.getMinutes() + duration);
      const slotEnd = new Date(startTime);

      const slotKey = `${formatTimeSlot(slotStart)} - ${formatTimeSlot(
        slotEnd
      )}`;
      slots.push({
        start: formatTimeSlot(slotStart),
        end: formatTimeSlot(slotEnd),
        selected: selectedTimeSlots[slotKey] || false,
      });
    }
    console.log("🚀 ~ generateTimeSlots ~ slots:", slots);

    setTimeSlots(slots);
    setSelectedTimeSlots((prevState) =>
      slots.reduce((obj, slot) => {
        const slotKey = `${slot.start} - ${slot.end}`;
        return { ...obj, [slotKey]: prevState[slotKey] || true };
      }, {})
    );
  };

  const handleTimeSlotSelection = (slot) => {
    const slotKey = `${slot.start} - ${slot.end}`;
    setSelectedTimeSlots((prevState) => ({
      ...prevState,
      [slotKey]: !prevState[slotKey],
    }));
  };

  const calculateTimeDifference = (startTime, endTime) => {
    if (!endTime) {
      return "";
    }
    // Parse start and end times
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    // Calculate total minutes from midnight
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;

    // Calculate the difference in minutes
    let differenceInMinutes = endTimeInMinutes - startTimeInMinutes;

    // Adjust to ensure non-negative difference
    if (differenceInMinutes < 0) {
      differenceInMinutes += 24 * 60; // Assuming a 24-hour day
    }

    // Convert difference from minutes to hours and minutes
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const remainingMinutes = differenceInMinutes % 60;

    // Return the difference in hours and minutes
    return `${differenceInHours} hours and ${remainingMinutes} minutes`;
  };

  const formatTimeSlot = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // const formatSlotsForAPI = (slots) => {
  //   return slots.map(slot => `${slot.start} - ${slot.end}`).join(', ');
  // };

  const formatSlotsForAPI = (slots) => {
    return slots
      .filter((slot) => selectedTimeSlots[`${slot.start} - ${slot.end}`])
      .map((slot) => `${slot.start} - ${slot.end}`)
      .join(", ");
  };

  const handleSlotDurationChange = (selectedOption) => {
    console.log(
      "🚀 ~ handleSlotDurationChange ~ selectedOption:",
      selectedOption
    );
    setSlotDuration(selectedOption.value);
    generateTimeSlots(startTime, endTime, selectedOption.value);
  };
 
  const AddWorkSchedule = async () => {
    // if (!startTime || !endTime || !workinghours || !selectedWeekdays || !selectedDate || !selectedToDate || !timeSlots) {
    //     toast.error('All fields are required', { position: 'top-center', autoClose: 2000 });
    //     return;
    // }
    if (!selectedDate) {
      toast.error("Start date fields is required");
      return;
    }
    if (!selectedToDate) {
      toast.error("End date fields is required");
      return;
    }
    if (!selectedWeekdays) {
      toast.error("Weekdays fields are required");
      return;
    }
    if (!startTime) {
      toast.error("Start time fields is required");
      return;
    }
    if (!endTime) {
      toast.error("End time fields is required");
      return;
    }
    if (!workinghours) {
      toast.error("Working hours fields is required");
      return;
    }

    if (!timeSlots) {
      toast.error("Slot duration is required");
      return;
    }

    if (new Date(selectedToDate) < new Date(selectedDate)) {
      toast.error("To Date cannot be earlier than From Date");
    }
    const trueKeysList = Object.entries(UpdatedselectedTimes)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);
      const user_id = localStorage.getItem("VIBEUSERID");
    console.log("Working Hours:", workinghours);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Selected Weekdays:", selectedWeekdays);
    const slotsForAPI = formatSlotsForAPI(timeSlots);
    const formData = new FormData();
    formData.append('user_id',user_id);
    formData.append("start_time", formatTimesch(startTime));
    formData.append("end_time", formatTimesch(endTime));
    formData.append("weekdays", selectedWeekdays);
    formData.append("working_hours", workinghours);
    formData.append("from_date", selectedDate);
    formData.append("to_date", selectedToDate);
    formData.append("slots", slotsForAPI);
    setLoading(true);
    try {
      const response = await createVibeSchedule(formData)
      if (response.success == true) {
        console.log("success");
        fetchWorkingSchedule();
        closeModal();
        if (response.status === 123) {
          toast.error(`${response.message}`);
        }
      } else {
        if (response.status === 123) {
          toast.error(`${response.message}`,);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };
  // ------------------------------------------------

    const fetchWorkingSchedule = async () => {
      setIsLoading(true);
      try {
        // const params = {
        //   // user_id: localStorage.getItem("user_id"),
        //   from_date: startDate,
        //   to_date: endDate,
        // };

        const response = await getVibeSchedule(user_id, startDate, endDate);
        console.log("--fetchWorkingSchedule--");
        console.log(response);

        if (response.success === true) {
          console.log(response.work_schedules);
          setRange(response.work_schedules);

          setIsLoading(false);
        } else {
          console.log("Something went wrong");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };
  useEffect(() => {
    fetchWorkingSchedule();
  }, [startDate, endDate]);

  const handleToDateChange = (event) => {
    const newToDate = event.target.value;

    if (new Date(selectedToDate) < new Date(selectedDate)) {
      toast.error("To Date cannot be earlier than From Date");
    } else {
      setSelectedToDate(newToDate);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <div className="flex ">
      <Navbar />

      <div className="p-4 w-full">
        <div className="flex justify-between w-full my-2">
          <h2 className="font-medium text-2xl">Plan My Calendar</h2>

          <button
            className="p-2 px-4 text-white rounded-md"
            style={{ background: themeColor }}
            onClick={openModal}
          >
            Schedule
          </button>

          {/* <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Schedule Modal"
            style={customStylesSchedule}
          > */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50  ">
              <div
                style={{ background: themeColor }}
                className=" md:w-auto w-full  p-4 md:px-10  flex flex-col rounded-md overflow-auto max-h-[90%] hide-scrollbar"
              >
                <>
                  <EmployeeCreateSchedule
                    closeModal={closeModal}
                    todayDate={todayDate}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedToDate={selectedToDate}
                    setSelectedToDate={setSelectedToDate}
                    selectedWeekdays={selectedWeekdays}
                    weekdaysMap={weekdaysMap}
                    handleWeekdaySelection={handleWeekdaySelection}
                    workinghours={workinghours}
                    handleWorkingHoursChange={handleWorkingHoursChange}
                    startTime={startTime}
                    handleStartTimeChange={handleStartTimeChange}
                    endTime={endTime}
                    handleEndTimeChange={handleEndTimeChange}
                    formatTime={formatTime}
                    selectedTimes={selectedTimes}
                    handleButtonClick={handleButtonClick}
                    slotDurations={slotDurations}
                    slotDuration={slotDuration}
                    setSlotDuration={setSlotDuration}
                    timeSlots={timeSlots}
                    handleSlotDurationChange={handleSlotDurationChange}
                    handleTimeSlotSelection={handleTimeSlotSelection}
                    selectedTimeSlots={selectedTimeSlots}
                    AddWorkSchedule={AddWorkSchedule}
                    loading={loading}
                    customStylesSlotDuration={customStylesSlotDuration}
                    handleToDateChange={handleToDateChange}
                  />
                </>
              </div>
            </div>
          )}
          {/* </Modal> */}
        </div>

        <section className="">
          <div className="">
            <hr></hr>

            <span
              className="font-medium"
              style={{ color: "rgb(111 111 111)", cursor: "default" }}
            >
              {" "}
              View Schedule by Selecting Date Range :
            </span>
            <div id="showCustom" className="my-5 flex gap-4 items-center">
              <input
                className="border p-1 rounded-md border-gray-400"
                id="startDate"
                onchange="showDateCustom()"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <span>To</span>
              <input
                className="border p-1 rounded-md border-gray-400"
                id="endDate"
                onchange="showDateCustom()"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <hr></hr>

            {isLoading ? (
              <div className="col-md-12 m-4" style={{ textAlign: "center" }}>
                <center className="m-4">
                  <div
                    className="spinner-border"
                    style={{ opacity: 0.3 }}
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                  <br />
                  <span style={{ opacity: 0.6 }}>Please wait...</span>
                </center>
              </div>
            ) : range.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <div className="m-4">
                  <center>
                    No Schedule For Selected Time Range
                    <br />
                  </center>
                </div>
              </div>
            ) : (
              range.map((item, index1) => (
                <div
                  className="border border-gray-300 my-2 rounded-md p-2"
                  key={index1}
                  style={{ cursor: "default" }}
                >
                  <div className="row m-1">
                    <div className="font-medium">DATE : {item.date}</div>
                  </div>

                  <div className=" m-1">
                    <div className="font-medium">Time Slot Schedule :</div>
                    <div className="flex flex-wrap my-2">
                      {item.slots.map((slot, index2) => (
                        <div key={index2} className="flex gap-2">
                          <div
                            style={{ cursor: "default" }}
                            className={`mx-2 p-1 rounded-md ${
                              slot.freeze === true
                                ? "btn-freeze"
                                : "bg-green-500 text-white "
                            } `}
                            type="button"
                          >
                            {slot.slot}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr />
                  <div
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  ></div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Schedule;
