import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import AddRoleCommunicationModal from "../../containers/modals/AddRoleCommunicationModal";
const CommunicationAccessControl = () => {
  const [modal, showModal] = useState(false);
  const [tab1, setTab1] = useState("user");
  const [selectedRole, setSelectedRole] = useState("Admin"); // State to manage selected role
  const [checkboxStates, setCheckboxStates] = useState({
    1: { all: false, add: false, view: false, edit: false, disable: false },
    // Initialize other rows if necessary
  });

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    if (role === "Admin") {
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
    if (role === "Moderator") {
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
    if (role === "Employee") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        1: {
          all: false,
          add: false,
          view: true,
          edit: false,
          disable: false,
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
      empty: "Event",
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
      id: 3,
      empty: "Polls",
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
      id: 4,
      empty: "Forum",
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
      id: 5,
      empty: "Group",
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
  return (
    <div className="flex justify-center w-full my-1 ">
      <div className="w-full mx-2 ">

        {tab1 === "user" && (
          <div>
            <div className="flex flex-col mx-10 mt-10 gap-2">
              <button
                to={``}
                className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex justify-center items-center w-44 gap-2"
                onClick={() => showModal(true)}
             >
                <PiPlusCircle size={20} />
                Add role
              </button>
              {modal && <AddRoleCommunicationModal onclose={() => showModal(false)} />}
            </div>
            <div className="md:grid grid-cols-12 gap-4">
              <div className=" col-span-4 p-4  ">
                <h1 className="text-white text-center rounded-md bg-black p-2 px-20">
                  Roles
                </h1>
                <div className="flex flex-col  mt-1 bg-gray-200 p-2 rounded-md">
                   <div>
      {['Admin', 'Moderator', 'Employee', ].map((role) => (
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
                <div className="my-5">
                  <div>
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

export default CommunicationAccessControl