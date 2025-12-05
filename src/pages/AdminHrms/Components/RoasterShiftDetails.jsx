import { useEffect, useState } from "react";
import {
  deleteRosterRecord,
  editRosterRecord,
  editRosterShiftDetails,
  getRosterRecordDetails,
  getRosterShift,
  postRosterRecord,
} from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdClose, MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function RoasterShiftDetails({
  employee,
  date,
  schedule,
  onClose,
  recordId,
  fetchRosterRecords,
}) {
  const [shiftType, setShiftType] = useState("Full Day Weekly Off");
  const [branchLocation, setBranchLocation] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [formData, setFormData] = useState({
    endOn: "Never",
    selectedShift: "",
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      weekday: "short",
    });
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    const fetchRosterRecordDetails = async () => {
      try {
        const res = await getRosterRecordDetails(date.id);
        setEmployeeData(res);
        setFormData({ ...formData, selectedShift: res.shift });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRosterShifts = async () => {
      try {
        const res = await getRosterShift(hrmsOrgId);
        setShifts(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (date?.id) {
      
      fetchRosterRecordDetails();
    }
    fetchRosterShifts();
  }, []);
  const themeColor = useSelector((state) => state.theme.color);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditRosterShift = async () => {
    const editData = new FormData();
    editData.append(
      "date",
      date?.date ? date?.date : new Date(schedule).toISOString().slice(0, 10)
    );
    editData.append("shift", formData.selectedShift);
    editData.append("employee", employee.id);
    try {
      if (date?.date) {
        const res = await editRosterRecord(date.id, editData);
      } else {
        const res = await postRosterRecord(editData);
      }
      fetchRosterRecords();
      toast.success("Roster record updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteRosterRecord = async () => {
    try {
      await deleteRosterRecord(date.id);
      fetchRosterRecords();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-1/3">
        {/* <div className="bg-white p-2 w-80"> */}
        <h2 className="font-semibold text-lg border-b mb-1">
          Selected Employee Details
        </h2>
        <div className="max-h-[28rem] overflow-y-auto p-1">
          <div className="flex items-center mb-4">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-12 h-12 rounded-full mr-3"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-3">
                {employee.first_name[0]}
                {employee.last_name[0]}
              </div>
            )}
            <h2 className="text-xl font-semibold">
              {employee.first_name} {employee.last_name}
            </h2>
          </div>

          <div className="mb-4 flex justify-between items-center w-full border-2 p-1 rounded-md border-blue-500">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Current Shift</h3>
              <p className="font-medium text-xs">
                {date?.date ? formatDate(date?.date) : formatDate(schedule)}
              </p>
            </div>
            <p className="text-blue-500 font-semibold">
              {date?.shift_start_time} - {date?.shift_end_time}
            </p>
            {/* <p>{employee.date}</p> */}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Type</label>
            <select
              className="w-full p-2 border rounded-md"
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="full_working_day">Full Working Day</option>
              <option value="full_day_weekly_off">Full Day Weekly Off</option>
              <option value="half_day_weekly_off">Half Day Weekly Off</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Shift</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.selectedShift}
              onChange={handleChange}
              name="selectedShift"
            >
              <option value="">Select Shift</option>
              {shifts.map((shift) => (
                <option value={shift.id} key={shift.id}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="mb-4">
            <label className="block mb-2">Branch Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={branchLocation}
              onChange={(e) => setBranchLocation(e.target.value)}
              placeholder="Branch Location"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={repeat}
                onChange={(e) => setRepeat(e.target.checked)}
              />
              Repeat?
            </label>
          </div> */}
          {repeat && (
            <div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Select Frequency
                </label>
                <select name="" id="" className="w-full p-2 border rounded-md">
                  <option value="">Select</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly on same date">
                    Monthly on same date
                  </option>
                  <option value="4th Monday of the month">
                    4th Monday of the month
                  </option>
                </select>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="" className="font-medium">
                  Ends on
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="end"
                      id="never"
                      checked={formData.endOn === "Never"}
                      onChange={() =>
                        setFormData({ ...formData, endOn: "Never" })
                      }
                    />
                    <label htmlFor="never">Never</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="end"
                      id="on"
                      checked={formData.endOn === "On"}
                      onChange={() => setFormData({ ...formData, endOn: "On" })}
                    />
                    <label htmlFor="on">On</label>
                  </div>
                </div>
              </div>
              {formData.endOn === "On" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="">End date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-around items-center px-4 p-1 border-t">
          <button
            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-full flex items-center gap-2"
            onClick={() => handleDeleteRosterRecord()}
          >
            <MdDeleteForever size={20} /> Delete
          </button>
          <button
            className="px-4 py-2 border-2 border-gray-500 text-gray-500  rounded-full flex items-center gap-2"
            onClick={onClose}
          >
            <MdClose size={20} /> Cancel
          </button>
          <button
            // style={{ background: themeColor }}
            className="px-4 py-2 border border-green-500 text-green-500  rounded-full flex items-center gap-2"
            onClick={handleEditRosterShift}
          >
            <FaCheck /> Save
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default RoasterShiftDetails;
