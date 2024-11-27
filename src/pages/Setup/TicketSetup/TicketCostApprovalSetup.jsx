import React, { useState } from "react";
import ToggleSwitch from "../../../Buttons/ToggleSwitch";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

import Table from "../../../components/table/Table";

const TicketCostApprovalSetup = () => {
  const [page, setPage] = useState("FM");
  const themeColor = useSelector((state) => state.theme.color);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const columns = [
  
    {
      name: "Cost Range",
      selector: (row) => row.cost,
      sortable: true,
    },
    {
      name: "Levels",
      selector: (row) => row.Levels,
      sortable: true,
    },
    {
      name: "Approvers",
      selector: (row) => row.Approvers,
      sortable: true,
    },
  ]
  const data = [
    {
      cost:"500-600",
      Levels:"L1",
      Approvers:"Deepak Gupta",
    },
    {
      cost:"500-600",
      Levels:"L2",
      Approvers:"Deepak Gupta",
    },
    {
      cost:"500-600",
      Levels:"L3",
      Approvers:"Deepak Gupta",
    },
    {
      cost:"500-600",
      Levels:"L4",
      Approvers:"Deepak Gupta",
    },
    {
      cost:"500-600",
      Levels:"L5",
      Approvers:"Deepak Gupta",
    }

  ]
  return (
    <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <div className="flex gap-5 justify-center">
        <label htmlFor="" className="font-medium">Approval Level :</label>
        <div className="flex gap-4">
        <label htmlFor="">Access Level </label>&nbsp;
        <ToggleSwitch />
        <label htmlFor="">User Level</label>
        </div>
      </div>
      <div className="flex w-full">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "FM" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("FM")}
          >
            FM
          </h2>
          <h2
            className={`p-1 ${
              page === "Project" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Project")}
          >
            Project
          </h2>
        </div>
      </div>
      <div>
        {page === "FM" && (
          <div className="ml-2 mt-2 mx-2">
             <div className="flex mt-5">
             <select
        name="condition"
        id="condition"
        className="border p-2 rounded-md border-black w-64 h-10"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select Unit</option>
        <option value="between">Between</option>
        <option value="greaterThan">Greater than</option>
        <option value="greaterThanEqual">Greater than Equal</option>
      </select>

      {selectedOption === 'between' && (
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
        </div>
      )}

      {(selectedOption === 'greaterThan' || selectedOption === 'greaterThanEqual') && (
        <div>
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
        </div>
      )}

           
              <div className=" gap-50 w-2/3  ml-10 mb-5">
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="border border-gray-300 bg-gray-100 px-4 py-2">
                        Levels
                      </th>
                      <th class="border border-gray-300 bg-gray-100 px-4 py-2">
                        Approvers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L1</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L2</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L3</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L4</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L5</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                &nbsp;
                <div className="flex justify-center">
                <button
                  className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background:themeColor }}
                >
                  Submit
                </button></div>
              </div>
            </div>
           
            <div className="ml-10 mt-3 mb-8 mr-12">
              <p className="font-semibold">Rule 1</p>
              <div className="flex justify-end gap-x-60 mb-2">
                <FaTrash/>
              </div>

              <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          isPagination={true}
        />
            </div>
          </div>
        )}
        {page === "Project" && (
          <div className="ml-2 mt-2">
            <div className="flex mt-5">
            <select
        name="condition"
        id="condition"
        className="border p-2 rounded-md border-black w-64 h-10"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Select Unit</option>
        <option value="between">Between</option>
        <option value="greaterThan">Greater than</option>
        <option value="greaterThanEqual">Greater than Equal</option>
      </select>

      {selectedOption === 'between' && (
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
        </div>
      )}

      {(selectedOption === 'greaterThan' || selectedOption === 'greaterThanEqual') && (
        <div>
          <input
            type="text"
            className="border p-2 rounded-md border-black w-64 ml-4 h-10 "
            placeholder="Enter cost"
          />
        </div>
      )}

           
              <div className=" gap-50 w-2/3  ml-10 mb-5">
                <table class="w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="border border-gray-300 bg-gray-100 px-4 py-2">
                        Levels
                      </th>
                      <th class="border border-gray-300 bg-gray-100 px-4 py-2">
                        Approvers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L1</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L2</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L3</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L4</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2 text-center">L5</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                      <select
                          name=""
                          id=""
                          className="border p-2 rounded-md border-black w-full"
                        ><option value="">Select Users</option>
                        <option value="">Mittu</option>
                        <option value="">Panda</option></select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                &nbsp;
                <div className="flex justify-center">
                <button
                  className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                  style={{ background:themeColor}}
                >
                  Submit
                </button></div>
              </div>
            </div>
            {/* <div className="flex gap-7 ml-10">
          <label htmlFor="" className="font-semibold">Filter</label>
          <select name="" id="" className="border p-2 rounded-md border-black w-48"></select>
          <button
 className="border-2 font-semibold hover:bg-green-500 hover:text-white transition-all border-green-500 p-2 rounded-md text-green-500 cursor-pointer text-center flex items-center gap-2 justify-center"
 style={{ height: "1cm" }}
      >
        Apply
      </button>
      <button
 className="border-2 font-semibold hover:bg-blue-500 hover:text-white transition-all border-blue-500 p-2 rounded-md text-blue-500 cursor-pointer text-center flex items-center gap-2 justify-center"
 style={{ height: "1cm" }}
      >
        Reset
      </button>
      </div> */}
            <div className="ml-10 mt-3 mb-8 mr-12">
              {/* <p className="font-semibold">Rule 1</p> */}
              {/* <div className="flex justify-end gap-x-60 mb-1">
   <BiEdit />
 </div> */}

              {/* <table class="w-full border-collapse table-center">
         
     <thead>
       <tr>
         <th class="border border-gray-300 bg-gray-100 px-4 py-2">Cost Ranges</th>
         <th class="border border-gray-300 bg-gray-100 px-4 py-2">Levels</th>
         <th class="border border-gray-300 bg-gray-100 px-4 py-2">Approvers</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td class="border border-gray-300 px-4 py-2 text-center" rowspan="5">500-600</td>
         <td class="border border-gray-300 px-4 py-2">E1</td>
         <td class="border border-gray-300 px-4 py-2">Deepak Gupta</td>
       </tr>
       <tr>
         <td class="border border-gray-300 px-4 py-2">E2</td>
         <td class="border border-gray-300 px-4 py-2"></td>
       </tr>
       <tr>
         <td class="border border-gray-300 px-4 py-2">E3</td>
         <td class="border border-gray-300 px-4 py-2"></td>
       </tr>
       <tr>
         <td class="border border-gray-300 px-4 py-2">E4</td>
         <td class="border border-gray-300 px-4 py-2"></td>
       </tr>
       <tr>
         <td class="border border-gray-300 px-4 py-2">E5</td>
         <td class="border border-gray-300 px-4 py-2"></td>
       </tr>
     </tbody>
   </table> */}
            </div>
          </div>
        )}
        {/* {page === "Setup" &&  <TicketSetupPage/>}
    {page === "Escalation Setup" &&  <TicketEscalationSetup/>}
    {page === "Cost Approval" &&  <TicketCostApprovalSetup/>} */}
        {/* {page === "Permit Activity" &&  <PermitActivityTable/>}
      {page === "Permit Sub Activity" &&  <PermitSubActivityTable/>}
      {page === "Permit Hazard Category" &&  <PermitHazardCategoryTable/>}
      {page === "Permit Risk" &&  <PermitRiskTable/>} */}
      </div>
    </div>
  );
};

export default TicketCostApprovalSetup;