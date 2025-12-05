
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../../containers/Inputs/FileInputBox";


const EditLoiWO = () => {
  const [scheduleFor, setScheduleFor] = useState("PO");
  const themeColor = useSelector((state) => state.theme.color);
  const [showEntityList, setShowEntityList] = useState(false);
  const [activities, setActivities] = useState([{ id: 1, activity: '', subActivity: '', hazardCategory: '', risks: '' }]);
  const [nextId, setNextId] = useState(2);
  const [orderType, setOrderType] = useState('PO');

  const handleRadioChange1 = (event) => {
    setOrderType(event.target.value);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newActivities = [...activities];
    newActivities[index][name] = value;
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    setActivities([...activities, { id: nextId, activity: '', subActivity: '', hazardCategory: '', risks: '' }]);
    setNextId(nextId + 1);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleRadioChange = (event) => {
    setShowEntityList(event.target.value === 'client');
  };
  
  return (
    <section>
      <div className="m-2">

        <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 rounded-full text-white"
        >
          Edit WO
        </h2>
        <div className="flex items-center ml-28 mt-3">
      <div className="flex items-center space-x-2">
        {/* <input
          type="radio"
          id="po"
          name="order"
          value="PO"
          onChange={handleRadioChange1}
          checked={orderType === 'PO'} // Check if orderType is 'PO'
          className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="po" className="text-gray-700">
          PO
        </label> */}
      </div>
      &nbsp;&nbsp;&nbsp;
      <div className="flex items-center space-x-2">
        {/* <input
          type="radio"
          id="wo"
          name="order"
          value="WO"
          onChange={handleRadioChange1}
          checked={orderType === 'WO'} // Check if orderType is 'WO'
          className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="wo" className="text-gray-700">
          WO
        </label> */}
      </div>
    </div>
    <div className="flex sm:flex-row flex-col justify-around items-center">
            <div className="grid grid-cols-4 items-center">
              <p className="font-semibold">For :</p>
              <div className="flex gap-5">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
    <p
        className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
            scheduleFor === "PO" && "bg-black text-white"
        }`}
        onClick={() => setScheduleFor("PO")}
    >
        PO
    </p>
    <p
        className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
            scheduleFor === "WO" && "bg-black text-white"
        }`}
        onClick={() => setScheduleFor("WO")}
    >
        WO
    </p>
    </div></div></div></div>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
          
          
          
          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            {/* Requestor details input fields */}
            <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Select LOI Date </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="date" placeholder="Abdul Ghaffar" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="contact-number">Select Billing Address</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contact-number" type="text" placeholder="Select Billing Address" />
    </div>
    {scheduleFor === 'PO' && (
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="site">Select Delivery Address</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="site" type="Select Delivery Address" placeholder="Business Bay" />
    </div>)}
  
  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> */}
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="department"> 
Related To</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="department" type="text" placeholder=" 
Related To" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">Retention(%)</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="Retention(%)" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">TDS(%)</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="TDS(%)" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">QC(%)</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="QC(%)" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">Payment Tenure(In Days)</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="Payment Tenure(%)" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">Advance Amount</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="Advance Amount" />
    </div>
    
    {/* <div className="col-span-1 flex items-end">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
        Submit
      </button>
    </div> */}
  </div>
  <div className="w-full ">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">Terms & Conditions</label>
      <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" type="text" placeholder="" />
    </div>
