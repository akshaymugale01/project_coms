import React, { useEffect, useState } from "react";
import {
  editCalendarMilestoneDetails,
  getCalendarMilestone,
  getCalendarMilestoneDetails,
  getMilestoneType,
  getMyHRMSEmployees,
  postCalendarMilestone,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import MultiSelect from "../Components/MultiSelect";
import toast from "react-hot-toast";
const EditCalendarEvent = ({ onClose, eventId, fetchAllCalendarEvents }) => {
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [mileStones, setMileStones] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const fetchMileStoneTypes = async () => {
      try {
        const res = await getMilestoneType(hrmsOrgId);
        setMileStones(res);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllEmployees = async () => {
      try {
        const res = await getMyHRMSEmployees(hrmsOrgId);

        const employeesList = res.map((emp) => ({
          value: emp.id,
          label: `${emp.first_name} ${emp.last_name}`,
        }));

        setEmployees(employeesList);
        setFilteredEmployees(employeesList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMileStoneTypes();
    fetchAllEmployees();
  }, []);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const [formData, setFormData] = useState({
    mileStoneType: "",
    includeInEmail: false,
    sendAutoMailer: false,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await getCalendarMilestoneDetails(eventId);
        setFormData({
          ...formData,
          includeInEmail: res.include_in_email_notification,
          sendAutoMailer: res.send_auto_mailer,
          mileStoneType: res.milestone_type,
        });
        setSelectedOptions(res.who_views);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, []);

  const handleEditCalendarEvent = async () => {
    const postData = new FormData();
    postData.append("milestone_type", formData.mileStoneType);
    // postData.append("employees", formData.mileStoneType)
    const employeeList = selectedOptions.map((item) => item);
    employeeList.forEach((employee) => {
      postData.append("who_views", employee);
    });
    postData.append("include_in_email_notification", formData.includeInEmail);
    postData.append("send_auto_mailer", formData.sendAutoMailer);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await editCalendarMilestoneDetails(eventId, postData);
      toast.success("Milestone updated successfully");
      fetchAllCalendarEvents();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-xl w-[50rem]">
        <h1 className="text-xl font-medium mb-4 border-b">
          Add Calendar Milestone and Events
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700 font-medium text-sm">
              Please select the milestone{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="mileStoneType"
              id=""
              className="border rounded-md p-2"
              value={formData.mileStoneType}
              onChange={handleChange}
            >
              <option value="">Select Milestone</option>
              {mileStones.map((mileStone) => (
                <option value={mileStone.id} key={mileStone.id}>
                  {mileStone.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="block text-gray-700 text-sm font-medium">
              Who can view this calendar event?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="">Select </option>
            </select>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="block text-gray-700  font-medium text-sm">
              Select Employee(s) from the list below who can view this event on
              their Dashboard
            </label>

            <MultiSelect
              options={employees}
              handleSelect={handleSelect}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              setOptions={setEmployees}
              searchOptions={filteredEmployees}
              compTitle="Click here to select employees"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium text-sm">
              Would you like to include this event in daily calendar milestone
              email notification?
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="includeInEmail"
                  id="emailYes"
                  checked={formData.includeInEmail === true}
                  onChange={() =>
                    setFormData({ ...formData, includeInEmail: true })
                  }
                />
                <label htmlFor="emailYes">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="includeInEmail"
                  id="emailNo"
                  checked={formData.includeInEmail === false}
                  onChange={() =>
                    setFormData({ ...formData, includeInEmail: false })
                  }
                />
                <label htmlFor="emailNo">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium text-sm">
              Would you like to send a auto-mailer to employees on this day?
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="sendAutoMailer"
                  id="mailYes"
                  checked={formData.sendAutoMailer === true}
                  onChange={() =>
                    setFormData({ ...formData, sendAutoMailer: true })
                  }
                />
                <label htmlFor="MailYes">Yes</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="sendAutoMailer"
                  id="mailNo"
                  checked={formData.sendAutoMailer === false}
                  onChange={() =>
                    setFormData({ ...formData, sendAutoMailer: false })
                  }
                />
                <label htmlFor="mailNo">No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 border-t p-1">
          <button
            className="border-red-400 border-2 rounded-md  text-red-400 p-2 px-4"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-green-400 text-white p-2 px-4 rounded-md"
            onClick={handleEditCalendarEvent}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCalendarEvent;
