import React, { useState, useRef, useEffect } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
import { getItemInLocalStorage } from "../../utils/localStorage";
import {
  deleteCompanyAsset,
  deleteEmployeeAsset,
  editEmployeeEmploymentDetails,
  getCompanyAsset,
  getEmployeeAsset,
  getEmployeeEmploymentDetails,
  getEmployeeJobInfo,
  getMyHRMSEmployees,
  getMyOrganizationLocations,
  getMyOrgDepartments,
  getReportingSupervisors,
  postEmployeeEmploymentInfo,
} from "../../api";
import toast from "react-hot-toast";
import { PiPlus } from "react-icons/pi";
import AddEmployeeAsset from "./Modals/AddEmployeeAsset";
import EditEmployeeAsset from "./Modals/EditEmployeeAsset";
import { FaRegAddressCard, FaTrash } from "react-icons/fa";
import Accordion from "./Components/Accordion";
import AddCompanyAsset from "./Modals/AddCompanyAsset";
import EditCompanyAsset from "./Modals/EditCompanyAsset";
import { FaFileCircleCheck } from "react-icons/fa6";
import { MdClose, MdInfoOutline, MdOutlineWebAsset } from "react-icons/md";
import { useSelector } from "react-redux";
import AddJobInfo from "./Modals/AddJobInfo";
import { dateFormat } from "../../utils/dateUtils";
import EditJobInfo from "./Modals/EditJobInfo";

const SectionsEmployment = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [assetModal, setAssetModal] = useState(false);
  const [assetEditModal, setAssetEditModal] = useState(false);
  const [companyAssetModal, setCompanyAssetModal] = useState(false);
  const [companyAssetEditModal, setCompanyAssetEditModal] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openModal1 = () => setModalIsOpen1(true);
  const closeModal1 = () => setModalIsOpen1(false);
  const openModal2 = () => setModalIsOpen2(true);
  const closeModal2 = () => setModalIsOpen2(false);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeCode: "",
    joinDate: "",
    employmentType: "",
    probationDueDate: "",
    branch: "",
    department: "",
    designation: "",
    supervisor: "",
    id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationRes = await getMyOrganizationLocations(hrmsOrgId);
        setLocations(locationRes);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const departmentRes = await getMyOrgDepartments(hrmsOrgId);
        setDepartments(departmentRes);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchEmployees = async () => {
      try {
        const employeeRes = await getMyHRMSEmployees(hrmsOrgId);
        setEmployees(employeeRes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
    fetchDepartments();
    fetchEmployees();
  }, []);

  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={openModal2}>
            <BsEye size={15} />
          </button>
        </div>
      ),
    },

    { name: "Effective From", selector: (row) => row.from, sortable: true },
    { name: "Effective To", selector: (row) => row.to, sortable: true },
    {
      name: "Confirmation Due Date",
      selector: (row) => row.due_date,
      sortable: true,
    },

    { name: "Confirmation Date", selector: (row) => row.date, sortable: true },
    {
      name: "Employment Status",
      selector: (row) => row.estatus,
      sortable: true,
    },
  ];
  const jobInfoColumn = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={()=>handleEditJobInfoModal(row.id)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },

    { name: "Effective From", selector: (row) =>dateFormat(row.start_date), sortable: true },
    { name: "Effective To", selector: (row) => row.end_date?dateFormat(row.end_date): "", sortable: true },
    { name: "Associated Site", selector: (row) => row.associated_organization_name, sortable: true },

    { name: "Department", selector: (row) => row.department_name, sortable: true },
    { name: "Designation", selector: (row) => row.designation, sortable: true },
    {
      name: "Reporting Supervisor",
      selector: (row) => row.reporting_supervisor_name,
      sortable: true,
    },
  ];
  const [showEditJobInfoModal, setShowEditJobInfoModal] = useState(false)
