import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import { PiPlusCircle } from "react-icons/pi"; // Ensure you have this import
import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import { GrHelpBook } from "react-icons/gr";
import { useSelector } from "react-redux";
import {
  addHrmsOrganizationDepartment,
  getMyHRMSEmployees,
  getMyOrgDepartments,
  getHrmsDepartmentDetails,
  editHrmsOrganizationDepartment,
  deleteHrmsDepartment,
} from "../../api";
import Select from "react-select";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { FaCheck, FaTrash } from "react-icons/fa";
import MultiSelect from "./Components/MultiSelect";
import { MdClose } from "react-icons/md";
const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const themeColor = useSelector((state) => state.theme.color);

  const listItemStyle = {
    listStyleType: "disc",
    color: "gray",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Head Of Department",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button>
          {/* <button
            onClick={() => handleDeleteDepartment(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button> */}
        </div>
      ),
    },
  ];

  const handleDeleteDepartment = async (id) => {
    try {
      const delRes = await deleteHrmsDepartment(id);
      toast.success("Department deleted successfully");
      fetchMyDepartments();
    } catch (error) {
      console.log(error);
    }
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [employees, setEmployees] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getMyHRMSEmployees(hrmsOrgId);

        const employeesList = res.map((emp) => ({
          value: emp.id,
          label: `${emp.first_name} ${emp.last_name}`,
        }));

        setEmployees(employeesList);
        setSupervisors(employeesList);
        setFilteredSupervisors(employeesList);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, []);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const fetchMyDepartments = async () => {
    try {
      const departmentRes = await getMyOrgDepartments(hrmsOrgId);
      setFilteredDepartments(departmentRes);
      setDepartments(departmentRes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyDepartments();
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const filteredResult = departments.filter(
        (department) =>
          department.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          `${department.first_name} ${department.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      setFilteredDepartments(filteredResult);
    }
  };
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };
  const handleEditUserChangeSelect = (selectedUserOption) => {
    setEditSelectedOption(selectedUserOption);
  };
  const handleAddDept = async () => {
    if (!departmentName) {
      toast.error("Department name is required");
      return;
    }
    if (!selectedUserOption || selectedUserOption.length === 0) {
      toast.error("Please select a Head of Department");
      return;
    }

    const postData = new FormData();
    postData.append("name", departmentName);

    const deptHeadId = selectedUserOption.value;
    postData.append("head_of_department", deptHeadId);

    postData.append("organization", hrmsOrgId);
    const reportingSupervisors = selectedOptions.map((item) => item);
    reportingSupervisors.forEach((supervisor) => {
      postData.append("reporting_supervisor", supervisor);
    });
    try {
      const postRes = await addHrmsOrganizationDepartment(postData);
      toast.success("Department added successfully");
      fetchMyDepartments();
      setIsModalOpen(false);
      setDepartmentName("");
      setSelectedOptions([]);
    } catch (error) {
      toast.error("An error occurred while adding the department");
      console.log(error);
    }
  };
  const [deptId, setDeptId] = useState("");
  const handleEditModal = async (id) => {
    setIsModalOpen1(true);
    setDeptId(id);
    try {
      const response = await getHrmsDepartmentDetails(id);
      setEditDepartmentName(response.name);
      const selectedHead = employees.find(
        (employee) => employee.value === response.head_of_department
      );
      setEditSelectedOption(selectedHead || null);
      setEditSelectedOptions(response.reporting_supervisor);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateDepartment = async () => {
    const editData = new FormData();
    editData.append("name", editDepartmentName);
    editData.append("head_of_department", editSelectedOption.value);
    editData.append("organization", hrmsOrgId);
    const reportingSupervisors = editSelectedOptions.map((item) => item);
    reportingSupervisors.forEach((supervisor) => {
      editData.append("reporting_supervisor", supervisor);
    });

    try {
      const res = await editHrmsOrganizationDepartment(deptId, editData);
      setIsModalOpen1(false);
      toast.success("Department updated successfully");
      fetchMyDepartments();
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editSelectedOptions, setEditSelectedOptions] = useState([]);
  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleSelectEdit = (option) => {
    if (editSelectedOptions.includes(option)) {
      setEditSelectedOptions(
        editSelectedOptions.filter((item) => item !== option)
      );
    } else {
      setEditSelectedOptions([...editSelectedOptions, option]);
    }
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex justify-between gap-2 my-2 mt-5">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: themeColor }}
            className="border-2 font-medium hover:bg-black hover:text-white duration-150 transition-all  p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        <Table
          columns={columns}
          data={filteredDepartments}
          isPagination={true}
        />
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>

          <div>
            <p className="font-medium"> Department Settings Guidelines</p>
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can create departments such as a Sales, Marketing, HR,
                    Finance, Operations, etc. By adding departments, you will be
                    able to map the employees under specific departments from
                    the employee profile --{">"} employment ---{">"} Job
                    Information ---{">"} Position. This can further be mapped to
                    head of departments for direct reporting and workflow
                    approvals.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    An analytic view is displayed on the dashboard that gives
                    information on the no. Of employees mapped under specific
                    departments. Departments can also be used in filters across
                    modules.
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>How do I create departments?</li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Click on{" "}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="  text-white py-1 px-4 rounded-lg"
                      style={{ background: themeColor }}
                    >
                      Add Department
                    </button>
                    ---{">"} Enter department name and select the head of the
                    department from the employee list.
                  </li>
                </ul>
              </li>

              <li>
                You can edit and disable the departments. But you cannot delete
                the departments that contains mapped employees.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add Department</h2>
            <div className="mb-4">
              <label htmlFor="departmentName" className="block  font-medium ">
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder="Enter Department Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block  font-medium">
                Head of Department
              </label>

              <Select
                options={employees}
                noOptionsMessage={() => "No Employee Available"}
                onChange={handleUserChangeSelect}
                placeholder="Select Department Head"
                maxMenuHeight={200}
              />
            </div>
            <MultiSelect
              options={supervisors}
              title={"Select reporting supervisors?"}
              handleSelect={handleSelect}
              // handleSelectAll={handleSelectAll}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              setOptions={setSupervisors}
              searchOptions={filteredSupervisors}
            />
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border-2 border-red-500 text-red-500 p-1 px-4 rounded-full flex items-center gap-2"
              >
                <MdClose /> Cancel
              </button>
              <button
                onClick={handleAddDept}
                className="border-2 border-green-500 bg-green-500 text-white p-1 px-4 rounded-full flex items-center gap-2"
              >
                <FaCheck /> Add
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Department</h2>
            <div className="mb-4">
              <label htmlFor="departmentName" className="block  font-medium ">
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={editDepartmentName}
                onChange={(e) => setEditDepartmentName(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder="Enter Department Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block font-medium">
                Head of Department
              </label>
              <Select
                value={editSelectedOption}
                options={employees}
                noOptionsMessage={() => "No Employee Available"}
                onChange={handleEditUserChangeSelect}
                placeholder="Select Department Head"
                maxMenuHeight={200}
              />
            </div>
            <MultiSelect
              options={supervisors}
              title={"Select reporting supervisors?"}
              handleSelect={handleSelectEdit}
              // handleSelectAll={handleSelectAll}
              selectedOptions={editSelectedOptions}
              setSelectedOptions={setEditSelectedOptions}
              setOptions={setSupervisors}
              searchOptions={filteredSupervisors}
            />
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen1(false)}
                className="border-2 border-red-500 text-red-500 p-1 px-4 rounded-full flex items-center gap-2"
              >
                <MdClose /> Close
              </button>
              <button
                onClick={UpdateDepartment}
                className="border-2 border-green-500 bg-green-500 text-white p-1 px-4 rounded-full flex items-center gap-2"
              >
                <FaCheck /> Update
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Department;
