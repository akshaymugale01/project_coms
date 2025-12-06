import React, { useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";

const EmployeeEditStaff = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [unit, setUnit] = useState("");
  const [department, setDepartment] = useState("");
  const [workType, setWorkType] = useState("");
  const [staffId, setStaffId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTill, setValidTill] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example, sending data to a backend server
    const formData = {
      firstName,
      lastName,
      email,
      password,
      mobile,
      unit,
      department,
      workType,
      staffId,
      vendorName,
      validFrom,
      validTill,
      status,
    };
    console.log(formData); // You can replace this with your form submission logic
  };

  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-lg p-4 w-full mx-4"
      >
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full mb-4 text-white" style={{ background: themeColor }}>
          Edit Staff
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="firstName" className="font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="lastName" className="font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="mobile" className="font-semibold">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile Number"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="unit" className="font-semibold">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Unit</option>
              {/* Add options for units */}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="department" className="font-semibold">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {/* Add options for departments */}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="workType" className="font-semibold">
              Work Type
            </label>
            <select
              id="workType"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Work Type</option>
              {/* Add options for work types */}
            </select>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="staffId" className="font-semibold">
              Staff ID
            </label>
            <input
              type="text"
              id="staffId"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter Staff ID"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="vendorName" className="font-semibold">
              Vendor Name
            </label>
            <input
              type="text"
              id="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              placeholder="Enter Vendor Name"
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="validFrom" className="font-semibold">
              Valid From
            </label>
            <input
              type="date"
              id="validFrom"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="validTill" className="font-semibold">
              Valid Till
            </label>
            <input
              type="date"
              id="validTill"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              className="border p-2 rounded-md border-black"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              {/* Add options for status */}
            </select>
          </div> </div>
          <div className="grid gap-2 items-center w-full mt-2">
            <label htmlFor="" className="font-semibold">
              Profile Photo Upload
            </label>
          <FileInputBox/>
          </div>
          <div className="grid gap-2 items-center w-full mt-2">
            <label htmlFor="" className="font-semibold">
              Manuals Upload
            </label>
            <FileInputBox/>
          </div>

          {/* <div className="flex flex-col">
            <h3>Select Days</h3>
            <div>
              <input type="checkbox" id="monday" name="days" value="Monday" />
              <label for="monday">Monday</label>
            </div>
            <div>
              <input type="checkbox" id="tuesday" name="days" value="Tuesday" />
              <label for="tuesday">Tuesday</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="wednesday"
                name="days"
                value="Wednesday"
              />
              <label for="wednesday">Wednesday</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="thursday"
                name="days"
                value="Thursday"
              />
              <label for="thursday">Thursday</label>
            </div>
            <div>
              <input type="checkbox" id="friday" name="days" value="Friday" />
              <label for="friday">Friday</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="saturday"
                name="days"
                value="Saturday"
              />
              <label for="saturday">Saturday</label>
            </div>
            <div>
              <input type="checkbox" id="sunday" name="days" value="Sunday" />
              <label for="sunday">Sunday</label>
            </div>
          </div> */}

          {/* <span>
            <label htmlFor="">Start Time</label>
            <input
              type="time"
              id="startTime1"
              name="startTime1"
              className="border p-2 rounded-md border-black"
            />
            &nbsp;
            <label htmlFor="">End Time</label>
            <input
              type="time"
              id="endTime1"
              name="endTime1"
              className="border p-2 rounded-md border-black"
            />
          </span> */}
          {/* <span>
            <label htmlFor="">Start Time</label>
            <input
              type="time"
              id="startTime1"
              name="startTime1"
              className="border p-2 rounded-md border-black"
            />
            &nbsp;
            <label htmlFor="">End Time</label>
            <input
              type="time"
              id="endTime1"
              name="endTime1"
              className="border p-2 rounded-md border-black"
            />
          </span> */}
            <div  className="mt-4">
  <table class="w-full ">
    <thead>
      <tr>
      <th class="px-4 py-2"></th>
        <th class="px-4 py-2">Select Days</th>
        <th class="px-4 py-2">Start Time</th>
        <th class="px-4 py-2">End Time</th>

      </tr>
    </thead>
    <tbody>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center">Monday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center">Tuesday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center">Wednesday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center">Thursday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center">Friday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2 text-center">Saturday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>


      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2 text-center">Sunday</td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>


      </tr>
    </tbody>
  </table>
</div>

        <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEditStaff;