import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import {
  getMyHRMSEmployees,
  getMyHRMSEmployeesAllData,
  getResignations,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

// Modal Component
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  const fetchAllEmployees = async () => {
    try {
      const res = await getMyHRMSEmployees(hrmsOrgId);

      setEmployees(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllEmployees();
  }, []);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
    if (employeeId) {
      navigate(
        `/hrms/separation/separate-application/resignation/${employeeId}`
      );
    }
  };
  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold border-b mb-2">
          Initiate Separation
        </h2>
        <form>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700 font-medium">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={selectedEmployee}
              onChange={handleChange}
            >
              <option value="">Please Select Employee</option>
              {employees.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end my-2">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SeparationTable = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [resignationsData, setResignationData] = useState([]);
  const [filteredResignationData, setFilteredResignationData] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const fetchResignations = async () => {
    try {
      const res = await getResignations(hrmsOrgId);
      setFilteredResignationData(res);
      setResignationData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchResignations();
  }, []);
  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "Resignation Date",
      selector: (row) => row.resignation_application_date,
      sortable: true,
    },
    {
      name: "Last Working Date",
      selector: (row) => row.requested_last_working_date,
      sortable: true,
    },
    {
      name: "Separation Reason",
      selector: (row) => row.separation_reason,
      sortable: true,
    },
    {
      name: "Separation Status",
      selector: (row) => row.Country,
      sortable: true,
    },
    {
      name: "FnF Status",
      selector: (row) => row.Leave_Days,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="bg-green-400 rounded-full p-2 text-white"
            title="Approve"
          >
            <FaCheck />
          </button>
          <button
            className="bg-red-400 rounded-full p-2 text-white"
            title="Reject"
          >
            <MdClose />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Label: "2/2/2023",
      City: "2/2/2023",
      State: "abc",
      Country: "pending",
    },
  ];

  return (
    <section className="flex">
      <div className="w-full flex m-2 flex-col overflow-hidden">
        <div className="flex gap-2 justify-between my-2">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-full placeholder:text-sm rounded-md p-2"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen1(true)}
              style={{ background: themeColor }}
              className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
            >
              Filter
            </button>
            <button
              style={{ background: themeColor }}
              className="font-semibold text-white duration-150 transition-all w-52  p-2 rounded-md  cursor-pointer text-center flex items-center gap-2 justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <PiPlusCircle size={20} />
              Initiate Separation
            </button>
          </div>
        </div>
        {isModalOpen1 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-md w-1/3">
              {/* <h1 className="text-xl font-bold mb-4">Bulk Upload Contract Agreement Document</h1> */}
              <div className="mb-4">
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Separation Reason
                </label>
                <select
                  type="text"
                  id="departmentName"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                  placeholder=""
                >
                  <option value="">Better Opportunity-compensation</option>
                  <option value="">Better Opportunity-Job Role</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Separation Status
                </label>
                <select
                  type="text"
                  id="departmentName"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                  placeholder=""
                >
                  <option value="">Level 1 Approval Pending</option>
                  <option value="">Level 2 Approval Pending</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Branch Location
                </label>
                <select
                  id="headOfDepartment"
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="">Mumbai</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen1(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Clear
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
        <Table
          columns={columns}
          data={filteredResignationData}
          isPagination={true}
        />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default SeparationTable;