const [jobInfoId, setJobInfoId] = useState("")
  const handleEditJobInfoModal =(infoId)=>{
    setJobInfoId(infoId)
    setShowEditJobInfoModal(true)
  } 
  const assetColumn = [
    {
      name: "Which brand laptop",
      selector: (row) => row.laptop_brand,
      sortable: true,
    },

    {
      name: "Retrieve email ID",
      selector: (row) => row.email_id,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditAssetModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button
            onClick={() => handleDeleteEmployeeAsset(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];
  const companyAssetColumn = [
    {
      name: "Which Company Laptop and Model Number",
      selector: (row) => row.asset_name,
      sortable: true,
    },

    {
      name: "Mobile Phone",
      selector: (row) => row.model_number,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => handleEditComAssetModal(row.id)}>
            <BiEdit size={15} />
          </button>
          <button
            onClick={() => handleDeleteCompanyAsset(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteCompanyAsset = async (id) => {
    try {
      await deleteCompanyAsset(id);
      fetchCompanyAssets();
      toast.success("Company's asset deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteEmployeeAsset = async (id) => {
    try {
      await deleteEmployeeAsset(id);
      fetchEmployeeAssets();
      toast.success("Employee's asset deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [comAssetId, setComAssetId] = useState("");
  const handleEditComAssetModal = (id) => {
    setComAssetId(id);
    setCompanyAssetEditModal(true);
  };
  const [empAssetID, setEmpAssetID] = useState("");
  const handleEditAssetModal = (id) => {
    setEmpAssetID(id);
    setAssetEditModal(true);
  };

  const data = [
    {
      from: "2/2/2024",
      to: "4/4/2024",
      date: "2/2/2024",
      due_date: "4/4/2024",
      estatus: "confirmed",
    },
  ];
  const data1 = [
    {
      from: "2/2/2024",
      to: "4/4/2024",
      loc: "Mumbai; Maharashtra",
      dept: "Marketing",
      desgn: "Digital Marketer",
      supervisior: "Mittu",
    },
  ];

  const [empAssets, setEmpAssets] = useState([]);
  const [comAssets, setComAssets] = useState([]);

  const fetchEmploymentDetails = async () => {
    try {
      const response = await getEmployeeEmploymentDetails(id);
      const res = response[0];
      setFormData({
        ...formData,
        employeeCode: res.employee_code,
        joinDate: res.joining_date,
        branch: res.branch_location,
        department: res.department,
        designation: res.designation,
        employmentType: res.employment_type,
        probationDueDate: res.probation_due_date,
        supervisor: res.reporting_supervisor,
        id: res.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployeeAssets = async () => {
    try {
      const res = await getEmployeeAsset(id);

      setEmpAssets(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCompanyAssets = async () => {
    try {
      const res = await getCompanyAsset(id);
      setComAssets(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [jobInfo, setJobInfo] = useState([]);
  const fetchJobInfo = async () => {
    try {
      const res = await getEmployeeJobInfo(hrmsOrgId);
      setJobInfo(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmploymentDetails();
    fetchEmployeeAssets();
    fetchCompanyAssets();
    fetchJobInfo();
  }, []);

  const handleEditEmployment = async () => {
    const postData = new FormData();
    postData.append("joining_date", formData.joinDate);
    postData.append("probation_due_date", formData.probationDueDate);
    postData.append("employee_code", formData.employeeCode);
    postData.append("employment_type", formData.employmentType);
    postData.append("branch_location", formData.branch);
    postData.append("department", formData.department);
    postData.append("reporting_supervisor", formData.supervisor);
    postData.append("designation", formData.designation);
    postData.append("employee", id);
    try {
      if (formData.id) {
        const res = await editEmployeeEmploymentDetails(formData.id, postData);
        console.log(res);
        // setDisableNext(false);
        toast.success("Employment details updated successfully");
        setIsEditing(false);
        fetchEmploymentDetails();
      } else {
        const res = await postEmployeeEmploymentInfo(postData);
        console.log(res);
        // setDisableNext(false);
        toast.success("Employment details updated successfully");
        setIsEditing(false);
        fetchEmploymentDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const themeColor = useSelector((state) => state.theme.color);
  const [reportSupervisors, setReportSupervisors] = useState([]);

  const handleDepartmentChange = async (e) => {
    const fetchReportingSupervisors = async (deptId) => {
      const reportingSupervisors = await getReportingSupervisors(
        deptId,
        hrmsOrgId
      );
      console.log(reportingSupervisors);
      reportingSupervisors.forEach((department) => {
        setReportSupervisors(department.reporting_supervisor);
      });
      // setParentAsset(parentAssetResp.data.site_assets);
    };

    if (e.target.type === "select-one" && e.target.name === "department") {
      const departmentId = Number(e.target.value);
      await fetchReportingSupervisors(departmentId);

      setFormData({
        ...formData,
        department: departmentId,
      });
    }
  };
  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />
      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>
        <div className="w-full p-2 bg-white rounded-lg mb-10">
          <Accordion
            title={"General Employment Details"}
            icon={FaRegAddressCard}
            content={
              <>
                <div className="flex justify-end gap-2 ">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 transition-all duration-150 hover:bg-opacity-30 border-green-400  px-4 text-green-400 hover:bg-green-300 font-semibold  "
                        onClick={handleEditEmployment}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="border-2 rounded-full p-1 border-red-400  px-4 text-red-400  hover:bg-opacity-30 hover:bg-red-300 font-semibold  "
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      style={{ background: themeColor }}
                      className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded-full flex items-center gap-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <BiEdit /> Edit
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-2 mt-2">
                  <div className="grid gap-2 items-center ">
                    <label htmlFor="companyName" className="font-semibold">
                      Employee Code:
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      className={`mt-1 p-2  border rounded-md  ${
                        !isEditing ? "bg-gray-200 text-gray-500" : ""
                      }`}
                      placeholder="Enter Employee code"
                      value={formData.employeeCode}
                      onChange={handleChange}
                      name="employeeCode"
                      readOnly={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2 items-center ">
                    <label htmlFor="jobTitle" className="font-semibold">
                      Joining Date:
                    </label>
                    <input
                      type="date"
                      id="jobTitle"
                      className={`mt-1 p-2  border rounded-md ${
                        !isEditing ? "bg-gray-200  text-gray-500" : ""
                      }`}
                      placeholder="Enter Job Title"
                      value={formData.joinDate}
                      onChange={handleChange}
                      name="joinDate"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2 items-center">
                    <label htmlFor="jobTitle" className="font-semibold">
                      Employment Type:
                    </label>
                    <select
                      className={`mt-1 p-2  border rounded-md  ${
                        !isEditing ? "bg-gray-200 " : ""
                      }`}
                      value={formData.employmentType}
                      onChange={handleChange}
                      name="employmentType"
                      disabled={!isEditing}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="fullTime">Full Time</option>
                      <option value="partTime">Part Time</option>
                    </select>
                  </div>
                  <div className="grid gap-2 items-center">
                    <label htmlFor="jobTitle" className="font-semibold">
                      Probation Due Date:
                    </label>
                    <input
                      type="date"
                      name="probationDueDate"
                      id=""
                      className={`mt-1 p-2  border rounded-md  ${
                        !isEditing ? "bg-gray-200 text-gray-500" : ""
                      }`}
                      value={formData.probationDueDate}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2 items-center ">
                    <label htmlFor="jobTitle" className="font-semibold">
                      Branch Location:
                    </label>
                    <select
                      className={`mt-1 p-2  border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      value={formData.branch}
                      onChange={handleChange}
                      name="branch"
                      disabled={!isEditing}
                    >
                      <option value="">Select Branch Location</option>
                      {locations?.map((location) => (
                        <option value={location.id} key={location.id}>
                          {location.location}, {location.city}, {location.state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2 items-center ">
                    <label htmlFor="jobTitle" className="font-semibold">
                      Department:
                    </label>
                    <select
                      className={`mt-1 p-2  border rounded-md ${
                        !isEditing ? "bg-gray-200" : ""
                      }`}
                      value={formData.department}
                      onChange={handleDepartmentChange}
                      name="department"
                      disabled={!isEditing}
                    >
                      <option value="">Select Department</option>
                      {departments?.map((department) => (
                        <option value={department.id} key={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2 items-center ">
                    <label htmlFor="designation" className="font-semibold">
                      Designation:
                    </label>
                    <input
                      type="text"
                      id="designation"
                      className={`mt-1 p-2  border rounded-md ${
                        !isEditing ? "bg-gray-200 text-gray-500" : ""
                      }`}
                      placeholder="Enter Designation"
                      onChange={handleChange}
                      value={formData.designation}
                      name="designation"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="grid gap-2 items-center w-full">
                    <label htmlFor="designation" className="font-semibold">
                      Reporting Supervisor:
                    </label>
                    <select
                      className={`mt-1 p-2  border rounded-md ${
                        !isEditing ? "bg-gray-200 text-gray-500" : ""
                      }`}
                      value={formData.supervisor}
                      onChange={handleChange}
                      name="supervisor"
                      disabled={!isEditing}
                    >
                      <option value="">Select Supervisor</option>
                      {reportSupervisors.map((supervisor) => (
                        <option value={supervisor.id} key={supervisor.id}>
                          {supervisor.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            }
          />

          <Accordion
            title={"Employment Status"}
            icon={FaFileCircleCheck}
            content={
              <>
                <div className="flex justify-end ">
                  <button
                    onClick={openModal}
                    className="bg-blue-500 text-white mb-2  font-semibold py-1 px-4 rounded-full flex items-center gap-2"
                  >
                    Update Employment Status
                  </button>
                </div>

                <Table columns={column} data={data} isPagination={true} />
              </>
            }
          />

          <Accordion
            title={"Job Information"}
            icon={MdInfoOutline}
            content={
              <>
                <div className="flex justify-end ">
                  <button
                    style={{ background: themeColor }}
                    onClick={openModal1}
                    className="bg-blue-500 text-white mb-2 font-semibold py-1 px-4 rounded-full flex items-center gap-2"
                  >
                    Update Info
                  </button>
                </div>

                <Table
                  columns={jobInfoColumn}
                  data={jobInfo}
                  isPagination={true}
                />
              </>
            }
          />

          <Accordion
            title={"Assets"}
            icon={MdOutlineWebAsset}
            content={
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => setAssetModal(true)}
                    className="bg-blue-500 text-white mb-2 font-semibold py-1 px-4 rounded-full flex items-center gap-2"
                  >
                    <PiPlus /> Add Row
                  </button>
                </div>
                <Table
                  columns={assetColumn}
                  data={empAssets}
                  isPagination={true}
                />
              </>
            }
          />
          <Accordion
            title={"Company Assets"}
            icon={MdOutlineWebAsset}
            content={
              <>
                <div className="flex justify-end ">
                  <button
                    onClick={() => setCompanyAssetModal(true)}
                    className="bg-blue-500 text-white mb-2 font-semibold py-1 px-4 rounded-full flex items-center gap-2"
                  >
                    <PiPlus /> Add Row
                  </button>
                </div>
                <Table
                  columns={companyAssetColumn}
                  data={comAssets}
                  isPagination={true}
                />
              </>
            }
          />

          {modalIsOpen && (
            <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
              <div class="max-h-screen  bg-white p-4 w-96 rounded-lg shadow-lg overflow-y-auto">
                <form>
                  <h2 className="text-xl font-medium mb-4">
                    Update Employment Status
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Please select Employment Status you wish to update
                      <span className="text-red-500">*</span>
                    </label>
                    <select className="mt-1 p-2  border rounded-md w-full">
                      <option value="cash">Probation</option>
                      <option value="cash">Confirmed</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      What is the employee's confirmation due date?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Please enter comments, if any{" "}
                    </label>
                    <textarea className="mt-1 p-2 w-full border rounded-md" />
                  </div>

                  <div className="flex mt-2 justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="border-2 border-red-400 text-red-400 font-semibold p-1 px-4 rounded-full "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-400 text-white font-semibold p-1 px-6 rounded-full"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {modalIsOpen2 && (
            <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
              <div class="max-h-screen bg-white p-4 w-[35rem] rounded-xl shadow-lg overflow-y-auto">
                <form>
                  <h2 className=" font-medium mb-4">
                    Employment Status and Comment History
                  </h2>
                  <div className="my-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Effective From{" "}
                    </label>

                    <p className="mt-1 p-2 w-full border  rounded-md">
                      02/02/2024
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirmation Date
                    </label>

                    <p className="mt-1 p-2 w-full border rounded-md">
                      02/02/2024
                    </p>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Employment Status{" "}
                    </label>
                    <p className="mt-1 p-2  border rounded-md">Confirmed</p>
                    {/* <select className="mt-1 p-2  border rounded-md">
                      <option value="cash">Probation</option>
                      <option value="cash">Confirmed</option>
                    </select> */}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Comments and History{" "}
                    </label>
                    {/* <textarea type="date" className="mt-1 p-2  border rounded-md"/> */}
                  </div>

                  <div className="flex mt-4 justify-center">
                    <button
                      type="button"
                      onClick={closeModal2}
                      className="border-2 rounded-full border-red-500 text-red-500 px-4 flex items-center gap-2 p-1 "
                    >
                      <MdClose /> Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {modalIsOpen1 && <AddJobInfo closeModal1={closeModal1} fetchJobInfo={fetchJobInfo} />}
          {showEditJobInfoModal && <EditJobInfo closeModal1={()=>setShowEditJobInfoModal(false)} fetchJobInfo={fetchJobInfo} infoId={jobInfoId} />}

          {assetModal && (
            <AddEmployeeAsset
              setAssetModal={setAssetModal}
              fetchEmployeeAssets={fetchEmployeeAssets}
            />
          )}
          {companyAssetModal && (
            <AddCompanyAsset
              setCompanyAssetModal={setCompanyAssetModal}
              fetchCompanyAssets={fetchCompanyAssets}
            />
          )}
          {companyAssetEditModal && (
            <EditCompanyAsset
              fetchCompanyAssets={fetchCompanyAssets}
              setCompanyAssetEditModal={setCompanyAssetEditModal}
              comAssetId={comAssetId}
            />
          )}
          {assetEditModal && (
            <EditEmployeeAsset
              setAssetEditModal={setAssetEditModal}
              fetchEmployeeAssets={fetchEmployeeAssets}
              empAssetID={empAssetID}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionsEmployment;