</div>
<h3 className="border-b text-center text-xl border-black mb-6 font-bold">ATTACHMENTS</h3>
          {/* <input type="file" /> */}
          <FileInputBox/>

          </div>

          {/* <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            BASIC DETAILS
          </h2> */}

          {/* <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300"> */}
            {/* Basic details input fields */}
            <div>
  {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> */}
    {/* <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="permit-for">Permit For*</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="permit-for" type="text" placeholder="Enter Permit For" />
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="building">Building*</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="building">
        <option>Select Building</option>
      </select>
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="wing">Wing</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="wing">
        <option>Select Building First</option>
      </select>
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="area">Area</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="area">
        <option>Select Floor First</option>
      </select>
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="floor">Floor</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="floor">
        <option>Select Wing First</option>
      </select>
    </div>
    <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="room">Room</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="room">
        <option>Select Wing First</option>
      </select>
    </div> */}
  {/* </div> */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    {/* <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="type">Client Specific</label>
      <div className="flex items-center">
        <input className="mr-2 leading-tight" type="radio" id="internal" name="type" value="internal" onChange={handleRadioChange} />
        <label className="text-gray-700 font-bold mr-4" htmlFor="internal">Internal</label>
        <input className="mr-2 leading-tight" type="radio" id="client" name="type" value="client" onChange={handleRadioChange}/>
        <label className="text-gray-700 font-bold" htmlFor="client">Client</label>
      </div>
    </div> */}
    {/* {showEntityList && (
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="entity-list">List of Entity</label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="entity-list" style={{ width: '100%' }}> 
            <option>Select Entity</option>
          </select>
        </div>
      )} */}
    {/* <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="copy-to">Copy To</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="copy-to" type="text" placeholder="Copy To" />
    </div> */}
    </div>
    {/* </div> */}

          </div>
 
          {/* <h2 className="border-b text-center text-xl border-black mb-6 font-bold">
            PERMIT DETAILS
          </h2> */}
         
  {/* <h3 className="font-semibold">Select Permit Type</h3> */}
          {/* Permit details input fields */}
          {/* <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300"> */}
  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"> */}
    {/* <div className="col-span-1">
      <input type="radio" id="cold-work" name="permit-type" value="Cold Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="cold-work">Cold Work</label>
    </div>
    <div className="col-span-1">
      <input type="radio" id="confined-space-work" name="permit-type" value="Confined Space Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="confined-space-work">Confined Space Work</label>
    </div> */}
    {/* <div className="col-span-1">
      <input type="radio" id="electrical-work" name="permit-type" value="Electrical Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="electrical-work">Electrical Work</label>
    </div>
    <div className="col-span-1">
      <input type="radio" id="excavation-work" name="permit-type" value="Excavation Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="excavation-work">Excavation Work</label>
    </div> */}
  {/* </div> */}
  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"> */}
    {/* <div className="col-span-1">
      <input type="radio" id="height-work" name="permit-type" value="Height Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="height-work">Height Work</label>
    </div> */}
    {/* <div className="col-span-1">
      <input type="radio" id="hot-work" name="permit-type" value="Hot Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="hot-work">Hot Work</label>
    </div>
    <div className="col-span-1">
      <input type="radio" id="radiology-work" name="permit-type" value="Radiology Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="radiology-work">Radiology Work</label>
    </div> */}
    {/* <div className="col-span-1">
      <input type="radio" id="loading-unloading-work" name="permit-type" value="Loading, Unloading Hazardous Material Work" />
      <label className="text-gray-700 font-bold ml-2" htmlFor="loading-unloading-work">Loading, Unloading Hazardous Material Work</label>
    </div> */}
  {/* </div> */}
{/* </div> */}

{/* <h3 className="font-semibold">Enter Permit Description</h3> */}

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
            {/* Permit details input fields */}
            <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
  {activities.map((activity, index) => (
    <div key={activity.id} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`activity-${index}`}>Item Details*</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`activity-${index}`}
            type="text"
            placeholder="Select Activity"
            name="activity"
            value={activity.activity}
            onChange={(e) => handleInputChange(index, e)}
            >
  <option value="" disabled>Select Activity</option>
  <option value="activity1">Activity 1</option>
  <option value="activity2">Activity 2</option>
  <option value="activity3">Activity 3</option>
  <option value="activity4">Activity 4</option>
          
          </select>       
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>SAC/HSN Code*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="Select SAC/HSN Code"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Quantity*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="Quantity"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Select Unit*</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="Quantity"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
            >
            <option value="" disabled>Select Activity</option>
            <option value="activity1">Activity 1</option>
            <option value="activity2">Activity 2</option>
            <option value="activity3">Activity 3</option>
            <option value="activity4">Activity 4</option>
            </select>       
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Rate*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="Rate"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>CGST Rate*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="CGST Rate"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>CGST Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="CGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>SGST Rate*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Rate"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>SGST Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>IGST Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>IGST Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>TCS Rate*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>TCS Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Tax Amt*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Amount*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`sub-activity-${index}`}>Total Amount*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`sub-activity-${index}`}
            type="text"
            placeholder="SGST Amt"
            name="subActivity"
            value={activity.subActivity}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> */}
        {/* <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`hazard-category-${index}`}>Category of Hazards*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`hazard-category-${index}`}
            type="text"
            placeholder="Select Category of Hazards"
            name="hazardCategory"
            value={activity.hazardCategory}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div> */}
        {/* <div className="col-span-1">
          <label className="block text-gray-700 font-bold mb-2" htmlFor={`risks-${index}`}>Risks*</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`risks-${index}`}
            type="text"
            placeholder="Enter Risks"
            name="risks"
            value={activity.risks}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div> */}
      {/* </div> */}
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => handleDeleteActivity(activity.id)}
      >
        Delete
      </button>
    </div>
  ))}
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
      onClick={handleAddActivity}
    >
      Add Inventory
    </button>
  </div>
</div>

            {/* <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300"> */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {/* <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="vendor">Vendor</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="vendor"
        type="text"
        placeholder="Enter Vendor"
      />
    </div> */}
    {/* <div className="col-span-1">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDateTime">Expiry Date&Time*</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="expiryDateTime"
        type="text"
        placeholder="dd-mm-yyyy --:--"
      />
    </div> */}
  </div>
  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="col-span-2">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">Comment (Optional)</label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="comment"
        placeholder="Enter Comment"
      />
    </div>
  </div> */}
</div>

          {/* </div> */}

        

          {/* Submit button */}
          <div className="sm:flex justify-center grid gap-2 my-5 ">
            <button
              className="bg-black text-white p-2 px-4 rounded-md font-medium"
            //   onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditLoiWO;