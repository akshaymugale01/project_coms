import React, { useEffect, useState } from "react";
import TicketCategorySetup from "./TicketCategorySetup";
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ColorPicker, Space } from "antd";
import FileInputBox from "../../../containers/Inputs/FileInputBox";
import { FaTrash } from "react-icons/fa";
import { getHelpDeskStatusSetup, postHelpDeskStatusSetup } from "../../../api";
import { statusColors } from "../../../utils/colors";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import EditStatusModal from "./EditStatusModal";

const TicketSetupPage = () => {
  const [selectedRule, setSelectedRule] = useState("");
  const [statusAdded, setStatusAdded] = useState(false);
const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    status: "",
    fixedState: "",
    color: "",
    order: "",
  });

  const handleSelectChange = (event) => {
    setSelectedRule(event.target.value);
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [page, setPage] = useState("Category Type");
  const themeColor = useSelector((state) => state.theme.color);
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [id, setId] = useState("")
  useEffect(() => {
    const fetchTicketStatus = async () => {
      try {
        const statusResp = await getHelpDeskStatusSetup();
        const statusArray = Object.values(statusResp.data);
        setStatuses(statusArray);
        console.log(statusArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketStatus();
  }, [statusAdded]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const columns1 = [
    {
      name: "Sr.No",
      selector: (row) => row.No,
      sortable: true,
    },
    {
      name: "Complaint Mode",
      selector: (row) => row.Complaint_Mode,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link>
            <BiEdit size={15} />
          </Link>
          <Link>
            <FaTrash size={15} />
          </Link>
        </div>
      ),
    },
  ];
  const columns2 = [
    {
      name: "Sr.No",
      selector: (row) => row.No,
      sortable: true,
    },
    {
      name: "Rule",
      selector: (row) => row.Complaint_Mode,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link>
            <FaTrash size={15} />
          </Link>
        </div>
      ),
    },
  ];

  const handleEditStatusModal = (id)=>{
setId(id)
setShowEditModal(true)
  }
  const statusColumns = [
    {
      name: "Order",
      selector: (row) => row.position,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Fixed State",
      selector: (row) => row.fixed_state,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => (
        <div
          style={{ background: row.color_code }}
          className={`rounded-md w-4 h-4 text-center`}
        ></div>
      ),
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) => row.Email,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={()=>{handleEditStatusModal(row.id)}}>
            <BiEdit size={15} />
          </button>
          {/* <Link>
            <FaTrash size={15} />
          </Link> */}
        </div>
      ),
    },
  ];

  const data1 = [
    {
      id: 1,
      No: "1",
      Complaint_Mode: "Phone",
    },
  ];
  // const data2 = [
  //   {
  //     id: 1,
  //     No: "1",
  //     Complaint_Mode: "1 - 25 Days",
  //   },
  // ];
  console.log(statusAdded);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  const handleColorClick = (color) => {
    setFormData({ ...formData, color });
  };
  const siteID = getItemInLocalStorage("SITEID");
  const handleAddStatus = async () => {
    if (formData.status === "" || formData.order === "") {
      return toast.error("Please Add Status Name & Order");
    }
    const postStatus = new FormData();
    postStatus.append("complaint_status[of_phase]", "pms");
    postStatus.append("complaint_status[society_id]", siteID);
    postStatus.append("complaint_status[name]", formData.status);
    postStatus.append("complaint_status[fixed_state]", formData.fixedState);
    postStatus.append("complaint_status[color_code]", formData.color);
    postStatus.append("complaint_status[position]", formData.order);
    try {
      const resp = await postHelpDeskStatusSetup(postStatus);
      console.log(resp);
      setStatusAdded(true);
      toast.success("Status Added Successfully");
      setFormData({
        ...formData,
        color: "",
        status: "",
        fixedState: "",
        order: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setTimeout(() => {
        setStatusAdded(false);
      }, 500);
    }
  };

  return (
    <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <div className="flex w-full">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Category Type" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Category Type")}
          >
            Category Type
          </h2>
          <h2
            className={`p-1 ${
              page === "Status" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Status")}
          >
            Status
          </h2>
          <h2
            className={`p-1 ${
              page === "Operational Days" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Operational Days")}
          >
            Operational Days
          </h2>
          {/* <h2
            className={`p-1 ${
              page === "Complaint Mode" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Complaint Mode")}
          >
            Complaint Mode
          </h2>
          <h2
            className={`p-1 ${
              page === "Aging Rule" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Aging Rule")}
          >
            Aging Rule
          </h2> */}
        </div>
      </div>
      <div>
        {page === "Category Type" && (
          <div className="mr-4">
            <TicketCategorySetup />
          </div>
        )}
        {page === "Status" && (
          <div className="m-2">
            <div className="grid md:grid-cols-5 gap-2 my-2">
              <input
                type="text"
                placeholder="Enter status"
                className="border p-2 rounded-md border-gray-300"
                value={formData.status}
                onChange={handleChange}
                name="status"
              />
              <select
                name="fixedState"
                onChange={handleChange}
                value={formData.fixedState}
                id=""
                className="border p-2 rounded-md border-gray-300"
              >
                <option value="">Select Fixed State</option>
                <option value="closed">Closed</option>
                <option value="open">Open</option>
                <option value="complete">Complete</option>
              </select>

              <ColorPicker
                value={formData.color}
                onChange={(color) =>
                  setFormData({ ...formData, color: color.toHexString() })
                }
                size="large"
              />

              <input
                type="number"
                placeholder="Enter order"
                className="border p-2 rounded-md border-gray-300"
                value={formData.order}
                onChange={handleChange}
                name="order"
              />
              <button
                className=" font-medium hover:text-white transition-all w-full p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
                onClick={handleAddStatus}
              >
                Add
              </button>
            </div>
            <Table
              responsive
              //   selectableRows
              columns={statusColumns}
              data={statuses}
              isPagination={true}
            />{" "}
            {/* <div className="flex gap-10">
              <label className="font-semibold mt-2" htmlFor="">
                Allow User to reopen ticket after closure
              </label>
              <select
                className="border p-2 rounded-md w-64 border-black"
                name=""
                id=""
              >
                <option value="">Select time period</option>
                <option value="">Days</option>
                <option value="">Hrs</option>
                <option value="">Months</option>
              </select>
              <input
                type="text"
                className="border p-2 rounded-md border-black"
                placeholder="2"
              />
              <button
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Update
              </button>
            </div> */}
          </div>
        )}
        {page === "Operational Days" && (
          <div class=" w-full  my-2">
            {/* <button
              onClick={openModal}
              className="border-2 font-semibold mt-5 ml-10 hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ background: themeColor }}
            >
              Import
            </button> */}
            <table className="w-full">
              <thead style={{background: themeColor}} className="text-white">
                <tr>
                  <th class="px-4 py-2"></th>
                  <th class="px-4 py-2">Operational Days</th>
                  <th class="px-4 py-2">Start Time</th>
                  <th class="px-4 py-2">End Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Monday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="13:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="19:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
      
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Tuesday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="13:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="16:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Wednesday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="15:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="16:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Thursday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="14:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="06:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Friday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="09:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="13:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Saturday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="08:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="13:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
            */}
                </tr>
                <tr>
                  <td class="border px-4 py-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td class="border px-4 py-2 text-center">Sunday</td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="12:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  <td class="border px-4 py-2 text-center">
                    <input
                      type="time"
                      value="13:45"
                      className="border border-gray-400 p-1 w-40 rounded-md"
                    />
                  </td>
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td> */}
                  {/* <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="checkbox"/></td>
              <td class="border px-4 py-2 text-center"><input type="time" className="border border-gray-400 p-2 rounded-md"/></td>
            */}
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center my-2 mb-5">
            <button
              className=" font-semibold  hover:bg-black hover:text-white transition-all border-black p-2 px-4 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ background: themeColor }}
              >
              Submit
            </button>
              </div>
            {showModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg w-2/3">
                  {/* <h1>Clone Data</h1> */}
                  <h2 className="text-xl text-center font-semibold mb-4">
                    Bulk Upload
                  </h2>
                  <FileInputBox />
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                      style={{ background: themeColor }}
                    >
                      Download Sample format
                    </button>

                    <button
                      className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                      style={{ background: themeColor }}
                    >
                      Import
                    </button>
                    <button
                      onClick={closeModal}
                      className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                      style={{ background: themeColor }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {page === "Complaint Mode" && (
          <div className="mt-5">
            <div className="flex gap-5 mb-5">
              <input
                type="text"
                placeholder="Enter complaint mode"
                className="border p-2 rounded-md border-black"
              />
              <button
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Add
              </button>
            </div>
            <div className="mr-4">
              <Table
                responsive
                //   selectableRows
                columns={columns1}
                data={data1}
                isPagination={true}
              />
            </div>
          </div>
        )}
        {page === "Aging Rule" && (
          <div className="mt-7">
            <div className="flex gap-6 mb-5">
              <select
                name=""
                id=""
                className="border p-2 rounded-md border-black w-48"
              >
                <option value="">Select Rule Type</option>
                <option value="">Months</option>
                <option value="">Days</option>
                <option value="">Hours</option>
              </select>
              <select
                name="rule"
                id="rule"
                className="border p-2 rounded-md border-black w-48"
                onChange={handleSelectChange}
                value={selectedRule}
              >
                <option value="">Select Rule Unit</option>
                <option value="between">Between</option>
                <option value="equal">Equal</option>
                <option value="lessThan">Less than</option>
                <option value="greaterThan">Greater than</option>
                <option value="lessThanEqual">Less than Equal</option>
                <option value="greaterThanEqual">Greater than Equal</option>
              </select>

              <div className="">
                {selectedRule === "between" ? (
                  <>
                    <input
                      type="text"
                      className="border p-2 rounded-md border-black mr-2"
                      placeholder="From"
                    />
                    <input
                      type="text"
                      className="border p-2 rounded-md border-black"
                      placeholder="To"
                    />
                  </>
                ) : selectedRule ? (
                  <input
                    type="text"
                    className="border p-2 rounded-md border-black"
                    placeholder="Value"
                  />
                ) : null}
              </div>
              <button
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ background: themeColor }}
              >
                Add
              </button>
            </div>
            <div className="mr-4">
              <Table
                responsive
                //   selectableRows
                columns={columns2}
                data={data2}
                isPagination={true}
              />
            </div>
          </div>
        )}
       {showEditModal && <EditStatusModal onClose={()=> setShowEditModal(false)} id={id} setStatusAdded={setStatusAdded}  />}
      </div>
    </div>
  );
};

export default TicketSetupPage;
