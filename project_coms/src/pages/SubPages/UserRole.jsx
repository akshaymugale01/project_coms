import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { PiPlusCircle } from "react-icons/pi";
import toast from "react-hot-toast";
import BackButton from "../../Buttons/BackButton";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import ToggleSwitch from "../../Buttons/ToggleSwitch";

const UserRole = () => {
  const [tab1, setTab1] = useState("user");
  const [department, setDepartment] = useState("");
  const [tab, setTab] = useState("all");
  const [selectedRole, setSelectedRole] = useState("Account Manager"); // State to manage selected role
  const [checkboxStates, setCheckboxStates] = useState({
    1: { all: false, add: false, view: false, edit: false, disable: false },
    // Initialize other rows if necessary
  });
  
  const handleRoleClick = (role) => {
    setSelectedRole(role);
    if (role === "Account Manager") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        1: {
          all: true,
          add: true,
          view: true,
          edit: true,
          disable: true,
        },
      }));
    }
    if (role === "Executive") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        1: {
          all: false,
          add: true,
          view: false,
          edit: false,
          disable: true,
        },
      }));
    }
    if (role === "Process Manager") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        1: {
          all: false,
          add: false,
          view: true,
          edit: true,
          disable: true,
        },
      }));
    }
  };

  const handleAllChange = (rowId) => {
    setCheckboxStates((prevStates) => {
      const newStates = { ...prevStates };
      newStates[rowId] = {
        ...newStates[rowId],
        all: !newStates[rowId]?.all,
        add: !newStates[rowId]?.all ? true : false,
        view: !newStates[rowId]?.all ? true : false,
        edit: !newStates[rowId]?.all ? true : false,
        disable: !newStates[rowId]?.all ? true : false,
      };
      return newStates;
    });
  };

  const handleCheckboxChange = (rowId, type) => {
    setCheckboxStates((prevStates) => {
      const newStates = { ...prevStates };
      newStates[rowId] = {
        ...newStates[rowId],
        [type]: !newStates[rowId]?.[type],
      };
      return newStates;
    });
  };

  const column = [
    {
      name: "Department",
      selector: (row) => row.Department,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      Department: "ABC",
      Status: <ToggleSwitch />,
    },
  ];

  const handleAllTab = () => {
    setTab("all");
  };

  const handleInvTab = () => {
    setTab("inv");
  };

  const handlesetupTab = () => {
    setTab("setup");
  };

  const handlesQuickgateTab = () => {
    setTab("quick");
  };

  const columnsfunction = [
    {
      name: "",
      selector: (row) => row.empty,
      sortable: true,
    },
    {
      name: "All",
      selector: (row) => row.All,
      sortable: true,
    },
    {
      name: "Add",
      selector: (row) => row.Add,
      sortable: true,
    },
    {
      name: "view",
      selector: (row) => row.view,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => row.Edit,
      sortable: true,
    },
    {
      name: "Disable",
      selector: (row) => row.Disable,
      sortable: true,
    },
  ];

  const datafunction = [
    {
      id: 1,
      empty: "Broadcast",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    {
      id: 2,
      empty: "GRN",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    // Other rows...
  ];
  const datainv = [
    {
      id: 1,
      empty: "Masters",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    {
      id: 2,
      empty: "GRN",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    // Other rows...
  ];
  const datasetup = [
    {
      id: 1,
      empty: "Account",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    {
      id: 2,
      empty: "User & Roles",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    // Other rows...
  ];
  const dataquickchange = [
    {
      id: 1,
      empty: "Visitor",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    {
      id: 2,
      empty: "R Vehicles",
      All: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.all || false}
          onChange={() => handleAllChange(1)}
        />
      ),
      Add: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.add || false}
          onChange={() => handleCheckboxChange(1, "add")}
        />
      ),
      view: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.view || false}
          onChange={() => handleCheckboxChange(1, "view")}
        />
      ),
      Edit: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.edit || false}
          onChange={() => handleCheckboxChange(1, "edit")}
        />
      ),
      Disable: (
        <input
          type="checkbox"
          checked={checkboxStates[1]?.disable || false}
          onChange={() => handleCheckboxChange(1, "disable")}
        />
      ),
    },
    // Other rows...
  ];
  const customStyleall = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "14px",
      },
    },
  };

  const handleUserTab = () => {
    setTab1("user");
  };

  const handleDepartmentTab = () => {
    setTab1("department");
  };

  const [showFields, setShowFields] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department) {
      return toast.error("Please Enter Department Name");
    }

    const newData = {
      department: department,
    };
    setSubmittedData((prevData) => [...prevData, newData]);

    setShowRows(true);
    setShowFields(false);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="flex justify-center w-full my-1 ">
      <div className="w-full mx-2 ">
        {/* <BackButton to={"/setup"} /> */}
        <span className="flex justify-center ">
          <div className=" w-72 flex justify-around bg-gray-400 py-1  rounded-full border-2">
            <h1
              className={`text-lg font-semibold cursor-pointer ${
                tab1 === "user" && "bg-black"
              }  text-white p-1 px-6 text-center rounded-full`}
              onClick={handleUserTab}
            >
              User Role
            </h1>
            <h1
              className={`text-lg font-semibold ${
                tab1 === "department" && "bg-black"
              } text-white p-1 px-5 text-center cursor-pointer rounded-full`}
              onClick={handleDepartmentTab}
            >
              Department
            </h1>
          </div>
        </span>
        {tab1 === "department" && (
          <div className="flex flex-col mx-10 my-10 gap-2">
            <h2
              className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center w-44 gap-2"
              onClick={() => setShowFields(!showFields)}
            >
              <PiPlusCircle size={20} />
              Add Department
            </h2>
            {showFields && (
              <div>
                <div className="grid grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Enter Department Name"
                    className="border border-gray-500 rounded-md mt-5 p-2"
                    value={department}
                    onChange={handleDepartmentChange}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}

            <div className="flex justify-center items-center">
              <div className="mt-4 w-screen">
                <Table
                  columns={column}
                  data={data}
                  // customStyles={customStyleall}
                  fixedHeader
                  fixedHeaderScrollHeight="500px"
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                  omitColumn={column}
                />
              </div>
            </div>
          </div>
        )}
        {tab1 === "user" && (
          <div>
            <div className="flex flex-col mx-10 mt-10 gap-2">
              <Link
                to={`/setup/add-role/`}
                className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex justify-center items-center w-44 gap-2"
              >
                <PiPlusCircle size={20} />
                Add role
              </Link>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className=" col-span-4 p-4  ">
                <h1 className="text-white text-center rounded-md bg-black p-2 px-20">
                  Roles
                </h1>
                <div className="flex flex-col  mt-1 bg-gray-200 p-2 rounded-md">
                  {/* <p
                    className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium"
                    onClick={() => handleRoleClick("Account Manager")}
                  >
                    Account Manager
                  </p>
                  <p
                    className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium"
                    onClick={() => handleRoleClick("Executive")}
                  >
                    Executive
                  </p>
                  <p
                    className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium"
                    onClick={() => handleRoleClick("Process Manager")}
                  >
                    Process Manager
                  </p>
                  <p className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium">
                    Manager
                  </p>
                  <p className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium">
                    Admin
                  </p>
                  <p className="cursor-pointer hover:bg-black hover:text-white rounded-md p-1 font-medium">
                    Test
                  </p> */}
                   <div>
      {['Account Manager', 'Executive', 'Process Manager', 'Manager', 'Admin', 'Test'].map((role) => (
        <p
          key={role}
          className={`cursor-pointer rounded-md p-1 font-medium ${selectedRole === role ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
          onClick={() => handleRoleClick(role)}
        >
          {role}
        </p>
      ))}
    </div>
                </div>
              </div>
              <div className="col-span-8 p-4 ">
                <h1 className="text-white font-semibold bg-black p-2 px-20 rounded-md">
                  Access Rights
                </h1>
                <div>
                  <div>
                    <ul className="flex justify-around border-b p-2">
                      <li
                        className={`${
                          tab === "all" && "bg-black text-white"
                        } p-2 rounded-full px-4 cursor-pointer`}
                        onClick={handleAllTab}
                      >
                        All Function
                      </li>
                      <li
                        className={`${
                          tab === "inv" && "bg-black text-white"
                        } p-2 rounded-full px-4 cursor-pointer`}
                        onClick={handleInvTab}
                      >
                        Inventory
                      </li>
                      <li
                        className={`${
                          tab === "setup" && "bg-black text-white"
                        } p-2 rounded-full px-4 cursor-pointer`}
                        onClick={handlesetupTab}
                      >
                        Setup
                      </li>
                      <li
                        className={`${
                          tab === "quick" && "bg-black text-white"
                        } p-2 rounded-full px-4 cursor-pointer`}
                        onClick={handlesQuickgateTab}
                      >
                        Quickgate
                      </li>
                    </ul>
                    {tab === "all" && (
                      <Table
                        columns={columnsfunction}
                        data={datafunction}
                        customStyles={customStyleall}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        pagination
                        selectableRowsHighlight
                        highlightOnHover
                      />
                    )}
                    {tab === "inv" && (
                      <Table
                        columns={columnsfunction}
                        data={datainv}
                        customStyles={customStyleall}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        pagination
                        selectableRowsHighlight
                        highlightOnHover
                      />
                    )}
                    {tab === "setup" && (
                      <Table
                        columns={columnsfunction}
                        data={datasetup}
                        customStyles={customStyleall}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        pagination
                        selectableRowsHighlight
                        highlightOnHover
                      />
                    )}
                    {tab === "quick" && (
                      <Table
                        columns={columnsfunction}
                        data={dataquickchange}
                        customStyles={customStyleall}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        pagination
                        selectableRowsHighlight
                        highlightOnHover
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRole;