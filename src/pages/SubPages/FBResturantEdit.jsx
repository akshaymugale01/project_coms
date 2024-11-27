import React, { useState } from "react";
import { useSelector } from "react-redux";
import FileInputBox from "../../containers/Inputs/FileInputBox";
const FBRestaurtantEdit = () => {
    const [rows, setRows] = useState([]);
    const addRow = () => {
        setRows([...rows, { order: false, booking: false, date: '' }]);
      };

      const deleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
      };
    const themeColor = useSelector((state) => state.theme.color);
  return (
    <div>
          {/* <h2
          style={{ background: themeColor }}
          className="text-center text-xl font-bold p-2 rounded-full text-white mt-2"
        >
          New F&B
        </h2> */}
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">


        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">BASIC DETAILS</h3>

          <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="restaurant-name">Restaurant Name*</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="restaurant-name" type="text" placeholder="Restaurant Name" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="cost-for-two">Cost For Two*</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cost-for-two" type="text" placeholder="Cost For Two" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="mobile-number">Mobile Number*</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobile-number" type="tel" placeholder="Enter Number" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="another-mobile-number">Another Mobile Number*</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="another-mobile-number" type="tel" placeholder="Enter Number" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="landline-number">Landline Number*</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="landline-number" type="tel" placeholder="Enter Number" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="delivery-time">Delivery Time</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="delivery-time" type="text" placeholder="Mins" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="cuisines">Cuisines</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cuisines">
      {/* Options for cuisines */}
    </select>
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="serves-alcohol">Serves Alcohol*</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="serves-alcohol">
      {/* Options for serving alcohol */}
      <option value="">Select</option>
      <option value="">Yes</option>
      <option value="">No</option>
    </select>
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="wheelchair-accessible">Wheelchair Accessible*</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="wheelchair-accessible">
      {/* Options for wheelchair accessibility */}
      <option value="">Select</option>
      <option value="">Yes</option>
      <option value="">No</option>
    </select>
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="cash-on-delivery">Cash on Delivery*</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cash-on-delivery">
      {/* Options for cash on delivery */}
      <option value="">Select</option>
      <option value="">Yes</option>
      <option value="">No</option>
    </select>
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="pure-veg">Pure Veg*</label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pure-veg">
      {/* Options for pure vegetarian */}
      <option value="">Select</option>
      <option value="">Yes</option>
      <option value="">No</option>
    </select>
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Address" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="terms-conditions">Terms & Conditions</label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="terms-conditions" type="text" placeholder="Terms & Conditions" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="disclaimer">Disclaimer</label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="disclaimer" type="text" placeholder="Disclaimer" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="closing-message">Closing Message</label>
    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="closing-message" type="text" placeholder="Closing Message" />
  </div>
</div>
</div> 
<div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">

<h3 className="border-b text-center text-xl border-black mb-6 font-bold">RESTAURTANT DETAILS</h3>

<div class="overflow-x-auto">
  <table class="table-auto">
    <thead>
      <tr>
      <th class="px-4 py-2"></th>
        <th class="px-4 py-2">Operational Days</th>
        <th class="px-4 py-2">Start Time</th>
        <th class="px-4 py-2">End Time</th>
        <th class="px-4 py-2">Break Start Time</th>
        <th class="px-4 py-2">Break End Time</th>
        <th class="px-4 py-2">Booking Allowed</th>
        <th class="px-4 py-2">Order Allowed</th>
        <th class="px-4 py-2">Last Booking & Order Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Monday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Tuesday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Wednesday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Thursday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Friday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Saturday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
      <tr>
      <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
      <td class="border px-4 py-2">Sunday</td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
        <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>

      </tr>
    </tbody>
  </table>
</div>


</div>
<div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">

<h3 className="border-b text-center text-xl border-black mb-6 font-bold">BLOCKED DAYS</h3>

<div>
<button
  onClick={addRow}
  className="px-4 py-2 border border-blue-500 rounded bg-blue-500 text-white hover:bg-blue-600"
>
  Add
</button>

      {rows.map((row, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={row.order}
            onChange={(e) => {
              const newRows = [...rows];
              newRows[index].order = e.target.checked;
              setRows(newRows);
            }}
          />&nbsp;&nbsp;
          <label>Order</label>
          &nbsp;&nbsp;
          <input
            type="checkbox"
            checked={row.booking}
            onChange={(e) => {
              const newRows = [...rows];
              newRows[index].booking = e.target.checked;
              setRows(newRows);
            }}
          />
          &nbsp;&nbsp;
          <label>Booking</label>
          &nbsp;&nbsp;
          <input
            type="date"
            value={row.date}
            onChange={(e) => {
              const newRows = [...rows];
              newRows[index].date = e.target.value;
              setRows(newRows);
            }}
          />&nbsp;
          <button onClick={() => deleteRow(index)} className="px-4 py-2 border border-red-500 rounded bg-red-500 text-white hover:bg-blue-600">Delete</button>
        </div>
      ))}
    </div>

</div>
<div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
<h3 className="border-b text-center text-xl border-black mb-6 font-bold">TABLE BOOKING</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
<div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Minimum Person</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="terms-conditions">Maximum Person</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="terms-conditions" type="text" placeholder="  " />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="disclaimer">Can Cancel Before</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="disclaimer" type="text" placeholder="In Mins" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="closing-message">Booking Not Allowed Text</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="closing-message" type="text" placeholder=" " />
  </div></div>
</div>

<div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
<h3 className="border-b text-center text-xl border-black mb-6 font-bold">ORDER CONFIGURE</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
<div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="address">GST(%)</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="terms-conditions">Delivery Charge</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="terms-conditions" type="text" placeholder="  " />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="disclaimer">Minimum Order</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="disclaimer" type="text" placeholder="" />
  </div>
  <div className="col-span-1">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="closing-message">Order Not Allowed Text
</label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="closing-message" type="text" placeholder=" " />
  </div></div>
</div>

<div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
<h3 className="border-b text-center text-xl border-black mb-6 font-bold">ATTACHMENTS</h3>
<label htmlFor="">Cover Image</label>
<FileInputBox/>
<label htmlFor="">Menu</label>
<FileInputBox/>
<label htmlFor="">Gallery</label>
<FileInputBox/>
</div>


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
  )
}

export default FBRestaurtantEdit