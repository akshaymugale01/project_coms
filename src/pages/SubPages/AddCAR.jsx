import React, { useState } from "react";
import Table from "../../components/table/Table";
import { FaPlus, FaTrash } from "react-icons/fa";
import FileInputBox from "../../containers/Inputs/FileInputBox";

const AddCAR = () => {
  const [checkbutton, setCheckbutton] = useState();
  const [associated, setAssociated] = useState();
  const [visitors, setVisitors] = useState([{ name: "", mobile: "" }]);
  const [visitors1, setVisitors1] = useState([{ name1: "", file: "" }]);

  const handleAddVisitor = (event) => {
    event.preventDefault();
    setVisitors([...visitors, { name: "", mobile: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newVisitors = [...visitors];
    newVisitors[index][name] = value;
    setVisitors(newVisitors);
  };

  const handleRemoveVisitor = (index) => {
    const newVisitors = [...visitors];
    newVisitors.splice(index, 1);
    setVisitors(newVisitors);
  };

  const handleAddVisitor1 = (event) => {
    event.preventDefault();
    setVisitors1([...visitors1, { name1: "", file: "" }]);
  };
  const handleInputChange1 = (index, event) => {
    const { name1, value } = event.target;
    const newVisitors1 = [...visitors1];
    newVisitors1[index][name1] = value;
    setVisitors1(newVisitors1);
  };
  const handleRemoveVisitor1 = (index) => {
    const newVisitors1 = [...visitors1];
    newVisitors1.splice(index, 1);
    setVisitors1(newVisitors1);
  };

  const column = [
    { name: "Request Id", selector: (row) => row.RequestID, sortable: true },
    { name: "Amount", selector: (row) => row.Amount, sortable: true },
    { name: "Comments", selector: (row) => row.Comments, sortable: true },
    { name: "Created On", selector: (row) => row.CreatedOn, sortable: true },
    { name: "Created By", selector: (row) => row.CreatedBy, sortable: true },
    { name: "L1", selector: (row) => row.L1, sortable: true },
    { name: "L2", selector: (row) => row.L2, sortable: true },
    { name: "L3", selector: (row) => row.L3, sortable: true },
    { name: "L4", selector: (row) => row.L4, sortable: true },
    { name: "L5", selector: (row) => row.L5, sortable: true },
    {
      name: "Master Status",
      selector: (row) => row.MasterStatus,
      sortable: true,
    },
    {
      name: "Cancelled By",
      selector: (row) => row.CancelledBy,
      sortable: true,
    },
    { name: "Attachments", selector: (row) => row.Attachments, sortable: true },
  ];

  const data = [
    {
      id: 1,
      RequestID: "330",
      Amount: "4500",
      Comments: "Maintenance cost",
      CreatedOn: "04/05/2022",
      CreatedBy: "Lockated Demo",
      L1: "NA",
      L2: "NA",
      L3: "NA",
      L4: "NA",
      L5: "NA",
      MasterStatus: "Pending",
      CancelledBy: "NA",
      Attachments: "",
    },
  ];
  return (
    <section>
      <div className="w-full flex flex-col overflow-hidden">
        <h2 className="text-center text-lg font-bold p-2 mx-10 my-3 bg-black rounded-full text-white">
          Add Cost Approval Request
        </h2>
        <div className="border-2 flex flex-col my-5 mx-32 p-4 gap-4 rounded-md border-gray-400">
          {/* <h2 className="text-lg border-black font-semibold text-center">
                    Edit
                </h2> */}
          <div className="flex  flex-col justify-around ">
            <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Title
                </label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="1"
                  placeholder="em2"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Status
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="">Pending</option>
                  <option value="">Complete</option>
                  <option value="">Rejected</option>
                  <option value="">close</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Category Type
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Category Type</option>
                  <option value="">Elevator</option>
                  <option value="">IT Support</option>
                  <option value="">Technical</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Sub Category Type
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Sub Category Type</option>
                  <option value="">Ac Not working</option>
                  <option value="">Light</option>
                  <option value="">Fan</option>
                  <option value="">other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Admin Priority
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Admin Priority</option>
                  <option value="">P1</option>
                  <option value="">P2</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  External Priority
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select External Priority</option>
                  <option value="">High</option>
                  <option value="">Medium</option>
                  <option value="">Low</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Mode
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Complaint Mode</option>
                  <option value="">Phone</option>
                  <option value="">Workin</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Root Cause
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Impact
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Correction
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Reference Number
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Corrective Action
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">Issue Related To</p>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="yes"
                    className="checked:accent-black"
                  />
                  <label htmlFor="yes">Project</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="no"
                    className="checked:accent-black"
                  />
                  <label htmlFor="no">FM</label>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Service Type
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Service Type</option>
                  <option value="">Product</option>
                  <option value="">Service</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Preventive Action
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Responsible Person Name
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Responsible Person Name</option>
                  <option value="">Locked Demo</option>
                  <option value="">Abdul g</option>
                  <option value="">Kiran Sharma</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Review (Tracking)
                </label>
                <input
                  type="date"
                  placeholder=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Proactive/Reactive
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Proactive/Reactive</option>
                  <option value="">Reactive</option>
                  <option value="">Proactive</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Assigned To
                </label>
                <select
                  name=""
                  id=""
                  className="border p-1 px-4 border-gray-500 rounded-md"
                >
                  <option value="">Select Assigned To</option>
                  <option value="">Locked Demo</option>
                  <option value="">Abdul g</option>
                  <option value="">Kiran Sharma</option>
                </select>
              </div>
              <>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">Asset Type:</p>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      checked={associated === "asset"}
                      name="assetType"
                      onChange={() => setAssociated("asset")}
                      id="asset"
                      className="checked:accent-black"
                    />
                    <label htmlFor="asset">Asset</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      name="assetType"
                      type="radio"
                      checked={associated === "service"}
                      onChange={() => setAssociated("service")}
                      id="service"
                      className="checked:accent-black"
                    />
                    <label htmlFor="service">Service</label>
                  </div>
                </div>
              </>
              {associated === "asset" && (
                <div className="flex flex-col">
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    name="applicable_meter_category"
                  >
                    <option value="">Select Asset </option>
                    <option value="meter 1">Asset 1</option>
                    <option value="meter 2">Asset 2</option>
                    <option value="meter 2">Asset 3</option>
                  </select>
                </div>
              )}
              {associated === "service" && (
                <div className="flex flex-col">
                  <select
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    name="parent_meter"
                  >
                    <option value="">Select Service </option>
                    <option value="unit1">service 1</option>
                    <option value="unit2">service 2</option>
                    <option value="unit2">service 3</option>
                  </select>
                </div>
              )}
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Comment
                </label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="3"
                  placeholder="Comment"
                  className="border p-1 px-4 border-gray-500 rounded-md"
                />
              </div>
            </div>
            <div className="flex  gap-2">
              <label htmlFor="meterApplicable">Cost Involved</label>
              <input
                type="checkbox"
                name="is_meter"
                id="meterApplicable"
                onClick={() => setCheckbutton(!checkbutton)}
              />
            </div>
          </div>

          {checkbutton && (
            <div className="">
              {visitors.map((visitor, index) => (
                <div key={index}>
                  <div className="font-semibold  my-3 py-3 px-3 p-1 flex gap-2 flex-col  rounded-md">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        placeholder="Enter Cost"
                        className="border p-1 px-4 border-gray-500 rounded-md"
                        value={visitor.mobile}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                    &nbsp;&nbsp;
                    <textarea
                      name=""
                      id=""
                      cols="20"
                      rows="3"
                      placeholder="Discription"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                      value={visitor.mobile}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <div className="flex flex-col ">
                      <h2 className="text-sm font-medium ">Attachments</h2>
                      <div className="font-semibold  p-1 flex flex-col gap-2 items-start rounded-md">
                        {checkbutton && (
                          <div className="flex flex-col w-full">
                            {visitors1.map((visitor, index) => (
                              <div key={index}>
                                <div className="flex flex-col ">
                                  <FileInputBox className="" />
                                  &nbsp;&nbsp;
                                  <button
                                    onClick={() => handleRemoveVisitor1(index)}
                                  >
                                    <FaTrash />
                                  </button>
                                  &nbsp;
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          className="font-semibold border-2 border-black  p-1 flex gap-2 rounded-md"
                          onClick={handleAddVisitor1}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveVisitor(index)}>
                      <FaTrash />
                    </button>
                    &nbsp;
                  </div>
                </div>
              ))}
              <button
                className="font-semibold  px-4 p-1 flex gap-2 items-center rounded-md border-2 border-black"
                onClick={handleAddVisitor}
              >
                Add
              </button>

              <Table
                columns={column}
                data={data}
                isPagination={true}
                title={"Cost Approval Requests"}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center mb-10">
          <button className="font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md">
            Submit & show Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddCAR;
